import { Injectable } from '@angular/core'
import { Geolocation, Position } from '@capacitor/geolocation'
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

type GeolocationState = {
  position: Position | null | undefined
}

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  // initial state
  private initialState: GeolocationState = {
    position: undefined,
  };

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

  // state
  state = signalSlice({
    initialState: this.initialState,
    sources: [this.sources$],
    actionSources: {
      locate: (_state, $: Observable<void>) =>
        $.pipe(
          switchMap(() =>
            scheduled(
              Geolocation.getCurrentPosition().catch(() => null),
              asapScheduler
            )
              .pipe(
                catchError(() => {
                  return EMPTY
                })
              )
              .pipe(map((position) => ({ position })))
          )
        ),
    },
  });
}
