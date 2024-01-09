import { AsyncPipe } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core'
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonMenuButton,
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
    IonButtons,
    IonMenuButton,
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
       <ion-buttons slot="end">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
     
    </ion-toolbar>
  `,
  styles: ``,
})
export class HeaderComponent {

}
