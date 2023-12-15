import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import {
  IonButton,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { AuthService } from '../../data/auth.service';
import { SearchComponent } from '../../feature/search/search.component';
import { LoginStatus } from '../../types/login';

@Component({
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    SearchComponent,
    IonButton,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  template: `
    <ion-toolbar
      class="menubar"
      role="menubar"
      color="none"
      style="position: absolute; top: 0;"
    >
      <ion-title slot="start"> FlightDrone </ion-title>
      <app-search slot="end" />
      <ion-button
        slot="end"
        (click)="logout()"
        [disabled]="loginStatus === 'pending'"
      >
        Wyloguj się</ion-button
      >
    </ion-toolbar>
  `,
  styles: ``,
})
export class HeaderComponent {
  @Input({ required: true }) loginStatus: LoginStatus = 'pending';
  // todo: refactor for input instead of service use
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
