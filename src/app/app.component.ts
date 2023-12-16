import { Component } from '@angular/core';
import { IonContent, IonRouterOutlet } from '@ionic/angular/standalone';
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
}
