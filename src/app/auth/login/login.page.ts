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
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { LoginService } from './data-access/login.service';
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
    <ion-card class="login-card rounded" @fadeInOut>
      @if(authService.state.user() === null){
      <ion-card-header>
        <ion-card-title> Logowanie </ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <app-login-form
          [loginStatus]="loginService.state.status()"
          (login)="loginService.state.login($event)"
        />
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
  max-width: 468px;
  max-height: 240px;
  position: absolute;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
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
  height: 36px;
  width: 36px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
`,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
