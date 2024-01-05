import { AsyncPipe } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core'
import {
  IonButton,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone'
import { SearchComponent } from '../feature/search.component'

@Component({
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    SearchComponent,
    IonButton,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  template: `
    <ion-toolbar
      class="menubar"
      role="menubar"
      color="none"
      style="position: absolute; top: 0;"
    >
      <ion-title slot="start" color="light"> FlightDrone </ion-title>
      <app-search slot="end" />
      <ion-button
        slot="end"
        shape="round"
        (click)="logout.emit()"
      >
        Wyloguj się</ion-button
      >
    </ion-toolbar>
  `,
  styles: ``,
})
export class HeaderComponent {
  @Output() logout = new EventEmitter<void>()
}
