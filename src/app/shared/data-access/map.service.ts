import { ElementRef, Injectable, computed, inject, signal } from '@angular/core'
import { toObservable } from '@angular/core/rxjs-interop'
import { GoogleMap, Marker } from '@capacitor/google-maps'
import { GoogleMapConfig } from '@capacitor/google-maps/dist/typings/definitions'
import { signalSlice } from 'ngxtension/signal-slice'
import { Observable, Subject, asapScheduler, flatMap, map, merge, scheduled, switchMap, tap } from 'rxjs'
import { FlightService } from 'src/app/shared/data-access/flight.service'
import { environment } from 'src/environments/environment'


type Map = GoogleMap | null | undefined
type MapState = {
  map: Map
  markers: Marker[]
  loaded: boolean
  error: string | null
}


@Injectable({
  providedIn: 'root'
})
export class MapService {
  // dependencies
  private flightService = inject(FlightService)

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
    mapId: 'ee2cd9275b9b5193',
  }

  // initial state
  private initialState: MapState = {
    map: undefined,
    markers: [],
    loaded: false,
    error: null
  }


  //  sources
  private error$ = new Subject<string>()
  private markers$ = toObservable(this.flightService.state)

  sources$ = merge(
    this.error$.pipe(map((error) => ({ error }))),
    this.markers$.pipe(
      map(flightState =>
      ({
        markers: flightState.flights.map(
          (flight) => {
            const marker: Marker = {
              coordinate: {
                lat: flight.latitude,
                lng: flight.longitude
              },
              title: flight.drone.model
            }
            return marker
          })
      })
      )
    ))


  //  state
  state = signalSlice({
    initialState: this.initialState,
    sources: [this.sources$],
    actionSources: {
      createMap: (_, $: Observable<Partial<{
        ref: ElementRef<HTMLElement>,
        map: GoogleMap
      }>>) => $.pipe(

        ),
      addMarker: (_, $: Observable<Marker>) => $.pipe(
        switchMap(
          (add) => scheduled(_().map!.addMarker(add), asapScheduler)
            .pipe(
              map(
                () => ({
                  markers: [..._().markers, add]
                })
              )
            ))
      ),
      editMarker: (_, $: Observable<Marker>) => $.pipe(
        switchMap(
          (update) => scheduled(_().map!.addMarker(update), asapScheduler)
            .pipe(
              map(
                () => ({
                  markers: _().markers.map((marker) =>
                    marker === update ? { ...marker, ...update } : marker
                  ),
                })
              )
            ))
      ),
      removeMarker: (_, $: Observable<Marker>) => $.pipe(
        switchMap(
          (remove) => scheduled(_().map!.addMarker(remove), asapScheduler)
            .pipe(
              map(
                () => ({
                  markers: _().markers.filter((marker) => marker !== remove)
                })
              )
            ))
      ),

    }
  })


}
