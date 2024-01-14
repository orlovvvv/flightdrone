import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import {
  IonAccordion,
  IonAccordionGroup,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/angular/standalone';
import { GeolocationService } from 'src/app/shared/data-access/geolocation.service';
import { WeatherService } from 'src/app/shared/data-access/weather.service';
import { ListFlightsComponent } from 'src/app/shared/ui/list-flights.component';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    IonIcon,
    IonAccordionGroup,
    IonAccordion,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    ListFlightsComponent,
    JsonPipe,
  ],
  template: ` @if(weather()){
    <ion-list>
      <ion-list-header> Pogoda w twojej lokalizacji </ion-list-header>
      <ion-item>
        <ion-label> Temperatura: {{ weather()?.temp }} ℃ </ion-label>
      </ion-item>
      <ion-item>
        <ion-label> Prędkość wiatru: {{ weather()?.windspeed }} m/s </ion-label>
      </ion-item>
      <ion-item>
        <ion-label>
          Prawdopodobieństwo opadów: {{ weather()?.precipprob }} %
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-label> Warunki: {{ weather()?.conditions }} </ion-label>
      </ion-item>
    </ion-list>
    } @else {
    <ion-item
      [button]="true"
      (click)="weatherService.state.get(geolocationService.state.position()!)"
    >
      <ion-icon
        aria-hidden="true"
        name="cloud-download-outline"
        slot="end"
      ></ion-icon>
      <ion-label> Pobierz pogodę </ion-label>
    </ion-item>
    }`,
  styles: `
    ion-list-header{
      font-size: large;
      font-weight: 700;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent {
  protected weatherService = inject(WeatherService);
  protected geolocationService = inject(GeolocationService);

  weather = computed(
    () => this.weatherService.state.weather()?.currentConditions
  );
}
