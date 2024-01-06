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
  FlightState,
  Flights,
  RemoveFlight
} from '../types/flight'
import { AddFlight } from './../types/flight'

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  // depedencies
  private appwrite = inject(APPWRITE);
  private http = inject(HttpClient);

  apiFLights =
    environment.apiEndpoint + environment.flightCollectionId + '/documents';

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

  // state
  state = signalSlice({
    initialState: this.initialState,
    sources: [this.sources$],
    actionSources: {
      add: (_, $: Observable<AddFlight>) =>
        $.pipe().pipe(
          switchMap((flight) =>
            scheduled(
              this.appwrite.database.createDocument(
                environment.databaseId,
                environment.flightCollectionId,
                ID.unique(),
                flight
              ).then((document) =>
                ({ id: document.$id, ...flight })),
              asapScheduler
            ).pipe(
              catchError((err) => {
                this.error$.next(err)
                return EMPTY
              }),
              map((flight) => ({
                flights: [..._().flights, flight],
              }))
            )
          )
        ),
      edit: (_, $: Observable<EditFlight>) =>
        $.pipe(
          switchMap((update) =>
            scheduled(
              this.appwrite.database.updateDocument(
                environment.databaseId,
                environment.flightCollectionId,
                update.id,
                update.data
              ).then(
                (document) =>
                  ({ id: document.$id, ...update.data })
              ),
              asapScheduler
            ).pipe(
              catchError((err) => {
                this.error$.next(err)
                return EMPTY
              }),
              map((update) => ({
                flights: _().flights.map((flight) =>
                  flight.id === update.id ? { ...flight, ...update } : flight
                ),
              }))
            )
          )
        ),
      remove: (_, $: Observable<RemoveFlight>) =>
        $.pipe(
          switchMap((id) =>
            scheduled(
              this.appwrite.database.deleteDocument(
                environment.databaseId,
                environment.flightCollectionId,
                id
              ).then(() => (id)),
              asapScheduler
            ).pipe(
              catchError((err) => {
                this.error$.next(err)
                return EMPTY
              }),
              map((id) => ({
                flights: _().flights.filter((flight) => flight.id !== id),
              }))
            )
          )
        ),
    },
  });
}
