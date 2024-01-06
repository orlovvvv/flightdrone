import { Injectable, inject } from '@angular/core'
import { ID, Models } from 'appwrite'
import { signalSlice } from 'ngxtension/signal-slice'
import {
  Subject,
  asapScheduler,
  defer,
  map,
  merge,
  scheduled,
  switchMap,
  tap
} from 'rxjs'
import { APPWRITE } from 'src/main'
import { Credentials } from '../types/credentials'

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
  private user$ = new Subject<AuthState>()
  private isAuthenticated$ = scheduled(this.appwrite.account.get().catch(() => null), asapScheduler);
  private sources$ = merge(this.isAuthenticated$.pipe<AuthState>(map((user) => ({ user }))), this.user$);

  // state
  private initialState: AuthState = {
    user: undefined,
  };

  state = signalSlice({
    initialState: this.initialState,
    sources: [this.sources$],
  });


  login(credentials: Credentials) {
    return scheduled(
      this.appwrite.account.createEmailSession(credentials.email, credentials.password),
      asapScheduler
    ).pipe(
      switchMap(() => scheduled(this.appwrite.account.get().catch(() => null), asapScheduler)),
      tap((user) => {
        return this.user$.next({ user })
      }),
    )
  }

  logout() {
    return scheduled(
      this.appwrite.account
        .deleteSession('current').catch(() => undefined).finally(() => this.user$.next({ user: null })),
      asapScheduler
    )
  }

  createAccount(credentials: Credentials) {
    return scheduled(
      defer(() =>
        this.appwrite.account.create(
          ID.unique(),
          credentials.email,
          credentials.password,
          credentials.name
        )
      ),
      asapScheduler
    )
  }


}
