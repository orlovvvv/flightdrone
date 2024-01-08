import { AsyncPipe, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
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
  IonSpinner,
} from '@ionic/angular/standalone';
import { Observable, Subject, interval, map, tap } from 'rxjs';
import { EditFlight, Flight } from '../types/flight';
import { remainingTime, timeToMinutes } from '../utils/remaining-time';
import { Animations } from 'src/app/shared/animation/animation';
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
    IonSpinner,
    IonAlert,
    DatePipe,
    AsyncPipe,
  ],
  animations: [Animations],
  template: `
    <ion-card class="current-flight">
     
        <ion-card-header @inOut>
        <ion-card-title >{{  flight.drone.model }}</ion-card-title>
        <ion-card-subtitle>
          Data rozpoczęcia: {{flight.$createdAt | date:"yyyy-MM-dd HH:mm:ss"}}</ion-card-subtitle
        >
        <ion-button class="cancel" color="danger" id="present-alert">
          <ion-icon name="close" />
        </ion-button>
      </ion-card-header>
      <ion-card-content style="height: 160px;" @inOut>
        <!-- | date : 'HH:mm:ss' -->
        <h1 class="time">{{ timer$ | async}}</h1>

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

    .spinner {
      position: fixed;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translateX(-50%, -50%);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentFlightComponent {
  @Input() flight!: Flight;
  @Output() endFlight = new EventEmitter<EditFlight>();

  timer$ = new Observable<string>();
  durationUsed = signal<number>(0)

  constructor() {
    this.timer$ =
      interval(1000).pipe(
        takeUntilDestroyed(),
        map(() =>
          remainingTime(this.flight.$createdAt, this.flight.duration)
        ),
        tap(
          (time) =>
            this.durationUsed.update(() => parseInt(this.flight.duration) - timeToMinutes(time))

        )
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
        this.endFlight.emit({
          id: this.flight.$id,
          data: {
            latitude: this.flight.latitude,
            longitude: this.flight.longitude,
            range: this.flight.range,
            height: this.flight.height,
            profile: this.flight.profile,
            drone: this.flight.drone,
            duration: this.durationUsed().toString()
          }
        })

      },
    },
  ];
}
