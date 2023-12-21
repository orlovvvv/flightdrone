import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonNote,
  IonSpinner,
  IonText
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { LoginService } from '../../shared/data-access/login.service';
import { LoginFormComponent } from './ui/login-form.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    IonNote,
    IonText,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSpinner,
    LoginFormComponent
  ],
  template: `
    <ion-card class="login-card rounded" @fadeInOut>
      @if(authService.state.user() === null){
      <ion-card-header>
        <ion-card-title > Logowanie </ion-card-title>
      </ion-card-header>
      <ion-card-content style="text-align: center">
        <app-login-form
        style="text-align: left"
          [loginStatus]="loginService.state.status()"
          (login)="loginService.state.login($event)"
        />
        <ion-note  > Nie masz konta? <ion-text routerLink="/auth/register" color="primary" class="create-account-link"> Utwórz konto </ion-text> </ion-note>
       
      </ion-card-content>
       } @else { 
        <ion-card-content>
          <ion-spinner class="login-spinner" name="circular" color="primary"></ion-spinner>
        </ion-card-content>
       }
    </ion-card>
  `,
  styles: `
ion-icon {
  width: 24px;
  height: 24px;
}

.login-card {
  max-width: 578px;
  height: 100%;
  max-height: 320px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  flex-direction: column;

  justify-content: center;
  
}

.logo-icon {
  width: 100%;
  height: 256px;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

ion-input {
  max-width: 384px;
  margin-bottom: 12px;
  --border-radius: 12px;
  --border-width: 2px;
  --border-color: var(--ion-color-tertiary);
}

.login-spinner {
  margin: 0 !important;
  height: 36px;
  width: 36px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

ion-button {
  width: 100%;
}

ion-text:hover {
  cursor: pointer;
}
`,
})
export default class LoginPage {
  public loginService = inject(LoginService);
  public authService = inject(AuthService);

  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.state.user()) {
        this.router.navigate(['home']);
      }
    });
  }
}
