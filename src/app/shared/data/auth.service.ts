import { Injectable, computed, signal } from '@angular/core';
import { defer, from, map, merge, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Account, Client, ID, Models } from 'appwrite';
import { connect } from 'ngxtension/connect';
import { Credentials } from '../types/credentials';

export type AuthUser = Models.Session | null | undefined;

interface AuthState {
  user: AuthUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // deps
  private readonly client = new Client()
    .setEndpoint(environment.endpoint)
    .setProject(environment.projectId)
  private readonly account = new Account(this.client);

  // sources
  private user$ = defer(() => this.account.getSession('current'));
  // state
  private state = signal<AuthState>({
    user: undefined
  });
  // selectors
  user = computed(() => this.state());



  constructor() {
    const nextState$ = merge(this.user$.pipe(map((user) => ({ user })), tap(user => console.log(user))));

    connect(this.state).with(nextState$);
  }

  login(credentials: Credentials) {
    return defer(() =>
      this.account.createEmailSession(credentials.email, credentials.password)
    );
  }

  logout() {
    return from(this.account.deleteSession('current')).pipe(
      tap(() => this.state.update(value => ({ ...value, user: null }))),
      tap(() => console.log('logout called'))
    );
  }

  // async logout() {
  //   return await this.account
  //     .deleteSession('current')
  //     .then(() => this.state.update((value) => (value = null)));
  // }

  createAccount(credentials: Credentials) {
    return from(
      defer(() =>
        this.account.create(
          ID.unique(),
          credentials.email,
          credentials.password,
          credentials.name
        )
      )
    );
  }
}
