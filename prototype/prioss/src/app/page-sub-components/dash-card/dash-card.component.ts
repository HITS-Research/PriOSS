import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dash-card',
  templateUrl: './dash-card.component.html',
  styleUrls: ['./dash-card.component.less']
})
export class DashCardComponent {

  @Input()
  titleText: string;
  @Input()
  cardLink: string;
  @Input()
  tooltipText: string;
}
