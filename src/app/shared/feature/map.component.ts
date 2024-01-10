import { MapService } from './../data-access/map.service';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  Input,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { GoogleMapConfig } from '@capacitor/google-maps/dist/typings/definitions';
import { signalSlice } from 'ngxtension/signal-slice';
import {
  Subject,
  merge,
  map,
  Observable,
  switchMap,
  scheduled,
  asapScheduler,
} from 'rxjs';
import { FlightService } from 'src/app/shared/data-access/flight.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  template: `<capacitor-google-map #map /> `,
  styles: `
  capacitor-google-map {
  display: block;
  height: 100svh;
  width: 100svw;

}
  `,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

/*
 * *
 * * This component is responsible for:
 * * - Creating a map
 * * - Displaying markers on the map
 * * - Handling map events
 * *
 */
export class MapComponent implements AfterViewInit {
  private mapService = inject(MapService);
  @ViewChild('map') ref!: ElementRef<HTMLElement>;


  constructor() {
    effect(
      () => console.log(this.state().markers)
    )
  }

  ngAfterViewInit() {
    const marker: Marker = {
      coordinate: {
        lat: 51.64027,
        lng: 22.90032
      },
      title: 'TEST'
    }
    this.state.createMap().then(map => map.map?.addMarker(marker))
  }

  async createMap() {
    const head = document.head;
    //* Prevent font download when map requests data
    const insertBefore = head.insertBefore;
    head.insertBefore = <T extends Node>(
      newElement: T,
      referenceElement: Node
    ): T => {
      if (
        newElement instanceof Element &&
        newElement?.hasAttribute('href') &&
        newElement?.getAttribute('href')?.includes('fonts.googleapis')
      ) {
        return newElement;
      }

      insertBefore.call(head, newElement, referenceElement);
      return newElement;
    };

    const map = await GoogleMap.create({
      id: 'map',
      element: this.ref.nativeElement,
      apiKey: environment.apiKey!,
      region: 'pl',
      config: this.mapService.config,
    });

    return map;
  }

  // dependencies
  private flightService = inject(FlightService);

  config: GoogleMapConfig = {
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
    zoomControl: false,
    zoom: 7,
  };

  // initial state
  private initialState: MapState = {
    map: undefined,
    markers: [],
    loaded: false,
    error: null,
  };

  //  sources
  private error$ = new Subject<string>();
  private markers$ = toObservable(this.flightService.state);

  sources$ = merge(
    this.error$.pipe(map((error) => ({ error }))),
    this.markers$.pipe(
      map((flightState) => ({
        markers: flightState.flights.map((flight) => {
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
      createMap: (_, $: Observable<void>) =>
        $.pipe(
          switchMap(() =>
            scheduled(this.createMap(), asapScheduler).pipe(
              map((map) => ({ map }))
            )
          )
        ),
      addMarker: (_, $: Observable<Marker>) =>
        $.pipe(
          switchMap((add) =>
            scheduled(_().map!.addMarker(add), asapScheduler).pipe(
              map(() => ({
                markers: [..._().markers, add],
              }))
            )
          )
        ),
      editMarker: (_, $: Observable<Marker>) =>
        $.pipe(
          switchMap((update) =>
            scheduled(_().map!.addMarker(update), asapScheduler).pipe(
              map(() => ({
                markers: _().markers.map((marker) =>
                  marker === update ? { ...marker, ...update } : marker
                ),
              }))
            )
          )
        ),
      removeMarker: (_, $: Observable<Marker>) =>
        $.pipe(
          switchMap((remove) =>
            scheduled(_().map!.addMarker(remove), asapScheduler).pipe(
              map(() => ({
                markers: _().markers.filter((marker) => marker !== remove),
              }))
            )
          )
        ),
    },
  });
}

type Map = GoogleMap | null | undefined;
type MapState = {
  map: Map;
  markers: Marker[];
  loaded: boolean;
  error: string | null;
};
