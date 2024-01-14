import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  inject,
} from '@angular/core';
import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonNote,
  IonTitle,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { ProfileService } from 'src/app/shared/data-access/profile.service';
import { UserSettingsFormComponent } from 'src/app/shared/ui/user-settings-form.component';
import { Animations } from '../animation/animation';
import { CheckInFormComponent } from '../ui/check-in-form.component';
import { CurrentFlightComponent } from '../ui/current-flight.component';
import { DroneFormComponent } from '../ui/drone-form.component';
import { GeolocationButtonComponent } from '../ui/geolocation-button.component';
import { DroneService } from './../data-access/drone.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonButton,
    IonIcon,
    IonModal,
    IonTitle,
    IonNote,
    IonItem,
    IonLabel,
    CheckInFormComponent,
    GeolocationButtonComponent,
    CurrentFlightComponent,
    UserSettingsFormComponent,
    DroneFormComponent,
  ],
  selector: 'app-user-drones',
  animations: [Animations],
  template: `
    <ion-item [button]="true" id="open-user-drones">
      <ion-icon name="add-circle-outline" slot="end"></ion-icon>
      <ion-label>Dodawanie drona</ion-label>
    </ion-item>

    <ion-modal
      id="user-drones-modal"
      #modal
      trigger="open-user-drones"
      [showBackdrop]="false"
    >
      <ng-template class="modal-container">
        <div class="header">
          <div style="width: 100%;">
            <ion-title class="ion-margin-horizontal"> Dodaj drona </ion-title>
            <ion-note class="ion-margin-horizontal">
              Dodaj nowe urządzenie do swojego profilu
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
          <app-drone-form
            (drone)="droneService.state.add($event)"
            (dismiss)="close()"
          />
        </div>
      </ng-template>
    </ion-modal>
  `,
  styles: `

  ion-modal#user-drones-modal {
    --height: fit-content;
    --max-width: 560px;
    --width: 100%;
    --border-radius: 12px;
    --box-shadow: 0 4px 16px rgb(27, 27, 27);
    }

    .modal-container {
      width: 100%;
      max-width: 560px;
      height: fit-content;
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
export class UserDronesComponent {
  // dependencies

  protected droneService = inject(DroneService);
  protected authService = inject(AuthService);
  protected profileService = inject(ProfileService);

  @ViewChild(IonModal) modal!: IonModal;
  userSettingsModal: HTMLElement | null = null;

  close() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss('confirm');
  }
}
