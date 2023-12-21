import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IonButton, IonInput, IonSpinner } from '@ionic/angular/standalone';
import { Credentials } from 'src/app/shared/types/credentials';
import { LoginStatus } from 'src/app/shared/types/login';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, IonButton, IonInput, IonSpinner],
  template: `
    <form
      [formGroup]="loginForm"
      (ngSubmit)="login.emit(loginForm.getRawValue())"
    >
      <ion-input
        formControlName="email"
        type="email"
        label="Email"
        labelPlacement="floating"
        errorText="Pole jest wymagane"
        [clearInput]="true"
        color="primary"
        tabindex="2"
      ></ion-input>
      <ion-input
        formControlName="password"
        type="password"
        label="Hasło"
        labelPlacement="floating"
        errorText="Pole jest wymagane"
        [clearInput]="true"
        color="primary"
        tabindex="2"
      ></ion-input>
      <ion-button
        color="tertiary"
        type="submit"
        [disabled]="loginStatus === 'authenticating'"
      >
        @if (loginStatus !== 'authenticating') { Zaloguj się } @else {
        <ion-spinner
          class="button-spinner"
          name="circular"
          color="dark"
        ></ion-spinner>
        }
      </ion-button>
    </form>
  `,
  styles: `
   form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 32px;

      }

      ion-button {
        width: 100%;
      }

      mat-error {
        margin: 5px 0;
      }

      .button-spinner {
        width:  16px;
        height: 16px;
      }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Input({ required: true }) loginStatus: LoginStatus = 'pending';
  @Output() login = new EventEmitter<Credentials>();

  loginForm = inject(FormBuilder).nonNullable.group({
    email: [''],
    password: [''],
  });
}
