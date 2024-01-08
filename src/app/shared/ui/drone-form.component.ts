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
  selector: 'app-check-in-form',
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
    >
      <ion-list>
        <ion-item>
          <ion-input
            fill="outline"
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
            fill="outline"
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
            fill="outline"
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
            fill="outline"
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
      <ion-button fill="outline" color="tertiary" type="submit"> </ion-button>
    </form>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DroneFormComponent {
  // events
  @Output() drone = new EventEmitter<AddDrone>();
  //   form
  droneForm = inject(FormBuilder).nonNullable.group({
    manufacturer: ['', [Validators.required]],
    model: ['', [Validators.required]],
    serial: ['', [Validators.required]],
    weight: [0, [Validators.required]],
  });
}
