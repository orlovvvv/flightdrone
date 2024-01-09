import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Output,
} from '@angular/core';
import {
    IonButton,
    IonButtons,
} from '@ionic/angular/standalone';

@Component({
    standalone: true,
    imports: [IonButton, IonButtons],
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-logout',
    template: ` 
    <ion-button style="width: 100%; padding-inline: 24px" size="small" color="tertiary" (click)="logout.emit()">
    Wyloguj się
    </ion-button>`,
    styles: ``,
})
export class LogoutComponent {
    @Output() logout = new EventEmitter<void>();
}
