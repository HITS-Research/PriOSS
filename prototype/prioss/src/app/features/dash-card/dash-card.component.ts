import { Component, Input } from '@angular/core';

/**
 * This card unifies the styling of cards across dashboards.
 * Its content is set by the html of the parent component, so it is not fixed inside this component but can be dynamically set.
 * Thus this component can be reused for any type of visualization
 * 
 * @author: Simon (scg@mail.upb.de)
 */
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
  fillVerticalSpace = true;
  @Input()
  buttonText = 'Explore';
  @Input()
  buttonIcon = 'double-right';
}
