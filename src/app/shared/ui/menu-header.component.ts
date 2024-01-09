import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Output,
} from '@angular/core';
import {
    IonButton,
    IonButtons,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonMenuToggle,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import { SearchComponent } from '../feature/search.component';

@Component({
    standalone: true,
    imports: [
        IonHeader,
        IonToolbar,
        IonTitle,
        SearchComponent,
        IonButton,
        IonMenuToggle,
        IonIcon,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-menu-header',
    template: `
    <ion-toolbar class="menu-header" role="menu-header">
      <ion-title slot="start"> FlightDrone </ion-title>
      <ion-menu-toggle slot="end" >
        <ion-button class="cancel" color="danger" id="present-alert" size="small" >
          <ion-icon name="close" />
        </ion-button>
      </ion-menu-toggle>
    </ion-toolbar>
  `,
    styles: ``,
})
export class MenuHeaderComponent {
    @Output() logout = new EventEmitter<void>();
}
