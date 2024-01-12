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
import { ProfileService } from '../data-access/profile.service';
import { JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    IonAccordionGroup,
    IonAccordion,
    IonItem,
    IonLabel,
    ListFlightsComponent,
    JsonPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-flights',
  template: `
    <ion-accordion-group class="ion-no-padding" [multiple]="true">
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
export class UserFlightsComponent {
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
