import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
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
  IonSpinner,
} from '@ionic/angular/standalone';
import { AddDrone } from '../types/drone';
import { OptionsPopoverComponent } from './options-popover.component';

@Component({
  selector: 'app-drone-form',
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
    IonSpinner,
    ReactiveFormsModule,
    OptionsPopoverComponent,
  ],
  template: `
    <form
      [formGroup]="droneForm"
      (ngSubmit)="drone.emit(droneForm.getRawValue())"
      (submit)="dismiss.emit()"
    >
      <ion-list>
        <ion-item>
          <ion-input
            formControlName="manufacturer"
            name="manufacturer"
            type="text"
            label="Productent"
            labelPlacement="stacked"
            errorText="Pole jest wymagane"
            [clearInput]="true"
            tabindex="2"
          />
        </ion-item>
        <ion-item>
          <ion-input
            formControlName="model"
            name="model"
            type="text"
            label="Model"
            labelPlacement="stacked"
            errorText="Pole jest wymagane"
            [clearInput]="true"
            tabindex="2"
          />
        </ion-item>
        <ion-item>
          <ion-input
            formControlName="serial"
            name="serial"
            type="text"
            label="Numer seryjny"
            labelPlacement="stacked"
            errorText="Pole jest wymagane"
            [clearInput]="true"
            tabindex="2"
          />
        </ion-item>
        <ion-item>
          <ion-input
            formControlName="weight"
            name="weight"
            type="number"
            label="Masa"
            labelPlacement="stacked"
            errorText="Pole jest wymagane"
            [clearInput]="true"
            tabindex="2"
          />
        </ion-item>
      </ion-list>
      <ion-note class="ion-margin ion-padding"
        >Wprowadź dane dotyczące urządzenia i dodaj je do swojego
        profilu.</ion-note
      >
      <ion-button color="tertiary" type="submit"> Dodaj urządzenie</ion-button>
    </form>
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
export class DroneFormComponent {
  // events
  @Output() drone = new EventEmitter<AddDrone>();
  @Output() dismiss = new EventEmitter<void>();
  //   form
  droneForm = inject(FormBuilder).nonNullable.group({
    manufacturer: ['', [Validators.required]],
    model: ['', [Validators.required]],
    serial: ['', [Validators.required]],
    weight: [0, [Validators.required]],
  });
}
