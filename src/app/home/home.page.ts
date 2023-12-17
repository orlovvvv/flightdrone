import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { LoginService } from '../auth/login/data-access/login.service';
import { AuthService } from '../shared/data-access/auth.service';
import { CheckInComponent } from '../shared/feature/check-in/check-in.component';
import { MapComponent } from '../shared/feature/map/map.component';
import { HeaderComponent } from '../shared/ui/header/header.component';
import { MapSettingsComponent } from '../shared/ui/map-settings/map-settings.component';
import { WidgetsComponent } from '../shared/ui/widgets/widgets.component';

@Component({
  selector: 'app-home',
  template: `
  <ion-content [fullscreen]="true">
    <app-map />
    <app-header [loginStatus]="loginService.state.status()" (logout)="logout()" />
    <app-widgets />
    <app-map-settings />
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

  constructor() {
    effect(() => {
      if (!this.authService.state.user()) {
        this.router.navigate(['auth', 'login']);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
