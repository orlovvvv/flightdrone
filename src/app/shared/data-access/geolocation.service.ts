import { Injectable } from '@angular/core'
import {
  Geolocation,
  Position
} from '@capacitor/geolocation'
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
  switchMap
} from 'rxjs'

type GeolocationState = {
  position: Position | null | undefined
}

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  // sources
  geolocation$ = new Subject<GeolocationState>();
  getIninitalPosition$ = scheduled(
    Geolocation.getCurrentPosition().catch(() => null),
    asapScheduler
  );

  sources$ = merge(
    this.geolocation$,
    this.getIninitalPosition$.pipe(map((position) => ({ position })))
  );

  // initial state
  private initialState: GeolocationState = {
    position: undefined,
  };


  // reducer with selectors
  state = signalSlice({
    initialState: this.initialState,
    sources: [this.sources$],
    actionSources: {
      locate: (_state, $: Observable<void>) => $.pipe(
        switchMap(
          () => this.locate().pipe(
            map((position) => ({ position }))
          )
        )
      )
    }
  });

  locate() {
    console.log('i fired')
    return scheduled(
      Geolocation.getCurrentPosition()
        .catch(() => null),
      asapScheduler
    ).pipe(
      catchError(() => {
        return EMPTY
      }),
    )
  }
}
