import { MapService } from './../shared/data-access/map.service';
import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { LogoutComponent } from 'src/app/shared/ui/logout.component';
import { APPWRITE } from 'src/main';
import { AuthService } from '../shared/data-access/auth.service';
import { DroneService } from '../shared/data-access/drone.service';
import { FlightService } from '../shared/data-access/flight.service';
import { GeolocationService } from '../shared/data-access/geolocation.service';
import { ProfileService } from '../shared/data-access/profile.service';
import { CheckInComponent } from '../shared/feature/check-in.component';
import { WidgetsComponent } from '../shared/feature/widgets.component';
import { HeaderComponent } from '../shared/ui/header.component';
import { MapSettingsComponent } from '../shared/ui/map-settings.component';
import { ToastErrorComponent } from '../shared/ui/toast-error.component';
import { GoogleMapsComponent } from 'src/app/shared/feature/google-map.component';

@Component({
  selector: 'app-home',
  template: `
    <ion-menu contentId="main-content">
      <ion-toolbar class="menu-header" role="menu-header">
        <ion-title slot="start" size="small"> FlightDrone </ion-title>
        <ion-menu-toggle slot="end">
          <ion-button
            class="cancel"
            color="danger"
            id="present-alert"
            size="small"
          >
            <ion-icon name="close" size="small" />
          </ion-button>
        </ion-menu-toggle>
      </ion-toolbar>
      <ion-content>
        <app-widgets />
      </ion-content>
      <ion-footer class="menu-footer" role="menu-footer">
        <ion-toolbar>
          <app-logout (logout)="this.authService.state.signout()" />
        </ion-toolbar>
      </ion-footer>
    </ion-menu>

    <ion-content
      [fullscreen]="true"
      id="main-content"
      style="overflow-y: hidden;"
    >
      <!-- <app-map style="overflow-y: hidden;" /> -->
      <app-header />
      <!-- <app-map-settings /> -->
      <app-check-in />
    </ion-content>

    <app-toast-error
      [error]="this.flightsService.state().error"
      [message]="this.flightsService.state().error"
    />
  `,
  styles: `
    ion-menu::part(container) {
      border-radius: 0 12px 12px 0;
      --min-width:300px;
    }
    .menu-header {
      padding-inline: 6px;
    }
  `,
  standalone: true,
  imports: [
    IonContent,
    HeaderComponent,
    CheckInComponent,
    MapSettingsComponent,
    WidgetsComponent,
    IonButton,
    ToastErrorComponent,
    IonMenu,
    LogoutComponent,
    IonFooter,
    IonToolbar,
    IonTitle,
    IonMenuToggle,
    IonIcon,
  ],
})
export default class HomePage {
  // dependencies
  protected apprwrite = inject(APPWRITE);
  protected authService = inject(AuthService);
  protected profileService = inject(ProfileService);
  protected droneService = inject(DroneService);
  protected geolocationService = inject(GeolocationService);
  protected flightsService = inject(FlightService);
  protected mapService = inject(MapService)
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
