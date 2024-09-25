import { Component, Input, OnInit, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddressBookModel, AddressBookItem } from 'src/app/facebook/models/PersonalInformation/OtherPersonalInformation/AddressBooks';
import { SearchHistoryModel, SearchHistoryItem } from 'src/app/facebook/models/LoggedInformation/Search/SearchHistory';
import { FbPersonalInformationDataModel, FbLoggedInformationModel, FbUserDataModel } from '../../state/models';
import { IndexedDbService } from 'src/app/state/indexed-db.state';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzResultModule } from 'ng-zorro-antd/result';
import { FormsModule } from '@angular/forms';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';

/**
 * Component for displaying other personal information including address book and search history.
 */
@Component({
  selector: 'app-other-personal-info',
  templateUrl: './other-personal-info.component.html',
  styleUrls: ['./other-personal-info.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    NgClass,
    NgIf,
    NzAvatarModule,
    NzCardModule,
    NzGridModule,
    NzIconModule,
    NzListModule,
    NzResultModule,
    NzSkeletonModule,
    NzStatisticModule,
    NzTabsModule,
    NzTagModule,
    NzToolTipModule,
    TitleBarComponent,
  ]
})
export class OtherPersonalInfoComponent implements OnInit {
  /** Signal for loading state */
  loading = signal<boolean>(true);

  /** Computed property for address book data */
  addressBookData = computed(() => this.fbAddressBookInfo().address_book_v2?.address_book ?? []);

  /** Computed property for search history data */
  searchHistoryData = computed(() => this.fbSearchHistoryInfo().searches_v2 ?? []);

  /** Computed property for filtered address book data */
  filteredAddressBookData = computed(() => {
    return this.addressBookData().filter(
      (item) =>
        item.name.toLowerCase().includes(this.addressBookSearchText().toLowerCase()) ||
        item.details[0].contact_point.toLowerCase().includes(this.addressBookSearchText().toLowerCase()),
    );
  });

  /** Computed property for filtered search history data */
  filteredSearchHistoryData = computed(() => {
    return this.searchHistoryData().filter((item) =>
      item.data[0].text.toLowerCase().includes(this.searchHistorySearchText().toLowerCase()),
    );
  });

  /** Signal for address book search text input */
  addressBookSearchTextInput = signal<string>('');

  /** Computed property for address book search text */
  addressBookSearchText = computed(() => this.addressBookSearchTextInput());

  /** Signal for search history search text input */
  searchHistorySearchTextInput = signal<string>('');

  /** Computed property for search history search text */
  searchHistorySearchText = computed(() => this.searchHistorySearchTextInput());

  /** Cell size for grid layout */
  cellSize: number;

  /** Page size for pagination */
  pageSize = 10;

  /** Current page number */
  currentPage = 1;

  /** Total number of pages */
  totalPages = 1;

  /** Computed property for total number of contact numbers */
  totalContactNumbers = computed(() => this.filteredAddressBookData().length);

  /** Computed property for total number of searched texts */
  totalSearchedText = computed(() => this.filteredSearchHistoryData().length);

  /** Page size for address book pagination */
  addressBookPageSize = 8;

  /** Current page for address book pagination */
  addressBookCurrentPage = 1;

  /** Computed property for total pages in address book */
  addressBookTotalPages = computed(() => Math.ceil(this.filteredAddressBookData().length / this.addressBookPageSize));

  /** Computed property to check if address book data is available */
  dataAvailableAddressBook = computed(() => this.addressBookData().length !== 0);

  /** Computed property to check if search history data is available */
  dataAvailableSearchHistory = computed(() => this.searchHistoryData().length !== 0);

  /** Signal for user data */
  userData = signal<FbUserDataModel>({} as FbUserDataModel);

  /** Computed property for personal information store */
  fbPersonalInfoStore = computed(() => this.userData().personal_information ?? {} as FbPersonalInformationDataModel);

  /** Computed property for logged information store */
  fbLoggedInfoStore = computed(() => this.userData().logged_information ?? {} as FbLoggedInformationModel);

  /** Computed property for address book information */
  fbAddressBookInfo = computed(() => this.fbPersonalInfoStore().address_books ?? {} as AddressBookModel);

  /** Computed property for search history information */
  fbSearchHistoryInfo = computed(() => this.fbLoggedInfoStore().search_history ?? {} as SearchHistoryModel);

  /** Mapping for address avatar colors */
  addressAvatarColorMapping: { [key: string]: string } = {};

  /** Input property for preview mode */
  @Input() previewMode = false;

  /**
   * Constructor for OtherPersonalInfoComponent
   * @param store - NGXS store service
   * @param indexedDbService - Service for interacting with IndexedDB
   */
  constructor(
    private store: Store,
    private indexedDbService: IndexedDbService,
  ) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized
   */
  ngOnInit(): void {
    this.getData();
  }

  /**
   * This method is responsible to activate the get the required data for address book and search history.
   * @author Rishma (rishmamn@mail.uni-paderborn.de)
   */
  async getData() {
    await this.indexedDbService.getSelectedFacebookDataStore()
      .then((data) => {
        if (!data.facebookData) {
          this.userData.set({} as FbUserDataModel);
        } else {
          this.userData.set(data.facebookData);
        }
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  /**
   * This method is responsible to show the data in that page for search history(1-10).
   * @author Rishma (rishmamn@mail.uni-paderborn.de)
   * @returns Array of visible SearchHistoryItem for the current page
   */
  getVisibleData(): SearchHistoryItem[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredSearchHistoryData().slice(startIndex, endIndex);
  }

  /**
   * This method is responsible to show go to the required page of the respective buttons(previous and next).
   * @author Rishma (rishmamn@mail.uni-paderborn.de)
   * @param page - The page number to navigate to
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  /**
   * This method is responsible to show the data in that page for address book(1-10).
   * @author Rishma (rishmamn@mail.uni-paderborn.de)
   * @returns Array of visible AddressBookItem for the current page
   */
  getVisibleAddressBookData(): AddressBookItem[] {
    const startIndex = (this.addressBookCurrentPage - 1) * this.addressBookPageSize;
    const endIndex = startIndex + this.addressBookPageSize;
    return this.filteredAddressBookData().slice(startIndex, endIndex);
  }

  /**
   * This method is responsible to show go to the required page of the respective buttons(previous and next).
   * @author Rishma (rishmamn@mail.uni-paderborn.de)
   * @param page - The page number to navigate to
   */
  goToAddressBookPage(page: number): void {
    if (page >= 1 && page <= this.addressBookTotalPages()) {
      this.addressBookCurrentPage = page;
    }
  }

  /**
   * Generates a random color from a predefined list of colors
   * @returns A randomly selected color string
   */
  getRandomColor(): string {
    const colors = [
      '#FF5733', '#FFC300', '#36A2EB', '#4BC0C0', '#9966FF', '#FF6384', '#FFCE56', '#33FF77',
      '#66CCFF', '#FF7F50', '#FFD700', '#00FF00', '#FF1493', '#008080', '#CD5C5C', '#9370DB'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}