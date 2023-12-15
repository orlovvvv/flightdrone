import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, removeOutline, eyeOutline } from 'ionicons/icons';

@Component({
  standalone: true,
  imports: [IonFab, IonFabButton, IonIcon, IonFabList],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-map-settings',
  template: `
    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button size="small">
        <ion-icon name="add-outline"></ion-icon>
      </ion-fab-button>

      <ion-fab-button size="small">
        <ion-icon name="remove-outline"></ion-icon>
      </ion-fab-button>

      <ion-fab-button size="small">
        <ion-icon name="eye-outline"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  `,
  styles: '',
})
export class MapSettingsComponent {
  constructor() {
    addIcons({ addOutline, removeOutline, eyeOutline });
  }
}
