import { Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { LoginService } from '../auth/login/data-access/login.service';
import { AuthService } from '../shared/data-access/auth.service';
import { CheckInComponent } from '../shared/feature/check-in.component';
import { MapComponent } from '../shared/feature/map.component';
import { HeaderComponent } from '../shared/ui/header.component';
import { MapSettingsComponent } from '../shared/ui/map-settings.component';
import { WidgetsComponent } from '../shared/ui/widgets.component';

@Component({
  selector: 'app-home',
  template: `
  <ion-content [fullscreen]="true">
    <app-map [zoom]="zoom()" />
    <app-header [loginStatus]="loginService.state.status()" (logout)="logout()" />
    <app-widgets />
    <app-map-settings (increaseZoom)="increaseZoom()" (decreaseZoom)="decraseZoom()" (toggleMapMode)="toggleMapMode()" />
    <app-check-in />
  </ion-content>`,
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
  public authService = inject(AuthService);
  public loginService = inject(LoginService)
  private router = inject(Router);

  zoom = signal<number>(6)

  increaseZoom() {
    this.zoom.update(value => value = value + 1)
  }
  decraseZoom() {
    this.zoom.update(value => value = value - 1)
  }
  toggleMapMode() {

  }

  constructor() {
    effect(() => {
      if (!this.authService.state.user()) {
        this.router.navigate(['auth', 'login']);
      }
      console.log(this.zoom())
    });
  }

  logout() {
    this.authService.logout();
  }
}
