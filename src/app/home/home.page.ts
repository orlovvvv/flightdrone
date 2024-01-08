import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { LoginService } from '../auth/login/data-access/login.service';
import { AuthService } from '../shared/data-access/auth.service';
import { FlightService } from '../shared/data-access/flight.service';
import { GeolocationService } from '../shared/data-access/geolocation.service';
import { ProfileService } from '../shared/data-access/profile.service';
import { CheckInComponent } from '../shared/feature/check-in.component';
import { MapComponent } from '../shared/feature/map.component';
import { HeaderComponent } from '../shared/ui/header.component';
import { MapSettingsComponent } from '../shared/ui/map-settings.component';
import { ToastErrorComponent } from '../shared/ui/toast-error.component';
import { WidgetsComponent } from '../shared/ui/widgets.component';

@Component({
  selector: 'app-home',
  template: `
    <ion-content [fullscreen]="true">
      <app-map />
      <app-header (logout)="authService.state.signout()" />
      <app-widgets />
      <!-- <app-map-settings /> -->
      <app-check-in />
    </ion-content>
    <app-toast-error
      [error]="this.flightsService.state().error"
      [message]="this.flightsService.state().error"
    />
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
    ToastErrorComponent,
  ],
})
export default class HomePage {
  // dependencies
  protected authService = inject(AuthService);
  protected profileService = inject(ProfileService);
  protected geolocationService = inject(GeolocationService);
  protected flightsService = inject(FlightService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      // navigate user depending on login state
      if (!this.authService.state.user()) {
        this.router.navigate(['auth', 'login']);
      }

    });
  }
}
