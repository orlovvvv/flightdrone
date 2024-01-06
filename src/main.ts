import { provideHttpClient } from '@angular/common/http'
import { InjectionToken, enableProdMode, isDevMode } from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser'
import { provideAnimations } from '@angular/platform-browser/animations'
import {
  RouteReuseStrategy,
  provideRouter
} from '@angular/router'
import { provideServiceWorker } from '@angular/service-worker'
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone'
import { Account, Client, Databases } from 'appwrite'
import { AppComponent } from './app/app.component'
import { routes } from './app/app.routes'
import { environment } from './environments/environment'

if (environment.production) {
  enableProdMode()
}

export const APPWRITE = new InjectionToken('Appwrite auth', {
  providedIn: 'root',
  factory: () => {
    const client = new Client()
      .setEndpoint(environment.endpoint)
      .setProject(environment.projectId)

    const account = new Account(client)
    const database = new Databases(client)
    return { account, database }
  },
})


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({ mode: 'md' }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
})
