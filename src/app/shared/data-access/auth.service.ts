import { Injectable, inject } from '@angular/core'
import { ID, Models } from 'appwrite'
import { signalSlice } from 'ngxtension/signal-slice'
import {
  EMPTY,
  Observable,
  Subject,
  asapScheduler,
  catchError,
  defer,
  map,
  merge,
  scheduled,
  switchMap
} from 'rxjs'
import { Credentials } from 'src/app/shared/types/credentials'
import { APPWRITE } from 'src/main'

export type AuthUser = Models.User<Models.Preferences> | null | undefined

interface AuthState {
  user: AuthUser
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
      signin: (_, $: Observable<Credentials>) => $.pipe(
        switchMap(
          (credentials) => scheduled(
            this.appwrite.account.createEmailSession(
              credentials.email,
              credentials.password
            ),
            asapScheduler
          ).pipe(
            switchMap(() =>
              scheduled(
                this.appwrite.account.get().catch(() => null),
                asapScheduler
              )
            ),
            map((user) => ({ user })),
          )
        )
      ),
      signout: (_, $: Observable<void>) => $.pipe(
        switchMap(
          () => scheduled(
            this.appwrite.account
              .deleteSession('current'),
            asapScheduler
          ).pipe(
            catchError(
              () => EMPTY
            ),
            map(
              () => ({ user: null })
            )
          )
        )
      ),
      signup: (_, $: Observable<Credentials>) => $.pipe(
        switchMap(
          (credentials) => scheduled(
            defer(() =>
              this.appwrite.account.create(
                ID.unique(),
                credentials.email,
                credentials.password,
                credentials.name
              )
            ),
            asapScheduler
          ).pipe(
            catchError(
              () => EMPTY
            ),
            map(
              () => ({ user: null })
            )
          )
        )
      )

    }
  });

  // login(credentials: Credentials) {
  //   return scheduled(
  //     this.appwrite.account.createEmailSession(
  //       credentials.email,
  //       credentials.password
  //     ),
  //     asapScheduler
  //   ).pipe(
  //     switchMap(() =>
  //       scheduled(
  //         this.appwrite.account.get().catch(() => null),
  //         asapScheduler
  //       )
  //     ),
  //     tap((user) => {
  //       return this.user$.next({ user })
  //     })
  //   )
  // }

}
