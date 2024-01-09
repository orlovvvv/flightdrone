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
import { RegisterService } from './data-access/register.service';
import { RegisterFormComponent } from './ui/register-form.component';

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
    RegisterFormComponent,
    ToastErrorComponent,
  ],
  template: `
    <ion-content class="ion-page">
      <ion-grid style="height: 100%">
        <ion-row justify-content-center align-items-center style="height: 100%">
          <ion-card class="register-card ion-no-margin" @fadeInOut>
            @if(!authService.state.user()){
            <ion-card-header>
              <ion-card-title> Rejestracja </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <app-register-form
                [registerStatus]="registerService.state.status()"
                (register)="registerService.state.createUser($event)"
              />
              <ion-note>
                Masz już konto?
                <ion-text routerLink="/auth/login" color="primary">
                  Zaloguj się
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
        </ion-row>
      </ion-grid>

      <app-toast-error
        [error]="this.registerService.state.status()"
        [message]="'Na podany adres zostało już założone konto'"
      />
    </ion-content>
  `,
  styles: `
ion-icon {
  width: 24px;
  height: 24px;
}

.register-card {

  margin: auto;
  width: 100%;
  max-width: 480px;
  min-height: 558px;
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
export default class RegisterPage {
  public registerService = inject(RegisterService);
  public authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.state.user()) {
        this.router.navigate(['home']);
      }
      console.log(this.registerService.state.status());
    });
  }
}
