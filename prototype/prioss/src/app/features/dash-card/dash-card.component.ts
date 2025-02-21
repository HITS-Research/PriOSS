import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';

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
  styleUrls: ['./dash-card.component.less'],
  standalone: true,
  imports: [NgClass, NgIf, NzButtonModule, NzCardModule, NzIconModule, RouterModule],
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
  @Input()
  height = 'auto';
  @Input()
  width = 'auto';
}
