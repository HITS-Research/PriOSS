import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import type { AdPreferencesModel } from 'src/app/facebook/models';

@Component({
  selector: 'prioss-ads-preferences-overview',
  standalone: true,
  imports: [NzTableComponent],
  templateUrl: './ads-preferences-overview.component.html',
  styleUrl: './ads-preferences-overview.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdsPreferencesOverviewComponent {
  adPreferences = input.required<AdPreferencesModel>();

  adPreferencesData = computed(() => {
    return this.adPreferences().label_values??[];
  });
  

}
