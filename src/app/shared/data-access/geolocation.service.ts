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
  switchMap,
} from 'rxjs'
type GeolocationState = {
  position: Position | null | undefined
  // permission: PermissionStatus | null | undefined
  error: string | null
}

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  // printCurrentPosition = async () => {
  //   const coordinates = await Geolocation.getCurrentPosition()

  //   console.log('Current position:', coordinates)
  //   return coordinates
  // };

  // private initialCoordinates = toSignal(scheduled(this.printCurrentPosition(), asapScheduler))
  // coordinates = computed(() => this.initialCoordinates())

  // todo: figure out state managment for coordinates

  // sources
  geolocation$ = new Subject<GeolocationState>();
  getIninitalPosition$ = scheduled(
    Geolocation.getCurrentPosition().catch(() => null),
    asapScheduler
  );
  error$ = new Subject<string | null>();

  sources$ = merge(
    this.error$.pipe(map((error) => ({ error }))),
    this.geolocation$,
    this.getIninitalPosition$.pipe(map((position) => ({ position })))
    // this.permission$.pipe(
    //   map((permission) => ({ permission }))
    // ),
  );

  // initial state
  private initialState: GeolocationState = {
    position: undefined,
    // permission: undefined,
    error: null,
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
      catchError((err) => {
        this.error$.next(err)
        return EMPTY
      }),
    )
  }
}
