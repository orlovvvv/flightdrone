import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  standalone: true,
  imports: [IonAccordionGroup, IonAccordion, IonItem, IonLabel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-widgets',
  template: `
    <ion-accordion-group
      expand="inset"
      style="
    position: absolute;
    top: calc(12px + 56px);
    left: 12px;
    right: 12px;
    max-width: 16rem;
    z-index: 1;
  "
    >
      <ion-accordion role="banner" value="first">
        <ion-item slot="header" color="light">
          <ion-label>Pogoda</ion-label>
        </ion-item>
        <div class="ion-padding" slot="content">Aktualna pozycja</div>
      </ion-accordion>
      <ion-accordion value="second">
        <ion-item slot="header" color="light">
          <ion-label>Dane lotu</ion-label>
        </ion-item>
        <div class="ion-padding" slot="content">Zgłoszone dane lotu</div>
      </ion-accordion>
      <ion-accordion value="third">
        <ion-item slot="header" color="light">
          <ion-label>Historia</ion-label>
        </ion-item>
        <div class="ion-padding" slot="content">Archiwalne Check-in</div>
      </ion-accordion>
    </ion-accordion-group>
  `,
  styles: '',
})
export class WidgetsComponent {
  constructor() {}
}
