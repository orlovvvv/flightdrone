import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MapService } from '../data-access/map.service';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  template: `
    @if(apiLoaded | async) {
    <google-map
      height="100vh"
      width="100vw"
      [options]="mapService.options"
      style="z-index: 1;"
    >
      @for(marker of mapService.state().markers; track marker.coordinate){

      <map-marker
        [position]="marker.coordinate"
        [options]="{ draggable: false }"
      />

      }
    </google-map>
    }
  `,
})
export class GoogleMapsComponent {
  protected mapService = inject(MapService);
  private http = inject(HttpClient);
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
}
