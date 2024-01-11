import { AfterViewInit, inject } from '@angular/core';
// item-details-modal.component.ts
import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { Flight } from '../types/flight';

@Component({
  selector: 'app-flight-details-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonContent,
    IonIcon,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    DatePipe,
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title
          >Lot: <b>{{ flight.$id }}</b></ion-title
        >
        <ion-button
          class="cancel"
          color="danger"
          (click)="close()"
          slot="end"
          size="small"
          style="margin-right: 6px;"
        >
          <ion-icon name="close" size="small" />
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list-header style="margin-top: 3px;">
          <ion-label> Szczegóły lotu </ion-label>
        </ion-list-header>
        <ion-item>
          <ion-label>
            Data rozpoczęcia
            <b>{{ flight.$createdAt | date : 'yyyy-MM-dd HH:mm:ss' }}</b>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            Czas trwania lotu (w minutach)
            <b>{{ flight.duration }}</b>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            Maksymalna deklarowana wysokość lotu
            <b>{{ flight.height }}</b>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            Maksymalny deklarowany zasięg lotu
            <b>{{ flight.range }}</b>
          </ion-label>
        </ion-item>
        <ion-list-header>
          <ion-label>Współrzędne geograficzne</ion-label>
        </ion-list-header>
        <ion-item>
          <ion-label>
            Szerokość <b>{{ flight.latitude }} </b></ion-label
          >
        </ion-item>
        <ion-item>
          <ion-label>
            Długość <b>{{ flight.longitude }} </b></ion-label
          >
        </ion-item>

        <ion-list-header>
          <ion-label> Operator </ion-label>
        </ion-list-header>
        <ion-item>
          <ion-label>
            Numer pilota <b>{{ flight.profile.pilotNumber }} </b></ion-label
          >
        </ion-item>
        <ion-item>
          <ion-label>
            Numer operatora <b>{{ flight.profile.operatorNumber }}</b>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            Licencja A1
            <b>{{ flight.profile.licenseA1 ? 'Aktywna' : 'Nieaktywna' }}</b>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            Licencja A2
            <b>{{ flight.profile.licenseA2 ? 'Aktywna' : 'Nieaktywna' }}</b>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            Licencja A3
            <b>{{ flight.profile.licenseA3 ? 'Aktywna' : 'Nieaktywna' }}</b>
          </ion-label>
        </ion-item>

        <ion-list-header>
          <ion-label>
            Dron <b>{{ flight.drone.model }} </b></ion-label
          >
        </ion-list-header>
        <ion-item>
          <ion-label
            >Numer seryjny <b>{{ flight.drone.serial }} </b></ion-label
          >
        </ion-item>
        <ion-item>
          <ion-label
            >Producent <b>{{ flight.drone.manufacturer }} </b></ion-label
          >
        </ion-item>
      </ion-list>

      <!-- Add more details as needed -->
    </ion-content>
  `,

  styles: `

    ion-list {
    background: none!important;
    margin: 12px
  }
  ion-list-header{
    margin-top: 12px;
    font-size: large;
    font-weight: 700;
  }

  ion-item {
    margin-top: 6px;
    border-radius: 12px;
    margin-inline: auto;
  }
  
  `,
})
export class FlightDetailsModalComponent implements AfterViewInit {
  @Input() flight!: Flight;

  private modalController = inject(ModalController);

  ngAfterViewInit(): void {
    return;
  }

  close(): void {
    this.modalController.dismiss();
  }
}
