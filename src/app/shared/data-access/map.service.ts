import { Injectable, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Marker } from '@capacitor/google-maps';
import { signalSlice } from 'ngxtension/signal-slice';
import { Observable, Subject, map, merge } from 'rxjs';
import { FlightService } from 'src/app/shared/data-access/flight.service';

type MapState = {
  markers: Marker[];
  loaded: boolean;
  error: string | null;
};

@Injectable({
  providedIn: 'root',
})
export class MapService {
  // options
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: '../../../assets/png/drone.png',
  };

  mapOptions: google.maps.MapOptions = {
    center: {
      lat: 52.237049,
      lng: 21.017532,
    },
    restriction: {
      latLngBounds: {
        west: 14.075,
        south: 48.855,
        east: 24.155,
        north: 54.852,
      },
      strictBounds: false,
    },
    panControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    // zoomControl: false,
    zoom: 7,
  };

  // dependencies
  private flightService = inject(FlightService);

  // initial state
  private initialState: MapState = {
    markers: [],
    loaded: false,
    error: null,
  };

  //  sources
  private error$ = new Subject<string>();
  private markers$ = toObservable(this.flightService.activeFlights);

  sources$ = merge(
    this.error$.pipe(map((error) => ({ error }))),
    this.markers$.pipe(
      map((flightState) => ({
        markers: flightState.map((flight) => {
          const marker: Marker = {
            coordinate: {
              lat: flight.latitude,
              lng: flight.longitude,
            },
            title: flight.drone.model,
          };
          return marker;
        }),
      }))
    )
  );

  //  state
  state = signalSlice({
    initialState: this.initialState,
    sources: [this.sources$],
    actionSources: {
      addMarker: (_, $: Observable<Marker>) =>
        $.pipe(map((add) => ({ markers: [..._().markers, add] }))),
      editMarker: (_, $: Observable<Marker>) =>
        $.pipe(
          map((update) => ({
            markers: _().markers.map((marker) =>
              marker === update ? { ...marker, ...update } : marker
            ),
          }))
        ),
      removeMarker: (_, $: Observable<Marker>) =>
        $.pipe(
          map((remove) => ({
            markers: _().markers.filter((marker) => marker !== remove),
          }))
        ),
    },
  });
}
