import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import type { AdPreferencesModel } from 'src/app/facebook/models';

/**
 * Component for displaying an overview of ad preferences
 */
@Component({
  selector: 'prioss-ads-preferences-overview',
  standalone: true,
  imports: [NzTableComponent],
  templateUrl: './ads-preferences-overview.component.html',
  styleUrl: './ads-preferences-overview.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdsPreferencesOverviewComponent {
  /**
   * Required input for ad preferences data
   */
  adPreferences = input.required<AdPreferencesModel>();

  /**
   * Computed value for ad preferences data
   * @returns An array of label values from ad preferences, or an empty array if not available
   */
  adPreferencesData = computed(() => {
    return this.adPreferences().label_values ?? [];
  });
}