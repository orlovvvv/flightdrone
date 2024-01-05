import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'
import { IonButton } from '@ionic/angular/standalone'

@Component({
  selector: 'app-geolocation-button',
  standalone: true,
  imports: [
    IonButton,
  ],
  template: `<ion-button type="outlined"  shape="round" (click)="location.emit()"> Lokalizacja </ion-button>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeolocationButtonComponent {
  @Output() location = new EventEmitter<void>()
}
