import { Component, inject } from '@angular/core'
import { ChildrenOutletContexts } from '@angular/router'
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import { addOutline, airplane, close, eyeOutline, locate, removeOutline } from 'ionicons/icons'
import { Animations } from './shared/animation/animation'
import { GoogleMapsComponent } from 'src/app/shared/feature/google-map.component'

@Component({
  selector: 'app-root',
  template: `
  <ion-app [@pageTransition]="getRouteAnimationData()">
    <ion-router-outlet [animated]="false"></ion-router-outlet>
    <app-google-map />
  </ion-app>
  `,
  standalone: true,
  imports: [IonApp, IonRouterOutlet, GoogleMapsComponent],
  animations: [Animations]
})
export class AppComponent {
  private context = inject(ChildrenOutletContexts);

  constructor() {
    addIcons({ airplane, close, locate, addOutline, removeOutline, eyeOutline })
  }

  getRouteAnimationData() {
    return this.context.getContext('primary')?.route?.snapshot.title
  }


}
