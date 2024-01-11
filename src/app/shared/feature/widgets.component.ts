import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { FlightService } from '../data-access/flight.service';
import { ListFlightsComponent } from '../ui/list-flights.component';
import { isTimeLeft } from '../utils/remaining-time';
import { ProfileService } from './../data-access/profile.service';

@Component({
  standalone: true,
  imports: [
    IonAccordionGroup,
    IonAccordion,
    IonItem,
    IonLabel,
    ListFlightsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-widgets',
  template: `
    <ion-accordion-group class="ion-no-padding" [multiple]="true">
      <ion-accordion role="banner" value="first">
        <ion-item slot="header" color="light">
          <ion-label>Pogoda</ion-label>
        </ion-item>
        <div class="ion-no-padding ion-no-margin" slot="content">
          Aktualna pozycja
        </div>
      </ion-accordion>
      <ion-accordion value="second">
        <ion-item slot="header" color="light">
          <ion-label>Twoje check-in</ion-label>
        </ion-item>
        <div class="ion-no-padding" slot="content">
          <app-list-flights
            [flights]="userFlights()"
            [loaded]="flightService.state().loaded"
          />
        </div>
      </ion-accordion>
    </ion-accordion-group>
  `,
  styles: '',
})
export class WidgetsComponent {
  protected flightService = inject(FlightService);
  protected profileService = inject(ProfileService);

  userFlights = computed(() =>
    this.flightService
      .state()
      .flights.filter(
        (flight) =>
          flight.profile.$id === this.profileService.state().profile?.$id
      )
  );
  flightHistory = computed(() =>
    this.flightService
      .state()
      .flights.filter(
        (flight) => !isTimeLeft(flight.$createdAt, flight.duration)
      )
  );
}
