import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Input,
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
    IonSearchbar,
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
import { UserSettingsFormComponent } from 'src/app/shared/ui/user-settings-form.component';
import { Profile } from 'src/app/shared/types/profile';
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
        UserSettingsFormComponent
    ],
    selector: 'app-user-settings',
    animations: [Animations],
    template: `
  @if (profileService.state().profile) {
 <ion-item [button]="true" [detail]="true" id="open-settings" @inOut>
          <ion-label>Ustawienia konta</ion-label>
 </ion-item>

      <ion-modal
        id="user-settings-modal"
        #modal
        trigger="open-settings"
        [showBackdrop]="false"
      >
        <ng-template class="modal-container">
          <div class="header">
                <div style="width: 100%;">
                <ion-title class="ion-margin-horizontal">
                    Ustawienia konta
                </ion-title>
                <ion-note class="ion-margin-horizontal">
                  Zarządzaj kontem użytkownika
                </ion-note>
                </div>

                <ion-button
                  class="cancel"
                  color="danger"
                  (click)="close()"
                  slot="end"
                  size="small"
                >
                  <ion-icon name="close" size="small"/>
                </ion-button>
          </div>
        <div class="content">
            <app-user-settings-form [userProfile]="profileService.state().profile" (dismiss)="close()" (profile)="profileService.state.edit($event)" />
        </div>
        </ng-template>
      </ion-modal>
}

  `,
    styles: `

  ion-modal#user-settings-modal {
    --height: fit-content;
    --max-width: 560px;
    --width: 100%;
    --border-radius: 12px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
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
export class UserSettingsComponent {
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
