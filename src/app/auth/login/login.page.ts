import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonInput,
  IonSpinner,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/shared/data/auth.service';
import { LoginService } from './data/login.service';
import { LoginFormComponent } from './ui/login-form.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonButton,
    IonInput,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSpinner,
    ReactiveFormsModule,
    IonIcon,
    LoginFormComponent,
  ],
  template: `
    <ion-card class="login-card rounded">
      <ion-card-header>
        <ion-card-title> Logowanie </ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <app-login-form
          [loginStatus]="loginService.status()"
          (login)="loginService.login$.next($event)"
        />
      </ion-card-content>
    </ion-card>
  `,
  styles: `
ion-icon {
  width: 24px;
  height: 24px;
}

.login-card {
  max-width: 768px;
  width: 100%;
  height: 100%;
  max-height: 384px;
  display: block;
  margin: auto;
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
  --border-color: var(--ion-color-primary);
}

.login-spinner {
  margin: 0 !important;
  height: 56px;
  width: 56px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media screen and (max-width: 769px) {
  .login-card {
    max-width: 768px;
    width: 100%;
    height: 100%;
    max-height: 586px;
    display: block;
    margin: auto;
  }
  .logo-icon {
    width: 100%;
    height: 196px;
  }
}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  public loginService = inject(LoginService);
  public authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.user()) {
        console.log('it works')
        this.router.navigate(['home']);
      }
    });
  }
}
