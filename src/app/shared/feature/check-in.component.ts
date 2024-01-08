import { DroneService } from './../data-access/drone.service';
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  computed,
  effect,
  inject,
} from '@angular/core';
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
} from '@ionic/angular/standalone';
import { GeolocationService } from '../data-access/geolocation.service';
import { CheckInFormComponent } from '../ui/check-in-form.component';
import { CurrentFlightComponent } from '../ui/current-flight.component';
import { GeolocationButtonComponent } from '../ui/geolocation-button.component';
import { FlightService } from 'src/app/shared/data-access/flight.service';
import { isTimeLeft } from 'src/app/shared/utils/remaining-time';
import { ProfileService } from 'src/app/shared/data-access/profile.service';
import { UTCDate } from '@date-fns/utc';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { Animations } from '../animation/animation'
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    GeolocationButtonComponent,
    CurrentFlightComponent,
  ],
  selector: 'app-check-in',
  animations: [Animations],
  styles: `
  ion-modal#example-modal {
    --width: fit-content;
    --min-width: 250px;
    --height: fit-content;
    --border-radius: 24px;
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
  template: `
    @if(!flight()){
    <ion-fab slot="fixed" vertical="bottom" horizontal="center" @inOut>
      <ion-button id="open-modal">
        <ion-icon slot="start" name="airplane"></ion-icon>
        CHECK IN
      </ion-button>
    </ion-fab>
    <ion-content>
      <ion-modal
        id="example-modal"
        #modal
        trigger="open-modal"
        [showBackdrop]="false"
      >
        <ng-template>
          <div class="wrapper">
            <ion-header>
              <ion-toolbar>
                <ion-title class="ion-margin-horizontal">Check in</ion-title>
                <ion-note class="ion-margin-horizontal">
                  Wprowadź dane lotu
                </ion-note>
              </ion-toolbar>
            </ion-header>

            <app-check-in-form />

            <ion-footer>
              <ion-toolbar>
                <app-geolocation-button
                  (location)="geolocationService.state.locate()"
                />
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
      <!-- Current flight UI -->
    </ion-content>
    } @else {
      <app-current-flight [flight]="flight()" (endFlight)="this.flightsService.state.edit($event)" @inOut/>
    }
  `,

})
/*
 * *
 * * This component is responsible for:
 * * - initializing flight data
 * * - setting up check in form with user location and drones
 * * - passing data to flight.service
 * *
 */
export class CheckInComponent {
  // dependencies
  @ViewChild(IonModal) modal!: IonModal;
  protected geolocationService = inject(GeolocationService);
  protected droneService = inject(DroneService);
  protected authService = inject(AuthService);
  protected flightsService = inject(FlightService)

  // current flight if exists
  flight = computed(
    () => this.flightsService.state().flights.filter(
      (flight) =>
        isTimeLeft(new UTCDate(`${flight.$createdAt}`).toString(), flight.duration)
        && flight.profile.$id === this.authService.state().user?.$id!
    )[0]
  )


  checkInModal: HTMLElement | null = null;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss('confirm');
  }

  constructor() {
    effect(() => { }

    )
  }
}
