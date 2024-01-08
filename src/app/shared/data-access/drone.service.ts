import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ID } from 'appwrite';
import { signalSlice } from 'ngxtension/signal-slice';
import {
  EMPTY,
  Observable,
  Subject,
  asapScheduler,
  catchError,
  map,
  merge,
  scheduled,
  switchMap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { APPWRITE } from 'src/main';
import {
  AddDrone,
  DroneState,
  Drones,
  EditDrone,
  RemoveDrone,
} from '../types/drone';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root',
})
export class DroneService {
  // dependencies
  private appwrite = inject(APPWRITE);
  private http = inject(HttpClient);
  private profileService = inject(ProfileService);

  apiDrones =
    environment.apiEndpoint + environment.droneCollectionId + '/documents';

  // initial state
  private initialState: DroneState = {
    drones: [],
    loaded: false,
    error: null,
  };

  // sources
  private error$ = new Subject<string>();
  private dronesLoaded$ = scheduled(
    this.appwrite.database.listDocuments(
      environment.databaseId,
      environment.droneCollectionId
    ),
    asapScheduler
  ).pipe(map((documents) => documents.documents as unknown as Drones));

  sources$ = merge(
    this.dronesLoaded$.pipe(map((drones) => ({ drones, loaded: true }))),
    this.error$.pipe(map((error) => ({ error })))
  );

  // state
  state = signalSlice({
    initialState: this.initialState,
    sources: [this.sources$],
    actionSources: {
      add: (_, $: Observable<AddDrone>) =>
        $.pipe(
          switchMap((add) =>
            scheduled(
              this.appwrite.database
                .createDocument(
                  environment.databaseId,
                  environment.droneCollectionId,
                  ID.unique(),
                  add
                )
                .then((document) => ({
                  $id: document.$id,
                  $createdAt: document.$createdAt,
                  $updatedAt: document.$updatedAt,
                  $databaseId: document.$databaseId,
                  $collectionId: document.$collectionId,
                  ...add,
                })),
              asapScheduler
            ).pipe(
              catchError((err) => {
                this.error$.next(err);
                return EMPTY;
              }),
              map((drone) => ({ drones: [..._().drones, drone] }))
            )
          )
        ),
      edit: (_, $: Observable<EditDrone>) =>
        $.pipe(
          switchMap((update) =>
            scheduled(
              this.appwrite.database
                .updateDocument(
                  environment.databaseId,
                  environment.droneCollectionId,
                  update.id,
                  update.data
                )
                .then((document) => ({
                  $id: document.$id,
                  $createdAt: document.$createdAt,
                  $updatedAt: document.$updatedAt,
                  $databaseId: document.$databaseId,
                  $collectionId: document.$collectionId,
                  ...update.data,
                })),
              asapScheduler
            )
              .pipe(
                catchError((err) => {
                  this.error$.next(err);
                  return EMPTY;
                })
              )
              .pipe(
                map((update) => ({
                  drones: _().drones.map((drone) =>
                    drone.$id === update.$id ? { ...drone, ...update } : drone
                  ),
                })),
                catchError((err) => {
                  this.error$.next(err);
                  return EMPTY;
                })
              )
          )
        ),
      remove: (_, $: Observable<RemoveDrone>) =>
        $.pipe(
          switchMap((id) =>
            scheduled(
              this.appwrite.database
                .deleteDocument(
                  environment.databaseId,
                  environment.droneCollectionId,
                  id
                )
                .then(() => id),
              asapScheduler
            ).pipe(
              catchError((err) => {
                this.error$.next(err);
                return EMPTY;
              }),
              map((id) => ({
                drones: _().drones.filter((drone) => drone.$id !== id),
              }))
            )
          )
        ),
    },
  });
}
