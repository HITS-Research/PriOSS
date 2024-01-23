import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from '@ngxs/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTableModule } from 'ng-zorro-antd/table';
import { EMPTY, Observable, Subject, combineLatest, map, startWith, switchMap } from 'rxjs';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { SpotifySearchHistoryState } from '../../features/search-history/search-history.state';
import { SpotifySearchHistoryStateModel } from '../../features/search-history/search-history.statemodel';

/**
 * The scheme of the view model.
 */
type ViewModel = {

  /**
   * The state of the availability of data.
   */
  dataAvailable: boolean;

  /**
   * The count of the data.
   */
  dataCount: number;

  /**
   * The filtered elements.
   */
  filteredSearchHistory: SpotifySearchHistoryStateModel[];

  /**
   * The latest serch query.
   */
  latestSearchQuery: string;

};

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
    AsyncPipe,
    DatePipe,
    FormsModule,
    NgClass,
    NgFor,
    NgIf,
    NzInputModule,
    NzButtonModule,
    NzDropDownModule,
    NzEmptyModule,
    NzGridModule,
    NzIconModule,
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
   * The current search-history data.
   */
  @Select(SpotifySearchHistoryState)
  searchHistory$?: Observable<SpotifySearchHistoryStateModel[]>;

  /**
   * The subject with the current filter value.
   */
  filter$ = new Subject<string>();

  /**
   * The filtered search-history data, filtered by filter$.
   */
  #filteredSearchHistory$ = this.searchHistory$
    ?.pipe(
      switchMap(searchHistory => this.filter$
        .pipe(
          startWith(''),
          map(
            f => f.length > 0
              ? searchHistory.filter(h => h.searchQuery.includes(f))
              : searchHistory
          )
        )
      )
    );

  /**
   * The latest search-query.
   */
  #latestSearchQuery$ = this.searchHistory$
    ?.pipe(
      map(searchHistory => searchHistory.at(0)?.searchQuery ?? '')
    );

  /**
   * The view model which will be subscribed by the view.
   */
  vm$: Observable<ViewModel> = combineLatest([
    this.searchHistory$ ?? EMPTY,
    this.#filteredSearchHistory$ ?? EMPTY,
    this.#latestSearchQuery$ ?? EMPTY,
  ])
    .pipe(
      map(([h, f, l]) => ({
        dataAvailable: h.length > 0,
        dataCount: h.length,
        filteredSearchHistory: f,
        latestSearchQuery: l
      }))
    );

}
