import { Component, effect, inject } from '@angular/core'
import { Router } from '@angular/router'
import { IonContent } from '@ionic/angular/standalone'
import { LoginService } from '../auth/login/data-access/login.service'
import { AuthService } from '../shared/data-access/auth.service'
import { GeolocationService } from '../shared/data-access/geolocation.service'
import { ProfileService } from '../shared/data-access/profile.service'
import { CheckInComponent } from '../shared/feature/check-in.component'
import { MapComponent } from '../shared/feature/map.component'
import { HeaderComponent } from '../shared/ui/header.component'
import { MapSettingsComponent } from '../shared/ui/map-settings.component'
import { WidgetsComponent } from '../shared/ui/widgets.component'

@Component({
  selector: 'app-home',
  template: `
  <ion-content [fullscreen]="true">
    <app-map/>
    <app-header (logout)="authService.logout()" />
    <app-widgets />
    <app-map-settings />
    <app-check-in />
  </ion-content>
  `,
  styles: ``,
  standalone: true,
  imports: [
    IonContent,
    HeaderComponent,
    CheckInComponent,
    MapSettingsComponent,
    WidgetsComponent,
    MapComponent,
  ],
})
export default class HomePage {
  protected profileService = inject(ProfileService)
  protected authService = inject(AuthService);
  protected loginService = inject(LoginService)
  private router = inject(Router);
  protected geolocationService = inject(GeolocationService)

  constructor() {

    // navigate user depending on login state
    effect(() => {
      if (!this.authService.state.user()) {
        this.router.navigate(['auth', 'login'])
      }
    })

  }
}
