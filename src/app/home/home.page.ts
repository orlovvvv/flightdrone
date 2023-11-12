import { Component } from '@angular/core';
import { CheckInComponent } from '../shared/feature/check-in/check-in.component';
import { MapComponent } from '../shared/feature/map/feature/map.component';
import { HeaderComponent } from '../shared/ui/header/header.component';
import { MapSettingsComponent } from '../shared/ui/map-settings/map-settings.component';
import { WidgetsComponent } from '../shared/ui/widgets/widgets.component';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  template: ` <ion-content [fullscreen]="true">
    <app-header />
    <app-map />
    <app-widgets />
    <app-map-settings />
    <app-check-in />
  </ion-content>`,
  styles: [],
  standalone: true,
  imports: [
    IonContent,
    HeaderComponent,
    CheckInComponent,
    MapSettingsComponent,
    WidgetsComponent,
    MapComponent,
  ],
})
export class HomePage {}
