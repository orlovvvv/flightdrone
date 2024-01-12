import { Injectable, computed, inject } from '@angular/core';
import { ID, Query } from 'appwrite';
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
import { isTimeLeft } from '../utils/remaining-time';
import { AddFlight } from './../types/flight';
import { GeolocationService } from './geolocation.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  // depedencies
  private appwrite = inject(APPWRITE);
  private profileService = inject(ProfileService);
  private geolocationService = inject(GeolocationService);

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
      environment.flightCollectionId,
      [Query.orderDesc('$createdAt')]
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
              this.geolocationService.state.locate().then((geolocation) => {
                return {
                  ...flight,
                  latitude: geolocation.position?.coords.latitude,
                  longitude: geolocation.position?.coords.longitude,
                };
              }),
              asapScheduler
            ).pipe(
              switchMap((flight) =>
                scheduled(
                  this.appwrite.database
                    .createDocument(
                      environment.databaseId,
                      environment.flightCollectionId,
                      ID.unique(),
                      {
                        ...flight,
                        profile: this.profileService.state().profile?.$id,
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
                    flights: [flight, ..._().flights],
                  }))
                )
              )
            )
          )
        ),
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
                .then((document) => document as unknown as Flight),
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

  //   utils

  activeFlights = computed(() =>
    this.state().flights.filter((flight) =>
      isTimeLeft(flight.$createdAt, flight.duration)
    )
  );
}
