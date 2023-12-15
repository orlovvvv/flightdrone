import { Injectable, computed, signal } from '@angular/core';
import {
  EMPTY,
  Subject,
  asapScheduler,
  asyncScheduler,
  catchError,
  defer,
  from,
  map,
  merge,
  scheduled,
  switchMap,
  tap,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { Account, Client, ID, Models } from 'appwrite';
import { connect } from 'ngxtension/connect';
import { Credentials } from '../types/credentials';
import { LoginState, LoginStatus } from '../types/login';

export type AuthUser = Models.Session | undefined;

type AuthState = {
  session: AuthUser;
  status: LoginStatus;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // dependencies
  private readonly client = new Client()
    .setEndpoint(environment.endpoint)
    .setProject(environment.projectId);
  private readonly account = new Account(this.client);

  // sources
  error$ = new Subject<any>();
  login$ = new Subject<Credentials>();
  userAuthenticated$ = this.login$.pipe(
    switchMap((credentials) =>
      this.login(credentials).pipe(
        catchError((err) => {
          this.error$.next(err);
          return EMPTY;
        })
      )
    )
  );

  // state
  private state = signal<AuthState>({
    session: undefined,
    status: 'pending',
  });

  user = computed(() => this.state());


  // selectors
  constructor() {
    const nextState$ = merge(
      this.userAuthenticated$.pipe(map((session) => ({ session: session, status: 'success' as const }))),
      this.login$.pipe(map(() => ({ session: undefined, status: 'authenticating' as const }))),
      this.error$.pipe(map(() => ({ session: undefined, status: 'error' as const })))
    );
    connect(this.state).with(nextState$);
  }

  // methods
  login(credentials: Credentials) {
    return defer(() =>
      this.account.createEmailSession(credentials.email, credentials.password)
    );
  }
  logout() {
    return scheduled(this.account.deleteSession('current'), asapScheduler).pipe(
      tap(() => this.state.update((value) => ({ ...value, session: undefined, status: 'pending' as const })))
    );
  }
  createAccount(credentials: Credentials) {
    return scheduled(
      defer(() =>
        this.account.create(
          ID.unique(),
          credentials.email,
          credentials.password,
          credentials.name
        )
      ),
      asapScheduler
    );
  }
}
