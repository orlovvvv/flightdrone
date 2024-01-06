import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { ID } from 'appwrite'
import { signalSlice } from 'ngxtension/signal-slice'
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
} from 'rxjs'
import { environment } from 'src/environments/environment'
import { APPWRITE } from 'src/main'
import {
  EditFlight,
  Flight,
  FlightState,
  Flights,
  RemoveFlight,
} from '../types/flight'
import { AddFlight } from './../types/flight'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  apiFlight =
    environment.apiEndpoint + environment.flightCollectionId + '/document'; // + documentId
  apiFLights =
    environment.apiEndpoint + environment.flightCollectionId + '/documents';
  private appwrite = inject(APPWRITE);
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  // initial state
  private initialState: FlightState = {
    flights: [],
    loaded: false,
    error: null,
  };

  // sources
  private error$ = new Subject<string>();
  private flightsLoaded$ = this.http.get<Flights>(this.apiFLights).pipe(
    catchError((err) => {
      this.error$.next(err)
      return EMPTY
    })
  );

  sources$ = merge(
    this.flightsLoaded$.pipe(map((flights) => ({ flights, loaded: true }))),
    this.error$.pipe(map((error) => ({ error })))
  );

  state = signalSlice({
    initialState: this.initialState,
    sources: [this.sources$],
    actionSources: {
      add: (_, $: Observable<AddFlight>) =>
        $.pipe(
          switchMap((addFlight) =>
            this.addFlight(addFlight).pipe(
              switchMap((document) =>
                this.http.get<Flight>(this.apiFlight).pipe(
                  map((flight) => ({
                    flights: [..._().flights, flight],
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
      edit: (_, $: Observable<EditFlight>) =>
        $.pipe(
          switchMap((edit) =>
            this.editFlight(edit).pipe(
              switchMap((document) =>
                this.http.get<Flight>(this.apiFlight + `/${document.$id}`).pipe(
                  map((update) => ({
                    flights: _().flights.map((flight) =>
                      flight.id === update.id
                        ? { ...flight, ...update }
                        : flight
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
      remove: (_, $: Observable<RemoveFlight>) =>
        $.pipe(
          switchMap((id) =>
            this.removeFlight(id).pipe(
              map((id) => ({
                flights: _().flights.filter((flight) => flight.id !== id),
              }))
            )
          )
        ),
    },
  });

  private addFlight(addFlight: AddFlight) {
    return scheduled(
      this.appwrite.database.createDocument(
        environment.databaseId,
        environment.flightCollectionId,
        ID.unique(),
        addFlight
      ),
      asapScheduler
    )
  }

  private editFlight(editFlight: EditFlight) {
    return scheduled(
      this.appwrite.database.updateDocument(
        environment.databaseId,
        environment.flightCollectionId,
        editFlight.id,
        editFlight.data
      ),
      asapScheduler
    ).pipe(
      catchError((err) => {
        this.error$.next(err)
        return EMPTY
      })
    )
  }

  private removeFlight(id: RemoveFlight) {
    return scheduled(
      this.appwrite.database.deleteDocument(
        environment.databaseId,
        environment.flightCollectionId,
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
