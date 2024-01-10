import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { SearchComponent } from '../feature/search.component';

@Component({
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    SearchComponent,
    IonButton,
    IonButtons,
    IonMenuButton,
    NgOptimizedImage,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  template: `
    <ion-toolbar
      class="menubar"
      role="menubar"
      color="none"
      style="position: absolute; top: 0;"
    >
      <img
        class="logo"
        slot="start"
        ngSrc="/../../../assets/png/FlightDrone_logo.png"
        width="auto"
        height="42"
        priority
        alt="FlightDrone"
      />

      <app-search slot="end" />
      <ion-buttons slot="end">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
    </ion-toolbar>
  `,
  styles: `
  .logo{
    margin: 7px; 
    border-radius: 12px; 
  }
  `,
})
export class HeaderComponent {}
