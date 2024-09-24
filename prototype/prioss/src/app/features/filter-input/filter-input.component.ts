import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'prioss-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrl: './filter-input.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
  ],
})
export class FilterInputComponent {

  /**
   * The subject with the current filter value.
   */
  filter = model<string>('');

}
