import { FlightService } from 'src/app/shared/data-access/flight.service';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import {
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { DatePipe } from '@angular/common';
import { isTimeLeft } from 'src/app/shared/utils/remaining-time';

@Component({
  standalone: true,
  imports: [
    IonSearchbar,
    IonModal,
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    DatePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-search',
  template: `
    <ion-searchbar
      id="open-search-dialog"
      class="searchbox"
      role="searchbox"
      placeholder="Szukaj"
    />

    <ion-modal id="example-modal" #modal trigger="open-search-dialog">
      <ng-template class="modal-container">
        <div class="wrapper">
          <ion-searchbar
            color="light"
            class="searchbox ion-no-padding"
            role="searchbox"
            placeholder="Szukaj"
            cancelButtonIcon="true"
            [autocomplete]="true"
            [autocorrect]="true"
            [debounce]="350"
          />

          <ion-list> @if (activeFlights().length <= 0) {
            <ion-item style="width: 100%;">
              <ion-label
                class="ion-margin-horizontal"
                style="font-size: small;"
              >
                Brak danych do wyświetlenia
              </ion-label>
            </ion-item>
            } @for (flight of activeFlights(); track flight.$id) {
            <ion-item style="width: 100%;" detail="true">
              <ion-label
                class="ion-margin-horizontal"
                style="font-size: small;"
              >
                {{ 'Pilot: ' }}
                {{ flight.profile.pilotNumber }}
                {{ ' Dron:' }}
                {{ flight.drone.serial }}
                {{ ' Czas trwania: ' }}
                {{ flight.duration }}
                 {{ ' minut' }}
              </ion-label>
              <ion-note
                slot="end"
                color="medium"
                class="ion-margin-horizontal"
                >{{ flight.$createdAt | date : 'yyyy-MM-dd' }}</ion-note
              >
            </ion-item>
            }
          </ion-list>
        </div>
      </ng-template>
    </ion-modal>
  `,
  styles: `

   .searchbox#open-search-dialog {
  max-width: 180px;
  width: 100%;
  --border-radius: 12px;
}
  .searchbox#modal {
  max-width: 420px;
  width: 100%;
  --border-radius: 12px;
}
ion-modal#example-modal {
  --border-radius: 12px;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

.modal-container {
  width: 100%;
  max-width: 420px;
  height: 450px;
}

ion-modal#example-modal h1 {
  margin: 20px 20px 10px 20px;
}

.wrapper {
  height: 100%;
  margin-bottom: 10px;
}

ion-list {
  overflow-y: auto;
  height: 100%;
}
`,
})
export class SearchComponent {
  protected flightService = inject(FlightService);

  activeFlights = computed(() => {
    console.log(this.flightService
      .state()
      .flights.filter((flight) =>
        isTimeLeft(flight.$createdAt, flight.duration)
      ))
    return this.flightService
      .state()
      .flights.filter((flight) =>
        isTimeLeft(flight.$createdAt, flight.duration)
      )
  }
  );
}
