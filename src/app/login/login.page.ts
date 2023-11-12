import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ID, account } from 'src/lib/appwrite';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonRow,
  IonSpinner,
} from '@ionic/angular/standalone';

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
    IonGrid,
    IonRow,
    IonCol,
    ReactiveFormsModule,
  ],
  template: `
    <ion-card class="login-card rounded" @inOut>
      <ion-row class="wrapper">
        <ion-col size-md="3" size="12">
          <img
            style="position: relative; margin: 0 12px 0 12px"
            src="../../assets/shapes.svg"
            alt="Inventory Logo"
            width="256px"
            height="auto"
          />
        </ion-col>
        <ion-col size-md="9">
          <ion-card-header>
            <ion-card-title> Logowanie </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <form
              [formGroup]="loginForm"
              (ngSubmit)="
                login(loginForm.value.email!, loginForm.value.password!)
              "
            >
              <ion-input
                label="Nazwa użytkownika"
                labelPlacement="floating"
                errorText="Pole jest wymagane"
                type="text"
                [clearInput]="true"
                color="primary"
                tabindex="2"
              ></ion-input>
              <ion-input
                formControlName="password"
                label="Hasło"
                labelPlacement="floating"
                errorText="Pole jest wymagane"
                type="password"
                [clearInput]="true"
                color="primary"
                tabindex="2"
              ></ion-input>
              <ion-button
                shape="round"
                size="small"
                color="primary"
                type="submit"
              >
                Zaloguj się
              </ion-button>
              <ion-button
                shape="round"
                size="small"
                color="primary"
                type="submit"
                (click)="
                  register(
                    loginForm.value.email!,
                    loginForm.value.password!,
                    name
                  )
                "
              >
                Zarejestruj się
              </ion-button>
            </form>
          </ion-card-content>
        </ion-col>
      </ion-row>
    </ion-card>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  loggedInUser: any = null;
  name: string = '';

  private fb = inject(FormBuilder);

  loginForm = this.fb.nonNullable.group({
    email: '',
    password: '',
  });

  async login(email: string, password: string) {
    await account.createEmailSession(email, password);
    this.loggedInUser = await account.get();
    console.log(this.loggedInUser);
  }

  async register(email: string, password: string, name: string) {
    await account.create(ID.unique(), email, password, name);
    this.login(email, password);
  }

  async logout() {
    await account.deleteSession('current');
    this.loggedInUser = null;
  }
}
