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
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,
  IonList,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonFooter,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { airplane, close, locate } from 'ionicons/icons';
import { OverlayEventDetail } from '@ionic/core/components';

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
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
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
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };

  customActionSheetOptions = {
    header: 'Dostępne drony',
  };
}
