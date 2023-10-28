import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SearchComponent } from '../../feature/search/search.component';

@Component({
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, SearchComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {}
