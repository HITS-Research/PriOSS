import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { ChatData } from '../../../chatdata.type';

@Component({
  selector: 'prioss-average-respone-time',
  standalone: true,
  imports: [],
  templateUrl: './average-respone-time.component.html',
  styleUrl: './average-respone-time.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AverageResponeTimeComponent {
  chatData = input.required<ChatData[]>();
  yourUsername = input.required<string>();

}
