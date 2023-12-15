import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import {
  ActionSheetController,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';
import { addIcons } from 'ionicons';
import { airplane, close, locate } from 'ionicons/icons';

@Component({
  standalone: true,
  imports: [
    IonFab,
    IonButton,
    IonIcon,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonItem,
    IonInput,
    IonContent,
    IonList,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonFooter,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-check-in',
  template: `
    <ion-fab slot="fixed" vertical="bottom" horizontal="center">
      <ion-button id="open-modal">
        <ion-icon slot="start" name="airplane"></ion-icon>
        CHECK IN
      </ion-button>
    </ion-fab>
<ion-content>
    <ion-modal
      id="example-modal"
      #modal
      trigger="open-modal"
      [canDismiss]="canDismiss"
      [presentingElement]="checkInModal"
    >
      <ng-template>
        <ion-toolbar>
          <ion-title> Wprowadź dane lotu </ion-title>
        </ion-toolbar>
        <div class="wrapper">
          <ion-list lines="none">
            <ion-item>
              <ion-input label="Promień lotu" placeholder="650" type="number" />
              [m]
            </ion-item>
            <ion-item>
              <ion-input
                label="Maksymalna wysokość lotu"
                placeholder="50"
                type="number"
              />
              [m]
            </ion-item>
            <ion-item>
              <ion-input
                label="Czas trwania lotu"
                type="number"
                placeholder="40"
              />
              [min]
            </ion-item>
            <ion-item>
              <ion-select
                label="Wybierz drona"
                interface="action-sheet"
                [interfaceOptions]="customActionSheetOptions"
                cancelText="Anuluj"
              >
                <ion-select-option value="dji2_mini_pro"
                  >DJI2 Mini Pro</ion-select-option
                >
                <ion-select-option value="agras_t40"
                  >Agras T40</ion-select-option
                >
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-button slot="start"
                ><ion-icon name="locate"></ion-icon
              ></ion-button>
              <ion-input label="Dł. geo." placeholder="22.15"></ion-input>
              <ion-input label="Szer. geo." placeholder="54.12"></ion-input>
            </ion-item>
          </ion-list>
        </div>
        <ion-toolbar style="padding-left: 1rem; padding-right: 1rem">
          <ion-button
            fill="clear"
            slot="start"
            (click)="cancel()"
            color="danger"
          >
            Anuluj
          </ion-button>
          <ion-button
            fill="clear"
            slot="end"
            (click)="cancel()"
            color="primary"
          >
            Zatwierdź
          </ion-button>
        </ion-toolbar>
      </ng-template>
    </ion-modal>
</ion-content>
  `,
  styles: `
  ion-modal#example-modal {
  --width: fit-content;
  --min-width: 250px;
  --height: fit-content;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

ion-modal#example-modal h1 {
  margin: 0;
}
`,
})
export class CheckInComponent implements OnInit {
  private actionSheetCtrl = inject(ActionSheetController);
  @ViewChild(IonModal) modal!: IonModal;

  checkInModal: HTMLElement | null = null;

  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';

  constructor() {
    addIcons({ airplane, close, locate });
  }
  ngOnInit(): void {
    this.checkInModal = document.getElementById('modal');
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss('confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  //* Confirm dismiss

  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Czy na pewno?',
      buttons: [
        {
          text: 'Tak',
          role: 'confirm',
        },
        {
          text: 'Nie',
          role: 'cancel',
        },
      ],
      cssClass: 'action-sheet',
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };

  customActionSheetOptions = {
    header: 'Dostępne drony',
  };
}
