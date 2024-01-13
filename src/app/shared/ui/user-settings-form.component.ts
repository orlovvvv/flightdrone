import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { EditProfile, Profile } from '../types/profile';
import { OptionsPopoverComponent } from './options-popover.component';

@Component({
  selector: 'app-user-settings-form',
  standalone: true,
  imports: [
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    ReactiveFormsModule,
    OptionsPopoverComponent,
  ],
  template: `
    @if(userProfile){
    <form
      [formGroup]="userSettingsForm"
      (ngSubmit)="
        profile.emit({
          id: userProfile.$id,
          data: userSettingsForm.getRawValue()
        })
      "
      (submit)="dismiss.emit()"
    >
      <ion-list lines="none">
        <ion-item>
          <ion-input
            formControlName="pilotNumber"
            label="Numer pilota"
            labelPlacement="stacked"
            type="text"
            color="primary"
            name="pilot-id"
            errorText="Wprowadź prawidłowe dane"
            tabindex="2"
          />
        </ion-item>
        <ion-item>
          <ion-input
            formControlName="operatorNumber"
            label="Numer operatora"
            labelPlacement="stacked"
            type="text"
            color="primary"
            name="operator-id"
            errorText="Wprowadź prawidłowe dane"
            tabindex="2"
          />
        </ion-item>
        <ion-item>
          <ion-label>Licencja A1</ion-label>

          <ion-select
            formControlName="licenseA1"
            aria-label="select-popover"
            interface="popover"
            color="primary"
            name="license-a1"
          >
            <ion-select-option [value]="true"> Tak </ion-select-option>
            <ion-select-option [value]="false"> Nie </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Licencja A2</ion-label>

          <ion-select
            formControlName="licenseA2"
            aria-label="select-popover"
            interface="popover"
            color="primary"
            name="license-a2"
          >
            <ion-select-option [value]="true"> Tak </ion-select-option>
            <ion-select-option [value]="false"> Nie </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Licencja A3</ion-label>

          <ion-select
            formControlName="licenseA3"
            aria-label="select-popover"
            interface="popover"
            color="primary"
            name="license-a3"
          >
            <ion-select-option [value]="true"> Tak </ion-select-option>
            <ion-select-option [value]="false"> Nie </ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
      <ion-button
        color="tertiary"
        type="submit"
        [disabled]="!userSettingsForm.valid"
      >
        Zapisz
      </ion-button>
    </form>
    }
  `,
  styles: `
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-bottom: 12px;
        background: none;
    }


    ion-list {
      height: 100%;
      width: 100%;
      background: none!important;
    }

    ion-item {
      border-radius: 12px;
      margin:6px 6px;
  }

    ion-label {
        width: fit-content;
        text-wrap: none;
    }

    ion-button {
      width: 100%;
      max-width: 384px;
    }

 
    ion-input {
            background: none!important;

      border-radius: 12px;
      padding-bottom: 2px;
    }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsFormComponent implements AfterViewInit {
  @Input() userProfile: Profile | undefined;
  @Output() profile = new EventEmitter<EditProfile>();
  @Output() dismiss = new EventEmitter<void>();
  userSettingsForm = inject(FormBuilder).nonNullable.group({
    pilotNumber: ['', Validators.required],
    operatorNumber: ['', Validators.required],
    licenseA1: [false],
    licenseA2: [false],
    licenseA3: [false],
  });

  ngAfterViewInit() {
    if (this.userProfile) {
      this.userSettingsForm.setValue({
        pilotNumber: this.userProfile.pilotNumber,
        operatorNumber: this.userProfile.operatorNumber,
        licenseA1: this.userProfile.licenseA1,
        licenseA2: this.userProfile.licenseA2,
        licenseA3: this.userProfile.licenseA3,
      });
    }
  }
}
