import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  IonButton,
  IonIcon,
  IonModal,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { FlightService } from 'src/app/shared/data-access/flight.service';
import { ListFlightsComponent } from 'src/app/shared/ui/list-flights.component';

@Component({
  standalone: true,
  imports: [IonSearchbar, IonModal, IonButton, IonIcon, ListFlightsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-search',
  template: `
    <ion-searchbar
      id="open-search-modal"
      class="searchbox"
      role="searchbox"
      placeholder="Szukaj"
    />

    <ion-modal
      id="search-modal"
      #modal
      trigger="open-search-modal"
      (didPresent)="onDidPresent()"
    >
      <ng-template class="modal-container">
        <div class="header">
          <ion-searchbar
            color="light"
            class="searchbox ion-no-padding"
            role="searchbox"
            placeholder="Szukaj"
            cancelButtonIcon="true"
            [autocomplete]="true"
            [autocorrect]="true"
            [debounce]="350"
            #search
          />
          <ion-button
            class="cancel"
            color="danger"
            (click)="close()"
            slot="end"
            size="small"
          >
            <ion-icon name="close" size="small" />
          </ion-button>
        </div>
        <div class="content">
          <app-list-flights
            [flights]="flightService.activeFlights()"
            [loaded]="flightService.state().loaded"
          />
        </div>
      </ng-template>
    </ion-modal>
  `,
  styles: `
   .searchbox#open-search-modal {
      max-width:200px;
      width: 100%;
      --border-radius: 12px;
      text-align: left;
  }
    
  .searchbox {
    width: 100%;
    --border-radius: 12px;
  }
  ion-modal#search-modal {
    --height: 450px; 
    --max-width: 560px;
     --width: 100%;
    --border-radius: 12px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
  }

  .modal-container {
    width: 100%;
    max-width: 560px;
    height: 450px;
  }
  
  .header {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 6px;
    padding: 6px;
  }

  .content {
    height: 100%;
  }

  ion-list {
    overflow-y: auto;
    height: 100%;
  }
`,
})
export class SearchComponent {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('search') search!: IonSearchbar;
  protected flightService = inject(FlightService);

  value = signal<string>('');
  onDidPresent() {
    return this.search.setFocus();
  }

  close() {
    this.modal.dismiss(null, 'cancel');
  }
}
