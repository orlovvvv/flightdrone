import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
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
    ReactiveFormsModule,
    OptionsPopoverComponent
  ],
  template: `
    <form>
      <ion-list>
      <ion-item>
        <ion-input
          label="Promień lotu"
          placeholder="650"
          type="number"
        />
      </ion-item>
      <ion-item>
        <ion-input
          label="Maksymalna wysokość lotu"
          placeholder="50"
          type="number"
        />
      </ion-item>
      <ion-item>
        <ion-input
          label="Czas trwania lotu"
          type="number"
          placeholder="40"
        />
      </ion-item>
      <ion-item>
      <ion-label>Wybierz drona</ion-label>
       <app-options-popover [optionsList]="userDrones" />
      </ion-item>
    </ion-list>
          <ion-note class="ion-margin ion-padding">Dane dotyczące współrzędnych zostaną pobrane automatycznie po zatwierdzeniu danych.</ion-note>
    </form>
  `,
  styles: `
    form {
      padding-bottom: 12px;
    }  
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckInFormComponent {
  @Input() userDrones: { id: string, name: string }[] = [
    { id: '1', name: 'Dron 1' },
    { id: '2', name: 'Dron 2' },
    { id: '3', name: 'Dron 3' },
    { id: '4', name: 'Dron 4' },
  ];
}
