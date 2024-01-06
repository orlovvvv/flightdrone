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
  apiProfile =
    environment.apiEndpoint + environment.profileCollectionId + '/documents'; // + documentId

  private appwrite = inject(APPWRITE);
  private http = inject(HttpClient);
  private authService = inject(AuthService);
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

  state = signalSlice({
    initialState: this.initialState,
    sources: [this.sources$],
    actionSources: {
      create: (_, $: Observable<string>) =>
        $.pipe(
          switchMap((userId) =>
            this.create(userId).pipe(
              switchMap((document) =>
                this.http
                  .get<Profile>(this.apiProfile + document.$id)
                  .pipe(
                    map((profile) => ({ profile, loaded: true, error: null }))
                  )
              )
            )
          )
        ),
      edit: (_, $: Observable<EditProfile>) =>
        $.pipe(switchMap((edit) => this.edit(edit))),
      remove: (_, $: Observable<RemoveProfile>) =>
        $.pipe(switchMap((removeProfile) => this.remove(removeProfile))),
    },
  });

  create(userId: string) {
    return scheduled(
      this.appwrite.database.createDocument(
        environment.databaseId,
        environment.profileCollectionId,
        userId,
        {}
      ),
      asapScheduler
    ).pipe(
      catchError((err) => {
        this.error$.next(err)
        return EMPTY
      })
    )
  }

  edit(editProfile: EditProfile) {
    return scheduled(
      this.appwrite.database.updateDocument(
        environment.databaseId,
        environment.profileCollectionId,
        editProfile.id,
        editProfile.data
      ),
      asapScheduler
    ).pipe(
      switchMap((document) =>
        this.http.get<Profile>(this.apiProfile + `/${document.$id}`).pipe(
          catchError((err) => {
            this.error$.next(err)
            return EMPTY
          }),
          map((profile) =>
            ({ profile }))
        )
      )
    )
  }

  remove(id: RemoveProfile) {
    return scheduled(
      this.appwrite.database.deleteDocument(
        environment.databaseId,
        environment.profileCollectionId,
        id
      ),
      asapScheduler
    ).pipe(
      catchError((err) => {
        this.error$.next(err)
        return EMPTY
      }),
      map(() => ({ profile: null }))
    )
  }
}
