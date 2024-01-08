import { GeolocationService } from './geolocation.service';
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
  tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { APPWRITE } from 'src/main';
import {
  EditFlight,
  Flight,
  FlightState,
  Flights,
  RemoveFlight,
} from '../types/flight';
import { AddFlight } from './../types/flight';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  // depedencies
  private appwrite = inject(APPWRITE);
  private geolocationService = inject(GeolocationService);
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
  private flightsLoaded$ = scheduled(
    this.appwrite.database.listDocuments(
      environment.databaseId,
      environment.flightCollectionId
    ),
    asapScheduler
  ).pipe(map((documents) => documents.documents as unknown as Flights));

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
              this.geolocationService.state
                .locate()
                .then((geolocation) => ({ ...flight, latitude: geolocation.position?.coords.latitude, longitude: geolocation.position?.coords.longitude })),
              asapScheduler
            ).pipe(
              tap((flight) =>
                console.log('Dane lotu', flight)),
              switchMap((flight) =>
                scheduled(
                  this.appwrite.database
                    .createDocument(
                      environment.databaseId,
                      environment.flightCollectionId,
                      ID.unique(),
                      {
                        ...flight,
                      }
                    )
                    .then((document) => document as unknown as Flight),
                  asapScheduler
                ).pipe(
                  catchError((err) => {
                    this.error$.next(err);
                    return EMPTY;
                  }),
                  map((flight) => ({
                    flights: [..._().flights, flight],
                  }))
                )
              )
            )
          )
        ),
      // todo if add works then adjust the rest of actionSources
      edit: (_, $: Observable<EditFlight>) =>
        $.pipe(
          switchMap((update) =>
            scheduled(
              this.appwrite.database
                .updateDocument(
                  environment.databaseId,
                  environment.flightCollectionId,
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
            ).pipe(
              catchError((err) => {
                this.error$.next(err);
                return EMPTY;
              }),
              map((update) => ({
                flights: _().flights.map((flight) =>
                  flight.$id === update.$id ? { ...flight, ...update } : flight
                ),
              }))
            )
          )
        ),
      remove: (_, $: Observable<RemoveFlight>) =>
        $.pipe(
          switchMap((id) =>
            scheduled(
              this.appwrite.database
                .deleteDocument(
                  environment.databaseId,
                  environment.flightCollectionId,
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
                flights: _().flights.filter((flight) => flight.$id !== id),
              }))
            )
          )
        ),
    },
  });
}
