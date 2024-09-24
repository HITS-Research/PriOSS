import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Input, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { FilterInputComponent } from '../../../features/filter-input/filter-input.component';
import { SpotifySearchHistoryState } from '../../features/search-history/search-history.state';

/**
  * This component visualizes the search history of a user
  * The Preview lists some information about the amount of search queries.
  * The actual visualisation than displayes search query datra in a table format
  */
@Component({
  selector: 'prioss-spotify-search-history',
  templateUrl: './spotify-search-history.component.html',
  styleUrls: ['./spotify-search-history.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DatePipe,
    FilterInputComponent,
    NzCardModule,
    NzEmptyModule,
    NzGridModule,
    NzStatisticModule,
    NzTableModule,
    TitleBarComponent,
  ]
})
export class SpotifySearchHistoryComponent {

  /**
   * The mode of this view. Removes some elements when true.
   */
  @Input()
  previewMode = false;

  /**
   * The subject with the current filter value.
   */
  filter = signal<string>('');

  /**
   * The current search-history data.
   */
  searchHistory = inject(Store).selectSignal(SpotifySearchHistoryState.state);

  /**
   * The current search-history data, filtered by the user.
   */
  filteredSearchHistory = computed(() => {
    const filter = this.filter().toLowerCase();
    const searchHistory = this.searchHistory();
    return filter.length > 0
      ? searchHistory.filter(h => h.searchQuery.toLowerCase().includes(filter))
      : searchHistory;
  });

  /**
   * The latest search-query.
   */
  latestSearchQuery = computed(() => this.searchHistory().at(0)?.searchQuery ?? '');

}
