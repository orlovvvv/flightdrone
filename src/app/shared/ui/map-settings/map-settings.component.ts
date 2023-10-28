import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, removeOutline, eyeOutline } from 'ionicons/icons';

@Component({
  standalone: true,
  imports: [IonFab, IonFabButton, IonIcon, IonFabList],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-map-settings',
  templateUrl: './map-settings.component.html',
  styleUrls: ['./map-settings.component.scss'],
})
export class MapSettingsComponent implements OnInit {
  constructor() {
    addIcons({ addOutline, removeOutline, eyeOutline });
  }

  ngOnInit() {}
}
