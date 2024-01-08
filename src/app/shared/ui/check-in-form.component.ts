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
import { OptionsPopoverComponent } from './options-popover.component';
import { Drones } from 'src/app/shared/types/drone';
import { AddFlight } from 'src/app/shared/types/flight';
import { Profile } from 'src/app/shared/types/profile';

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
    <form [formGroup]="checkInForm" (ngSubmit)="flight.emit(checkInForm.getRawValue())">
      <ion-list class="ion-padding">
        <ion-item>
          <ion-input
            label="Promień lotu"
            placeholder="650"
            type="number"
            fill="outline"
            formControlName="range"
            name="flight-range"
            labelPlacement="stacked"
            errorText="Wprowadź prawidłowe dane"
            [clearInput]="true"
            tabindex="2"
          />
        </ion-item>
        <ion-item>
          <ion-input
            label="Maksymalna wysokość lotu"
            placeholder="50"
            type="number"
            fill="outline"
            formControlName="height"
            name="max-height"
            labelPlacement="stacked"
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
            name="confirm-password"
            labelPlacement="stacked"
            errorText="Wprowadź prawidłowe dane"
            [clearInput]="true"
            tabindex="2"
          />
        </ion-item>
        <ion-item>
          <ion-label>Wybierz drona</ion-label>
          <!-- <app-options-popover [optionsList]="userDrones" /> -->
            <ion-select formControlName="drone"  aria-label='select-popover' interface="popover" placeholder="Model">
      @for (drone of userDrones; track drone.$id) {
      <ion-select-option [value]="drone">{{drone.model}}</ion-select-option>
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
        width: 100%;
      }
ion-input {
  --max-width: 90%;
  // --background: #373737;
  // --color: #fff;
  // --placeholder-color: #ddd;
  --placeholder-opacity: 0.8;

    margin: 12px 0;
}

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckInFormComponent {
  @Input() userProfile!: Profile;
  @Input() userDrones: Drones = [];
  @Output() flight = new EventEmitter<AddFlight>()

  checkInForm = inject(FormBuilder).nonNullable.group({
    range: [0, Validators.required],
    height: [0, Validators.required],
    duration: [0, Validators.required],
    drone: [this.userDrones[0], Validators.required],
    profile: [{ value: this.userProfile, disabled: true, validators: [Validators.required] }]
  });
}
