import { JsonPipe } from '@angular/common';
import { Collection } from './../types/collection';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  SelectChangeEventDetail,
} from '@ionic/angular/standalone';
import { IonSelectCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-options-popover',
  standalone: true,
  imports: [IonList, IonItem, IonSelect, IonSelectOption, ReactiveFormsModule, JsonPipe],
  template: `


    <ion-select  aria-label='select-popover' interface="popover" placeholder="Model" (ionChange)="onSelectChange($event)">
      @for (option of optionsList; track option.$id) {
      <ion-select-option [value]="option">{{option | json}}</ion-select-option>
      }
    </ion-select>


  `,
  styles: `
   
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsPopoverComponent<T extends Collection> {
  @Input() optionsList: T[] = [];

  onSelectChange($event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) {
    throw new Error('Method not implemented.');
  }

}
