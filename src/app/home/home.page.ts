import { NgOptimizedImage } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { GoogleMapsComponent } from 'src/app/shared/feature/google-map.component';
import { LogoutComponent } from 'src/app/shared/ui/logout.component';
import { APPWRITE } from 'src/main';
import { AuthService } from '../shared/data-access/auth.service';
import { DroneService } from '../shared/data-access/drone.service';
import { FlightService } from '../shared/data-access/flight.service';
import { GeolocationService } from '../shared/data-access/geolocation.service';
import { ProfileService } from '../shared/data-access/profile.service';
import { CheckInComponent } from '../shared/feature/check-in.component';
import { UserFlightsComponent } from '../shared/feature/user-flights.component';
import { HeaderComponent } from '../shared/ui/header.component';
import { MapSettingsComponent } from '../shared/ui/map-settings.component';
import { ToastErrorComponent } from '../shared/ui/toast-error.component';
import { MapService } from './../shared/data-access/map.service';
import { UserSettingsComponent } from 'src/app/shared/feature/user-settings.component';
import { WeatherComponent } from 'src/app/shared/feature/weather.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    ToastErrorComponent,
    IonMenu,
    LogoutComponent,
    IonFooter,
    IonToolbar,
    IonTitle,
    IonMenuToggle,
    IonIcon,
    IonItem,
    IonLabel,
    GoogleMapsComponent,
    NgOptimizedImage,
    UserSettingsComponent,
    HeaderComponent,
    CheckInComponent,
    MapSettingsComponent,
    UserFlightsComponent,
    WeatherComponent
  ],
  template: `
    <ion-menu contentId="main-content">
      <ion-toolbar class="menu-header" role="menu-header">
        <img
          class="logo"
          slot="start"
          ngSrc="/../../../assets/png/FlightDrone_logo.png"
          width="auto"
          height="42"
          priority
          alt="FlightDrone"
        />
      </ion-toolbar>
      <ion-content>
        <app-weather />
        <app-user-settings />
        <app-user-flights />
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
      <app-google-map style="z-index: 0;" />
      <!-- <app-map-settings /> -->
      <app-check-in />
    </ion-content>

    <app-toast-error
      [error]="
        this.flightsService.state().error ||
        this.profileService.state().error ||
        this.droneService.state().error ||
        this.flightsService.state().error ||
        this.mapService.state().error
      "
      message="Coś poszło nie tak"
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
    
    .logo{
    margin: 7px; 
    border-radius: 12px; 
    }
  `,
})
export default class HomePage {
  // dependencies
  protected apprwrite = inject(APPWRITE);
  protected authService = inject(AuthService);
  protected profileService = inject(ProfileService);
  protected droneService = inject(DroneService);
  protected geolocationService = inject(GeolocationService);
  protected flightsService = inject(FlightService);
  protected mapService = inject(MapService);
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
