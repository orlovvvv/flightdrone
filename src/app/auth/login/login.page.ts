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
  IonContent,
  IonGrid,
  IonNote,
  IonRow,
  IonSpinner,
  IonText,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { ToastErrorComponent } from 'src/app/shared/ui/toast-error.component';
import { LoginService } from './data-access/login.service';
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
    IonContent,
    IonGrid,
    IonRow,
    LoginFormComponent,
    ToastErrorComponent,
  ],
  template: `
    <ion-content class="ion-page">
      <ion-grid style="height: 100%">
        <ion-row justify-content-center align-items-center style="height: 100%">
          <ion-card class="login-card rounded ion-no-margin" @fadeInOut>
            @if(authService.state.user() === null){
            <ion-card-header>
              <ion-card-title> Logowanie </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <app-login-form
                [loginStatus]="loginService.state.status()"
                (login)="loginService.state.login($event)"
              />
              <ion-note>
                Nie masz konta?
                <ion-text routerLink="/auth/register" color="primary">
                  Utwórz konto
                </ion-text>
              </ion-note>
            </ion-card-content>
            } @else {
            <ion-card-content>
              <ion-spinner
                class="login-spinner"
                name="circular"
                color="primary"
              ></ion-spinner>
            </ion-card-content>
            }
          </ion-card>
          <app-toast-error
            [error]="this.loginService.state.status()"
            [message]="'Nierpawidłowy login lub hasło'"
          /> </ion-row></ion-grid
    ></ion-content>
  `,
  styles: `
ion-icon {
  width: 24px;
  height: 24px;
}

.login-card {
    background: rgba(0, 0, 0, 0.75);
    margin: auto;
    width: 100%;
    max-width: 420px;
    min-height: 234px;
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

ion-note {
   position: absolute;
  bottom: 0;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
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
