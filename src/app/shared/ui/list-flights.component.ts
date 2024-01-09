import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import {
  IonItem,
  IonLabel,
  IonList,
  IonNote,
} from '@ionic/angular/standalone';
import { DatePipe } from '@angular/common';
import { Flights } from 'src/app/shared/types/flight';

@Component({
  standalone: true,
  imports: [
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    DatePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-list-flights',
  template: `
    <ion-list lines="none" >
            @if (flights.length <= 0) {
            <ion-item style="width: 100%;" color="none" style="font-size: small;">
              <ion-label
                class="ion-margin-horizontal"            
              >
                Brak danych do wyświetlenia
              </ion-label>
            </ion-item>
            } @for (flight of flights; track flight.$id) {
            <ion-item style="width: 100%;" [detail]="true" [button]="true" style="font-size: small;">
              <ion-label
                class="ion-margin-horizontal"
                
              >
                {{ 'Pilot: ' }}
                {{ flight.profile.pilotNumber }}
                 </ion-label>
                <ion-label
                class="ion-margin-horizontal"
              >
                {{ ' Dron:' }}
                {{ flight.drone.serial }}
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
  `,
  styles: `




  ion-list {
    overflow-y: auto;
    height: 100%;
    background: none!important;
    margin: 12px
  }

  ion-item {
    margin-top: 6px;
    border-radius: 12px;
  }
`,
})
export class ListFlightsComponent {
  @Input() flights: Flights = []
}


