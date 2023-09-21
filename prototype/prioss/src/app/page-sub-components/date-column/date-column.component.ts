import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-date-column',
  templateUrl: './date-column.component.html',
  styleUrls: ['./date-column.component.less']
})
export class DateColumnComponent {
  @Input()
  timestamp: string;

  formatString = 'd MMM y, h:mm a';
}
