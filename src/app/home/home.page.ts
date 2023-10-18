import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonItem,
  IonAccordion,
  IonAccordionGroup,
  IonButtons,
  IonMenu,
  IonMenuButton,
  IonSearchbar,
  IonFooter,
} from '@ionic/angular/standalone';
import { MapComponent } from '../map/feature/map.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonFooter,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonItem,
    IonAccordion,
    IonAccordionGroup,
    IonButtons,
    IonMenu,
    IonMenuButton,
    IonSearchbar,
    MapComponent,
  ],
})
export class HomePage {
  constructor() {}
}
