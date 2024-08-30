import { Component, Input, OnInit,ChangeDetectionStrategy, signal, computed} from '@angular/core';
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
  loading = signal<boolean>(true);
  addressBookData = computed(() => this.fbAddressBookInfo().address_book_v2?.address_book ?? []);
  searchHistoryData = computed(() => this.fbSearchHistoryInfo().searches_v2 ?? []);
  filteredAddressBookData = computed(() => {
    return this.addressBookData().filter(
      (item) =>
        item.name.toLowerCase().includes(this.addressBookSearchText().toLowerCase()) ||
        item.details[0].contact_point.toLowerCase().includes(this.addressBookSearchText().toLowerCase()),
    );
  });
  filteredSearchHistoryData = computed(() => {
    return this.searchHistoryData().filter((item) =>
      item.data[0].text.toLowerCase().includes(this.searchHistorySearchText().toLowerCase()),
    );
  });
  addressBookSearchTextInput = signal<string>('');
  addressBookSearchText = computed(() => this.addressBookSearchTextInput());
  searchHistorySearchTextInput = signal<string>('');
  searchHistorySearchText = computed(() => this.searchHistorySearchTextInput());
  cellSize: number;
  pageSize = 10;
  currentPage = 1;
  totalPages = 1;

  totalContactNumbers = computed(() => this.filteredAddressBookData().length);
  totalSearchedText = computed(() => this.filteredSearchHistoryData().length);
  addressBookPageSize = 8;
  addressBookCurrentPage = 1;
  addressBookTotalPages = computed(() => Math.ceil(this.filteredAddressBookData().length / this.addressBookPageSize));
  dataAvailableAddressBook = computed(() => this.addressBookData().length !== 0);
  dataAvailableSearchHistory = computed(() => this.searchHistoryData().length !== 0);

  userData = signal<FbUserDataModel>({} as FbUserDataModel);
  fbPersonalInfoStore = computed(() => this.userData().personal_information ?? {} as FbPersonalInformationDataModel);
  fbLoggedInfoStore = computed(() => this.userData().logged_information ?? {} as FbLoggedInformationModel);
  fbAddressBookInfo = computed(() => this.fbPersonalInfoStore().address_books ?? {} as AddressBookModel);
  fbSearchHistoryInfo = computed(() => this.fbLoggedInfoStore().search_history ?? {} as SearchHistoryModel);

  addressAvatarColorMapping: { [key: string]: string } = {};

  @Input()
  previewMode = false;

  constructor(
    private store: Store,
    private indexedDbService: IndexedDbService,
  ) {}

  ngOnInit(): void {
    this.getData();
  }
  /**
   * This method is responsible to activate the get the required data for address book and search history.
   * @author: Rishma (rishmamn@mail.uni-paderborn.de))
   *
   */

  async getData() {
    await this.indexedDbService.getSelectedFacebookDataStore()
      .then((data) => {
        if (!data.facebookData) {
          this.userData.set({} as FbUserDataModel);
        }else {
          this.userData.set(data.facebookData);
        }
      })
      .finally(() => {
        this.loading.set(false);
      });
  }



  /**
   * This method is responsible to show the data in that page for search history(1-10).
   * @author: Rishma (rishmamn@mail.uni-paderborn.de))
   *
   */

  getVisibleData(): SearchHistoryItem[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredSearchHistoryData().slice(startIndex, endIndex);
  }
  /**
   * This method is responsible to show go to the required page of the respective buttons(previos and next).
   * @author: Rishma (rishmamn@mail.uni-paderborn.de))
   *
   */

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  /**
   * This method is responsible to show the data in that page for address book(1-10).
   * @author: Rishma (rishmamn@mail.uni-paderborn.de))
   *
   */
  getVisibleAddressBookData(): AddressBookItem[] {
    const startIndex =
      (this.addressBookCurrentPage - 1) * this.addressBookPageSize;
    const endIndex = startIndex + this.addressBookPageSize;
    return this.filteredAddressBookData().slice(startIndex, endIndex);
  }
  /**
   * This method is responsible to show go to the required page of the respective buttons(previos and next).
   * @author: Rishma (rishmamn@mail.uni-paderborn.de))
   *
   */
  goToAddressBookPage(page: number): void {
    if (page >= 1 && page <= this.addressBookTotalPages()) {
      this.addressBookCurrentPage = page;
    }
  }



  getRandomColor(): string {
    const colors = [
      '#FF5733', // Orange
      '#FFC300', // Yellow
      '#36A2EB', // Blue
      '#4BC0C0', // Turquoise
      '#9966FF', // Purple
      '#FF6384', // Pink
      '#FFCE56', // Gold
      '#33FF77', // Green
      '#66CCFF', // Light Blue
      '#FF7F50', // Coral
      '#FFD700', // Gold
      '#00FF00', // Lime
      '#FF1493', // Deep Pink
      '#008080', // Teal
      '#CD5C5C', // Indian Red
      '#9370DB'  // Medium Purple
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  }

}
