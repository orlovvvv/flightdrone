import { Injectable, inject } from '@angular/core';
import { signalSlice } from 'ngxtension/signal-slice';
import {
  EMPTY,
  Observable,
  Subject,
  asapScheduler,
  catchError,
  map,
  merge,
  of,
  scheduled,
  startWith,
  switchMap,
} from 'rxjs';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { Credentials } from 'src/app/shared/types/credentials';

export type LoginStatus = 'pending' | 'authenticating' | 'success' | 'error';

interface LoginState {
  status: LoginStatus;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private authService = inject(AuthService);

  private initialState: LoginState = {
    status: 'pending',
  };

  // sources
  error$ = new Subject<any>();
  private sources$ = merge(
    of(this.initialState),
    this.error$.pipe(map(() => ({ status: 'error' as const })))
  );

  // state
  state = signalSlice({
    initialState: this.initialState,
    sources: [this.sources$],
    actionSources: {
      login: (_state, $: Observable<Credentials>) =>
        $.pipe(
          switchMap((credentials) =>
            scheduled(
              this.authService.state
                .signin(credentials)
                .catch(() => ({ status: 'error' as const })),
              asapScheduler
            ).pipe(startWith({ status: 'authenticating' as const }))
          ),

          map(() => ({ status: 'success' as const }))
        ),
      logout: (_state, $: Observable<void>) =>
        $.pipe(
          switchMap(() =>
            scheduled(this.authService.state.signout(), asapScheduler).pipe(
              map(() => ({ status: 'pending' as const }))
            )
          ),
          catchError((err) => {
            this.error$.next(err);
            return EMPTY;
          })
        ),
    },
  });
}
