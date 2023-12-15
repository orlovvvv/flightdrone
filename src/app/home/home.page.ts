import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { AuthService } from '../shared/data/auth.service';
import { CheckInComponent } from '../shared/feature/check-in/check-in.component';
import { MapComponent } from '../shared/feature/map/map.component';
import { HeaderComponent } from '../shared/ui/header/header.component';
import { MapSettingsComponent } from '../shared/ui/map-settings/map-settings.component';
import { WidgetsComponent } from '../shared/ui/widgets/widgets.component';

@Component({
  selector: 'app-home',
  template: `
  <ion-content [fullscreen]="true">
    <app-header [loginStatus]="authService.user().status" />
    <app-map />
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
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (!this.authService.user().session) {
        this.router.navigate(['auth', 'login'])
      }
    });
  }
}
