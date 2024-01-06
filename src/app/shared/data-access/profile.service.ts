import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
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
import { AuthService } from 'src/app/shared/data-access/auth.service'
import { environment } from 'src/environments/environment'
import { APPWRITE } from 'src/main'
import { EditProfile, Profile, ProfileState } from '../types/profile'
import { RemoveProfile } from './../types/profile'

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  // dependencies
  private appwrite = inject(APPWRITE);
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  apiProfile =
    environment.apiEndpoint + environment.profileCollectionId + '/documents'; // + documentId

  // initial state
  private initialState: ProfileState = {
    profile: undefined,
    loaded: false,
    error: null,
  };

  // sources
  private error$ = new Subject<string>();
  private profileLoaded$ = this.http
    .get<Profile>(this.apiProfile + `/${this.authService.state.user()?.$id}`)
    .pipe(
      catchError((err) => {
        this.error$.next(err)
        return EMPTY
      })
    );

  sources$ = merge(
    this.profileLoaded$.pipe(map((profile) => ({ profile, loaded: true }))),
    this.error$.pipe(map((error) => ({ error })))
  );

  // state
  state = signalSlice({
    initialState: this.initialState,
    sources: [this.sources$],
    actionSources: {
      add: (_, $: Observable<Omit<Profile, 'id'>>) =>
        $.pipe(
          switchMap((profile) =>
            scheduled(
              this.appwrite.database
                .createDocument(
                  environment.databaseId,
                  environment.profileCollectionId,
                  this.authService.state().user?.$id!,
                  profile
                )
                .then((document) =>
                  ({ id: document.$id, ...profile })),
              asapScheduler
            ).pipe(
              catchError((err) => {
                this.error$.next(err)
                return EMPTY
              }),
              map((profile) =>
                ({ profile, loaded: true, error: null }))
            )
          )
        ),
      edit: (_, $: Observable<EditProfile>) =>
        $.pipe(
          switchMap((update) =>
            scheduled(
              this.appwrite.database
                .updateDocument(
                  environment.databaseId,
                  environment.profileCollectionId,
                  update.id,
                  update.data
                )
                .then((document) => ({ id: document.$id, ...update.data })),
              asapScheduler
            ).pipe(
              catchError((err) => {
                this.error$.next(err)
                return EMPTY
              }),
              map((profile) => ({
                profile,
              }))
            )
          )
        ),
      remove: (_, $: Observable<RemoveProfile>) =>
        $.pipe(
          switchMap((id) =>
            scheduled(
              this.appwrite.database
                .deleteDocument(
                  environment.databaseId,
                  environment.profileCollectionId,
                  id
                )
                .then(() => id),
              asapScheduler
            ).pipe(
              catchError((err) => {
                this.error$.next(err)
                return EMPTY
              }),
              map(() => ({ profile: null }))
            )
          )
        ),
    },
  });
}
