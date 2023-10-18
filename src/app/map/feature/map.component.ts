import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation, Position } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;
  currentLocation!: Position;

  ngAfterViewInit() {
    this.printCurrentPosition().finally(() => this.createMap());
  }
  printCurrentPosition = async () => {
    this.currentLocation = await Geolocation.getCurrentPosition();

    console.log('Current position:', this.currentLocation);
  };

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'map',
      element: this.mapRef.nativeElement,
      apiKey: environment.apiKey,
      region: 'pl',
      config: {
        center: {
          lat: this.currentLocation.coords.latitude
            ? this.currentLocation.coords.latitude
            : 52.237049,
          lng: this.currentLocation.coords.longitude
            ? this.currentLocation.coords.longitude
            : 21.017532,
        },
        restriction: {
          latLngBounds: {
            west: 14.075,
            south: 49.155,
            east: 24.155,
            north: 54.852,
          },
          strictBounds: false,
        },
        panControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: false,
        zoom: 6,
        mapId: 'ee2cd9275b9b5193',
      },
    });
  }
}
