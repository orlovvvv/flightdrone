import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonNote,
  IonSpinner,
  IonText,
} from '@ionic/angular/standalone'
import { AuthService } from 'src/app/shared/data-access/auth.service'
import { ToastErrorComponent } from 'src/app/shared/ui/toast-error.component'
import { RegisterService } from './data-access/register.service'
import { RegisterFormComponent } from './ui/register-form.component'

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
    RegisterFormComponent,
    ToastErrorComponent,
  ],
  template: `
    <ion-card class="login-card rounded" @fadeInOut>
      @if(!authService.state.user()){
      <ion-card-header>
        <ion-card-title> Rejestracja </ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <app-register-form
          [registerStatus]="this.registerService.state.status()"
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
    <app-toast-error [error]="this.registerService.state.status()" [message]="'Na podany adres zostało już założone konto'" />
  `,
  styles: `
ion-icon {
  width: 24px;
  height: 24px;
}

.login-card {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 578px;
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
        this.router.navigate(['home'])
      }
      console.log(this.registerService.state.status())
    })
  }
}
