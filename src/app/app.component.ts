import { Component } from '@angular/core';
import { IonContent, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, airplane, close, eyeOutline, locate, removeOutline } from 'ionicons/icons';
import { Animations } from './shared/animation/animation';

@Component({
  selector: 'app-root',
  template: `
    <ion-router-outlet></ion-router-outlet>
  `,
  standalone: true,
  imports: [IonContent, IonRouterOutlet],
  animations: [Animations]
})
export class AppComponent {
  constructor() {
    addIcons({ airplane, close, locate, addOutline, removeOutline, eyeOutline });
  }
}
