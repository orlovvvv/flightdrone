import { Component, OnInit } from '@angular/core';
import { CheckInComponent } from '../shared/feature/check-in/check-in.component';
import { MapComponent } from '../shared/feature/map/feature/map.component';
import { HeaderComponent } from '../shared/ui/header/header.component';
import { MapSettingsComponent } from '../shared/ui/map-settings/map-settings.component';
import { WidgetsComponent } from '../shared/ui/widgets/widgets.component';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
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
export class HomePage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
