import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonSearchbar } from '@ionic/angular/standalone';

@Component({
  standalone: true,
  imports: [IonSearchbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {}
