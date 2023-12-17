import { Injectable, inject } from '@angular/core';
import { signalSlice } from 'ngxtension/signal-slice';
import { EMPTY, Observable, Subject, catchError, map, merge, startWith, switchMap } from 'rxjs';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { Credentials } from 'src/app/shared/types/credentials';

export type LoginStatus = 'pending' | 'authenticating' | 'success' | 'error';

interface LoginState {
  status: LoginStatus;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authService = inject(AuthService);

  private initialState: LoginState = {
    status: 'pending',
  };

  // sources
  private error$ = new Subject<void>();

  private sources$ = merge(
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
            this.authService.login(credentials).pipe(
              map(() => ({ status: 'success' as const })),
              catchError((err) => {
                this.error$.next(err);
                return EMPTY;
              }),
              startWith({ status: 'authenticating' as const }),
            )
          )
        ),
    },
  });

}
