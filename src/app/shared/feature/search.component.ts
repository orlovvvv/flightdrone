import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonSearchbar } from '@ionic/angular/standalone';

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
  max-width: 384px;
  width: 100%;
  --border-radius: 20px;
}
`,
})
export class SearchComponent {}
