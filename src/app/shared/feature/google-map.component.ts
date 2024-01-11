import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { ModalController } from '@ionic/angular/standalone';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MapService } from '../data-access/map.service';
import { FlightDetailsModalComponent } from '../ui/flight-details-modal.component';
import { FlightService } from './../data-access/flight.service';

@Component({
  selector: 'app-google-map',
  standalone: true,
  providers: [FlightDetailsModalComponent],
  imports: [CommonModule, GoogleMapsModule],
  template: `
    @if(apiLoaded | async) {
    <google-map
      height="100vh"
      width="100vw"
      [options]="mapService.mapOptions"
      style="z-index: 1;"
    >
      @if(mapService.state().markers){ @for(marker of
      mapService.state().markers; track marker.coordinate){

      <map-marker
        [position]="marker.coordinate"
        [options]="mapService.markerOptions"
        [clickable]="true"
        (mapClick)="openItemDetailsModal(marker)"
      />

      } }
    </google-map>
    }
  `,
})
export class GoogleMapsComponent {
  protected mapService = inject(MapService);
  private http = inject(HttpClient);
  private modalController = inject(ModalController);
  private flightService = inject(FlightService);
  apiLoaded: Observable<boolean>;

  constructor() {
    this.apiLoaded = this.http
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=${environment.apiKey}`,
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  async openItemDetailsModal(marker: google.maps.MarkerOptions): Promise<void> {
    const flight = this.flightService.state
      .flights()
      .filter((flight) => flight.drone.model === marker.title)[0];

    const modal = await this.modalController.create({
      component: FlightDetailsModalComponent, // replace with the actual component
      componentProps: {
        flight,
      },
      presentingElement: await this.modalController.getTop(),
      breakpoints: [0, 0.25, 0.5, 0.75, 1],
      initialBreakpoint: 0.25,
    });

    await modal.present();
  }
}
