import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { IonToast } from '@ionic/angular/standalone'

@Component({
  selector: 'app-toast-error',
  standalone: true,
  imports: [IonToast],
  template: `
    <ion-toast
    class="error-toast"
      [isOpen]="error === 'error'"
      [message]="message"
      [duration]="10000"
    >
    </ion-toast>
  `,
  styles: `
      ion-toast.error-toast {
      --background: var(--ion-color-danger);
      --box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
      --color:  var(--ion-color-danger-contrast);
    }

    ion-toast.error-toast::part(message) {
      font-style: italic;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastErrorComponent {
  @Input({ required: true }) error: string | null = null;
  @Input() message: string = 'Coś poszło nie tak'
}
