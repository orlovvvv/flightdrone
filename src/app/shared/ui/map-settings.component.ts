import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import {
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
} from '@ionic/angular/standalone';


@Component({
  standalone: true,
  imports: [IonFab, IonFabButton, IonIcon, IonFabList],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-map-settings',
  template: `
    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button size="small" (click)="increaseZoom.emit()">
        <ion-icon name="add-outline"></ion-icon>
      </ion-fab-button>

      <ion-fab-button size="small"  (click)="decreaseZoom.emit()">
        <ion-icon name="remove-outline"></ion-icon>
      </ion-fab-button>

      <ion-fab-button size="small" (click)="toggleMapMode.emit()">
        <ion-icon name="eye-outline"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  `,
  styles: '',
})
export class MapSettingsComponent {
  @Output() increaseZoom = new EventEmitter<void>()
  @Output() decreaseZoom = new EventEmitter<void>()
  @Output() toggleMapMode = new EventEmitter<void>()
}

