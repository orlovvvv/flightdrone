import { AsyncPipe, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from '@ionic/angular/standalone';
import { Observable, interval, map } from 'rxjs';
import { Flight } from '../types/flight';
import { remainingTime } from '../utils/remaining-time';
@Component({
  selector: 'app-current-flight',
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonAlert,
    DatePipe,
    AsyncPipe,
  ],
  template: `
    <ion-card class="current-flight">
      <ion-card-header>
        <ion-card-title> DJX PRO 1</ion-card-title>
        <ion-card-subtitle>
          Data rozpoczęcia: 2024-01-06 10:23:40</ion-card-subtitle
        >
        <ion-button class="cancel" color="danger" id="present-alert">
          <ion-icon name="close" />
        </ion-button>
      </ion-card-header>
      <ion-card-content style="height: 160px;">
        <!-- | date : 'HH:mm:ss' -->
        <h1 class="time">{{ timer$ | async }}</h1>
      </ion-card-content>
    </ion-card>
    <!-- Cofnirm ending flight -->
    <ion-alert
      trigger="present-alert"
      header="Zakończ lot"
      message="Czy chcesz zakończyc lot?"
      [buttons]="alertButtons"
    ></ion-alert>
  `,
  styles: `
    .current-flight{
        position: fixed;
        left: 50%;
        margin-right: -50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 100%;
        height: 100%;
        max-width: 420px;
        max-height: 160px;
        border-radius: 24px;
    }

    .time {
        position: fixed;
        bottom: 12px;
        left: 50%;
        margin-right: -50%;
        transform: translateX(-50%);
        font-size: 3.5rem;
        font-weight: 300;
    }

    .cancel {
        position: fixed;
        top: 12px;
        right: 12px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentFlightComponent {
  @Input() flight!: Flight;
  @Output() endFlight = new EventEmitter<void>();
  timeLeft = '2024-01-07T23:20:00.000+01:00';
  timer$ = new Observable<string>();
  constructor() {
    this.timer$ = interval(1000).pipe(
      takeUntilDestroyed(),
      //   todo: implement flight variables
      map(() => remainingTime(this.timeLeft, '10'))
    );
  }

  public alertButtons = [
    {
      text: 'Anuluj',
      role: 'cancel',
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.endFlight.emit();
      },
    },
  ];
}
