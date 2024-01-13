import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  computed,
  effect,
  inject,
} from '@angular/core';
import { UTCDate } from '@date-fns/utc';
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
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { FlightService } from 'src/app/shared/data-access/flight.service';
import { ProfileService } from 'src/app/shared/data-access/profile.service';
import { isTimeLeft } from 'src/app/shared/utils/remaining-time';
import { Animations } from '../animation/animation';
import { GeolocationService } from '../data-access/geolocation.service';
import { CheckInFormComponent } from '../ui/check-in-form.component';
import { CurrentFlightComponent } from '../ui/current-flight.component';
import { GeolocationButtonComponent } from '../ui/geolocation-button.component';
import { DroneService } from './../data-access/drone.service';
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
  template: `
    @if(!flight()){
    <ion-fab slot="fixed" vertical="bottom" horizontal="center" @inOut>
      <ion-button id="open-modal">
        <ion-icon slot="start" name="airplane"></ion-icon>
        CHECK IN
      </ion-button>
    </ion-fab>

    <ion-modal
      id="check-in-modal"
      #modal
      trigger="open-modal"
      [showBackdrop]="false"
    >
      <ng-template class="modal-container">
        <div class="header">
          <div style="width: 100%;">
            <ion-title class="ion-margin-horizontal">Check in</ion-title>
            <ion-note class="ion-margin-horizontal">
              Wprowadź dane lotu
            </ion-note>
          </div>

          <ion-button
            class="cancel"
            color="danger"
            (click)="close()"
            slot="end"
            size="small"
          >
            <ion-icon name="close" size="small" />
          </ion-button>
        </div>

        <div class="content">
          <app-check-in-form
            [userDrones]="drones()"
            (flight)="flightService.state.add($event)"
            (dismiss)="close()"
          />
        </div>
      </ng-template>
    </ion-modal>

    } @else {
    <!-- Current flight UI -->
    <app-current-flight
      [flight]="flight()"
      (endFlight)="flightService.state.edit($event)"
      @inOut
    />
    }
  `,
  styles: `

  ion-modal#check-in-modal {
    --height: fit-content;
    --max-width: 560px;
    --width: 100%;
    --border-radius: 12px;
    --box-shadow: 0 4px 16px rgb(27, 27, 27);
    }

    .modal-container {
      width: 100%;
      max-width: 560px;
      height: 450px;
    }

    ion-input {
        --padding-start: 12px;
    }

    ion-title {
      padding: 0;
    }
    ion-toolbar {
      padding: 0 12px;
    }

    .header {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 6px;
    padding: 6px;
  }

  .content {
    height: 100%;
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
  protected flightService = inject(FlightService);
  protected profileService = inject(ProfileService);

  flight = computed(() => {
    return this.flightService
      .state()
      .flights.filter(
        (flight) =>
          isTimeLeft(
            new UTCDate(`${flight.$createdAt}`).toString(),
            flight.duration
          ) && flight.profile.$id === this.profileService.state().profile?.$id
      )[0];
  });

  drones = computed(() => this.droneService.state().drones);

  checkInModal: HTMLElement | null = null;

  close() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss('confirm');
  }

  constructor() {
    effect(() => {});
  }
}
