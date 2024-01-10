import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable, computed, inject, signal } from '@angular/core'
import { toObservable } from '@angular/core/rxjs-interop'
import { GoogleMap, Marker } from '@capacitor/google-maps'
import { GoogleMapConfig } from '@capacitor/google-maps/dist/typings/definitions'
import { signalSlice } from 'ngxtension/signal-slice'
import { EMPTY, Observable, Subject, asapScheduler, catchError, flatMap, map, merge, of, scheduled, switchMap, tap } from 'rxjs'
import { FlightService } from 'src/app/shared/data-access/flight.service'
import { environment } from 'src/environments/environment'



type MapState = {
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
  private http = inject(HttpClient)

  options: google.maps.MapOptions = {
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
    markers: [],
    loaded: false,
    error: null
  }


  //  sources
  private error$ = new Subject<string>()
  private markers$ = toObservable(this.flightService.state)
  private apiLoaded$ = this.http.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.apiKey}`, 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false)),
    );

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
      }),
        this.apiLoaded$.pipe(map(() => ({ loaded: true })), catchError((err) => { this.error$.next(err); return EMPTY }))
      )
    ))


  //  state
  state = signalSlice({
    initialState: this.initialState,
    sources: [this.sources$],
    actionSources: {
      addMarker: (_, $: Observable<Marker>) => $.pipe(
        map(
          (add) => ({ markers: [..._().markers, add] })
        )
      ),
      editMarker: (_, $: Observable<Marker>) => $.pipe(
        map(
          (update) => ({
            markers: _().markers.map((marker) =>
              marker === update ? { ...marker, ...update } : marker
            ),
          })
        )
      ),
      removeMarker: (_, $: Observable<Marker>) => $.pipe(
        map(
          (remove) => ({
            markers: _().markers.filter((marker) => marker !== remove)
          })
        )
      ),

    }
  })


}
