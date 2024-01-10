import { inject, effect } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { Component } from '@angular/core';
import { MapService } from 'src/app/shared/data-access/map.service';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [GoogleMapsModule],
  template: `
  @if (mapService.state().loaded) {
  <google-map height="100vh" width="100vw"
            [options]="mapService.options" >
      @for(marker of mapService.state().markers; track marker.coordinate){

              <map-marker [position]="marker.coordinate" [options]="{draggable: false}" />

      }
  </google-map>
}
   
  `
})
export class GoogleMapsComponent {
  protected mapService = inject(MapService)

  constructor() {
    effect(
      () => console.log(this.mapService.state().loaded)
    )
  }

}