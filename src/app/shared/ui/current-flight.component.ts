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
  IonSkeletonText,
} from '@ionic/angular/standalone';
import { Observable, interval, map, tap } from 'rxjs';
import { Animations } from 'src/app/shared/animation/animation';
import { EditFlight, Flight } from '../types/flight';
import { remainingTime, timeToMinutes } from '../utils/remaining-time';

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
    IonSkeletonText,
    IonAlert,
    DatePipe,
    AsyncPipe,
  ],
  animations: [Animations],
  template: `
    <ion-card class="current-flight ion-no-padding">
      <ion-card-header @inOut>
        <ion-card-title>{{ flight.drone.model }}</ion-card-title>
        <ion-card-subtitle>
          Data rozpoczęcia:
          {{
            flight.$createdAt | date : 'yyyy-MM-dd HH:mm:ss'
          }}</ion-card-subtitle
        >
        <ion-button class="cancel" color="danger" id="end-flight" size="small">
          <ion-icon name="close" size="small" />
        </ion-button>
      </ion-card-header>
      <ion-card-content style="height: 160px;" @inOut>
        <h1 class="time">{{ timer$ | async }}</h1>
      </ion-card-content>
    </ion-card>
    <!-- Cofnirm ending flight -->
    <ion-alert
      trigger="end-flight"
      header="Zakończ lot"
      message="Czy chcesz zakończyć lot?"
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
        font-size: 3rem;
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
  @Output() endFlight = new EventEmitter<EditFlight>();

  timer$ = new Observable<string>();
  durationUsed = signal<number>(0);

  constructor() {
    this.timer$ = interval(1000).pipe(
      takeUntilDestroyed(),
      map(() => remainingTime(this.flight!.$createdAt, this.flight!.duration)),
      tap((time) =>
        this.durationUsed.update(
          () => this.flight!.duration - timeToMinutes(time)
        )
      )
    );
  }

  protected alertButtons = [
    {
      text: 'Anuluj',
      role: 'cancel',
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.endFlight.emit({
          id: this.flight!.$id,
          data: {
            range: this.flight.range,
            height: this.flight.height,
            drone: this.flight.drone.$id,
            duration: this.durationUsed(),
          },
        });
      },
    },
  ];
}
