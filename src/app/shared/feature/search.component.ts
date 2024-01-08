import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonSearchbar } from '@ionic/angular/standalone';
import { DroneService } from '../data-access/drone.service';

@Component({
  standalone: true,
  imports: [IonSearchbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-search',
  template: `
    <ion-searchbar
      color="light"
      class="searchbox"
      role="searchbox"
      placeholder="Wyszukaj..."
      cancelButtonIcon="true"
    />
  `,
  styles: `
  .searchbox {
  text-align: start;
  max-width: 260px;
  width: 100%;
  --border-radius: 20px;
}
`,
})
export class SearchComponent {
  protected droneService = inject(DroneService);
}
