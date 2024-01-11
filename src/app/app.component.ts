import { Component, inject } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  airplane,
  close,
  eyeOutline,
  locate,
  removeOutline,
} from 'ionicons/icons';
import { environment } from 'src/environments/environment';
import { Animations } from './shared/animation/animation';

@Component({
  selector: 'app-root',
  template: `
    <ion-app [@pageTransition]="getRouteAnimationData()">
      <ion-router-outlet [animated]="false"></ion-router-outlet>
    </ion-app>
  `,
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  animations: [Animations],
})
export class AppComponent {
  private context = inject(ChildrenOutletContexts);

  constructor() {
    addIcons({
      airplane,
      close,
      locate,
      addOutline,
      removeOutline,
      eyeOutline,
    });
    console.log(environment.endpoint);
  }

  getRouteAnimationData() {
    return this.context.getContext('primary')?.route?.snapshot.title;
  }
}
