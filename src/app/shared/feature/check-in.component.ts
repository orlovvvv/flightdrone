import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core'
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone'
import { GeolocationService } from '../data-access/geolocation.service'
import { CheckInFormComponent } from '../ui/check-in-form.component'
import { GeolocationButtonComponent } from '../ui/geolocation-button.component'


@Component({
  standalone: true,
  imports: [
    IonFab,
    IonButton,
    IonIcon,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonNote,
    IonButtons,
    IonItem,
    IonInput,
    IonContent,
    IonList,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonFooter,
    CheckInFormComponent,
    GeolocationButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-check-in',
  template: `
    <ion-fab slot="fixed" vertical="bottom" horizontal="center">
      <ion-button id="open-modal">
        <ion-icon slot="start" name="airplane"></ion-icon>
        CHECK IN
      </ion-button>
    </ion-fab>
    <ion-content>
      <ion-modal id="example-modal" #modal trigger="open-modal">
        <ng-template>
          <div class="wrapper">
          <ion-header>
            <ion-toolbar>
              <ion-title class="ion-margin-horizontal">Check in</ion-title>
              <ion-note class="ion-margin-horizontal"> Wprowadź dane lotu </ion-note>
            </ion-toolbar>
          </ion-header>

          <app-check-in-form />

          <ion-footer>
            <ion-toolbar>
              <app-geolocation-button (location)="geolocationService.state.locate()"/>
              <ion-button slot="start" (click)="cancel()" color="danger"
                >Anuluj</ion-button
              >
              <ion-button slot="end" (click)="confirm()" color="primary"
                >Zatwierdź</ion-button
              >
            </ion-toolbar>
          </ion-footer>
          </div>
        </ng-template>
      </ion-modal>
    </ion-content>
  `,
  styles: `
  ion-modal#example-modal {
  --width: fit-content;
  --min-width: 250px;
  --height: fit-content;
  --border-radius: 6px;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
  --background: var(--ion-card-background)
}
ion-title {
  padding: 0;
}
ion-toolbar {
  padding: 0 12px;
}

`,
})
/*
 * *
 * * This component is responsible for:
 * * - initializing user data
 * * - setting up check in form with user location and drones
 * * - passing data to service for saving
 * *
 */
export class CheckInComponent {
  public geolocationService = inject(GeolocationService)
  @ViewChild(IonModal) modal!: IonModal

  checkInModal: HTMLElement | null = null;

  cancel() {
    this.modal.dismiss(null, 'cancel')
  }

  confirm() {
    this.modal.dismiss('confirm')
  }

  constructor() {
    // effect(() => console.log(this.geolocationService.state.position()))
  }

}
