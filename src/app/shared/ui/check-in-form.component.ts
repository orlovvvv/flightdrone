import {
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
import { Drones } from 'src/app/shared/types/drone';
import { AddFlight } from '../types/flight';
import { Profile } from '../types/profile';
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
    ReactiveFormsModule,
    OptionsPopoverComponent,
  ],
  template: `
    <form
      [formGroup]="checkInForm"
      (ngSubmit)="flight.emit(checkInForm.getRawValue())"
    >
      <ion-list>
        <ion-item>
          <ion-input
            placeholder="650"
            type="number"
            fill="outline"
            formControlName="range"
            name="flight-range"
            label="Promień lotu"
            errorText="Wprowadź prawidłowe dane"
            [clearInput]="true"
            tabindex="2"
          />
        </ion-item>
        <ion-item>
          <ion-input
            placeholder="50"
            type="number"
            fill="outline"
            formControlName="height"
            name="max-height"
            label="Maksymalna wysokość lotu"
            errorText="Wprowadź prawidłowe dane"
            [clearInput]="true"
            tabindex="2"
          />
        </ion-item>
        <ion-item>
          <ion-input
            label="Czas trwania lotu"
            type="number"
            placeholder="40"
            fill="outline"
            formControlName="duration"
            name="duration"
            errorText="Wprowadź prawidłowe dane"
            [clearInput]="true"
            tabindex="2"
          />
        </ion-item>
        <ion-item>
          <ion-label>Wybierz drona</ion-label>
          <!-- <app-options-popover [optionsList]="userDrones" /> -->
          <ion-select
            formControlName="drone"
            aria-label="select-popover"
            interface="popover"
            placeholder="Model"
          >
            @for (drone of userDrones; track drone.$id) {
            <ion-select-option [value]="drone.$id">{{
              drone.model
            }}</ion-select-option>
            }
          </ion-select>
        </ion-item>
      </ion-list>
      <ion-note class="ion-margin ion-padding"
        >Dane dotyczące współrzędnych zostaną pobrane automatycznie po
        zatwierdzeniu danych.</ion-note
      >
      <ion-button
        color="tertiary"
        type="submit"
        [disabled]="!checkInForm.valid"
      >
        Start
      </ion-button>
    </form>
  `,
  styles: `
form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 12px;
      }

ion-list{
    width: 100%;
    padding: 12px
}      
ion-input {
    margin: 12px;
    --border-radius: 12px;
    --border-width: 2px;
    --border-color: var(--ion-color-tertiary);
}

ion-label {
    width: fit-content;
    text-wrap: none;
}

ion-button {
  width: 100%;
  max-width: 384px;
}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckInFormComponent {
  @Input() userProfile!: Profile;
  @Input() userDrones: Drones = [];
  @Output() flight = new EventEmitter<AddFlight>();

  checkInForm = inject(FormBuilder).nonNullable.group({
    range: [0, Validators.required],
    height: [0, Validators.required],
    duration: [0, Validators.required],
    drone: ['', Validators.required],
  });
}
