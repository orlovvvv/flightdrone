import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { ID } from 'appwrite'
import { signalSlice } from 'ngxtension/signal-slice'
import { EMPTY, Observable, Subject, asapScheduler, catchError, map, merge, scheduled, switchMap } from 'rxjs'
import { environment } from 'src/environments/environment'
import { APPWRITE } from 'src/main'
import { AddDrone, Drone, DroneState, Drones, EditDrone, RemoveDrone } from '../types/drone'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class DroneService {

  apiDrone =
    environment.apiEndpoint + environment.droneCollectionId + '/document'; // + documentId
  apiDrones =
    environment.apiEndpoint + environment.droneCollectionId + '/documents';
  private appwrite = inject(APPWRITE);
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  // initial state
  private initialState: DroneState = {
    drones: [],
    loaded: false,
    error: null,
  };

  // sources
  private error$ = new Subject<string>();
  private dronesLoaded$ = this.http.get<Drones>(this.apiDrones).pipe(
    catchError((err) => {
      this.error$.next(err)
      return EMPTY
    })
  );

  sources$ = merge(
    this.dronesLoaded$.pipe(map((drones) => ({ drones, loaded: true }))),
    this.error$.pipe(map((error) => ({ error })))
  );

  state = signalSlice({
    initialState: this.initialState,
    sources: [this.sources$],
    actionSources: {
      add: (_, $: Observable<AddDrone>) =>
        $.pipe(
          switchMap((addDroneEditDrone) =>
            this.add(addDroneEditDrone).pipe(
              switchMap((document) =>
                this.http.get<Drone>(this.apiDrone + `/${document.$id}`).pipe(
                  map((drone) => ({
                    drones: [..._().drones, drone],
                  })),
                  catchError((err) => {
                    this.error$.next(err)
                    return EMPTY
                  })
                )
              )
            )
          )
        ),
      edit: (_, $: Observable<EditDrone>) =>
        $.pipe(
          switchMap((update) =>
            this.edit(update).pipe(
              switchMap((document) =>
                this.http.get<EditDrone>(this.apiDrone + `/${document.$id}`)
                  .pipe(
                    map((update) => ({
                      drones: _().drones.map((drone) =>
                        drone.id === update.id
                          ? { ...drone, ...update }
                          : drone
                      ),
                    })),
                    catchError((err) => {
                      this.error$.next(err)
                      return EMPTY
                    })
                  )
              )
            )
          )
        ),
      remove: (_, $: Observable<RemoveDrone>) =>
        $.pipe(
          switchMap((id) =>
            this.remove(id)
              .pipe(
                map((id) => ({
                  drones: _().drones.filter((drone) => drone.id !== id),
                }))
              )
          )
        ),
    },
  });

  private add(drone: AddDrone) {
    return scheduled(
      this.appwrite.database.createDocument(
        environment.databaseId,
        environment.droneCollectionId,
        ID.unique(),
        drone
      ),
      asapScheduler
    )
  }

  private edit(update: EditDrone) {
    return scheduled(
      this.appwrite.database.updateDocument(
        environment.databaseId,
        environment.droneCollectionId,
        update.id,
        update.data
      ),
      asapScheduler
    ).pipe(
      catchError((err) => {
        this.error$.next(err)
        return EMPTY
      })
    )
  }

  private remove(id: RemoveDrone) {
    return scheduled(
      this.appwrite.database.deleteDocument(
        environment.databaseId,
        environment.droneCollectionId,
        id
      ),
      asapScheduler
    ).pipe(
      map(() => id),
      catchError((err) => {
        this.error$.next(err)
        return EMPTY
      })
    )
  }
}
