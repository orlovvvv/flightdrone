import { Injectable, inject } from '@angular/core';
import { ID, Models } from 'appwrite';
import { signalSlice } from 'ngxtension/signal-slice';
import {
  Observable,
  Subject,
  asapScheduler,
  defer,
  from,
  map,
  merge,
  scheduled,
  switchMap,
} from 'rxjs';
import { Credentials } from 'src/app/shared/types/credentials';
import { APPWRITE } from 'src/main';

export type AuthUser = Models.User<Models.Preferences> | null | undefined;

interface AuthState {
  user: AuthUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // dependencies
  private appwrite = inject(APPWRITE);

  // sources
  private user$ = new Subject<AuthState>();
  private isAuthenticated$ = scheduled(
    this.appwrite.account.get().catch(() => null),
    asapScheduler
  );
  private sources$ = merge(
    this.isAuthenticated$.pipe<AuthState>(map((user) => ({ user }))),
    this.user$
  );

  // state
  private initialState: AuthState = {
    user: undefined,
  };

  state = signalSlice({
    initialState: this.initialState,
    sources: [this.sources$],
    // todo: implement actionSources
    actionSources: {
      signin: (_, $: Observable<Credentials>) =>
        $.pipe(
          switchMap((credentials) =>
            from(
              defer(() =>
                this.appwrite.account.createEmailSession(
                  credentials.email,
                  credentials.password
                )
              ).pipe(
                switchMap(() =>
                  from(
                    defer(() => this.appwrite.account.get().catch(() => null))
                  )
                ),
                map((user) => ({ user }))
              )
            )
          )
        ),
      signout: (_, $: Observable<void>) =>
        $.pipe(
          switchMap(() =>
            from(
              defer(() => this.appwrite.account.deleteSession('current'))
            ).pipe(map(() => ({ user: null })))
          )
        ),
      signup: (_, $: Observable<Credentials>) =>
        $.pipe(
          switchMap((credentials) =>
            from(
              defer(() =>
                this.appwrite.account.create(
                  ID.unique(),
                  credentials.email,
                  credentials.password,
                  credentials.name
                )
              )
            ).pipe(map(() => ({ user: null })))
          )
        ),
    },
  });
}
