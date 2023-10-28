import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  standalone: true,
  imports: [IonAccordionGroup, IonAccordion, IonItem, IonLabel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
})
export class WidgetsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
