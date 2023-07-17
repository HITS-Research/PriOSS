import { Component, Input, OnInit} from '@angular/core';
import { AddressBookModel } from 'src/app/models/Facebook/addressBook';
import { FacebookAddressBookRepository } from 'src/app/db/data-repositories/facebook/fb-other-personal-info/face-address-book.repo';
import { FacebookSearchHistoryRepository } from 'src/app/db/data-repositories/facebook/fb-other-personal-info/face-search-history.repo';
import { SearchHistoryModel } from 'src/app/models/Facebook/searchHistory';

@Component({
  selector: 'app-other-personal-info',
  templateUrl: './other-personal-info.component.html',
  styleUrls: ['./other-personal-info.component.less']
})
export class OtherPersonalInfoComponent implements OnInit {
  addressBookData: AddressBookModel[] = [];
  searchHistoryData: SearchHistoryModel[] = [];
  filteredSearchHistoryData: SearchHistoryModel[] = [];
  cellSize: number;
  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  searchText = '';
   totalContactNumbers = 0;
   contactNumbers:any = [];
   totalSearchedText = 0;
   
   @Input()
   previewMode: boolean = false;

  constructor(
    private faceAddressBookRepo: FacebookAddressBookRepository,
    private faceSearchHistoryRepo: FacebookSearchHistoryRepository
  ) { }

  ngOnInit(): void {
    this.getData();
  }
 /**
      * This method is responsible to activate the get the required data for address book and search history.
      * @author: Rishma (rishmamn@mail.uni-paderborn.de))
      *
      */
  async getData() {
    this.faceAddressBookRepo.getAllFaceAddressBook().then((addressBookData) => {
      this.addressBookData = addressBookData;
      this.gridLayout();
    });

    await this.faceSearchHistoryRepo.getAllFaceSearchHistory().then((searchHistoryData) => {
      this.searchHistoryData = searchHistoryData;
       this.totalSearchedText = this.searchHistoryData.length;
      this.totalPages = Math.ceil(this.searchHistoryData.length / this.pageSize);
      this.filterItems(this.searchText);
    });
  }
      /**
      * This method is responsible to show the data in that page(1-10).
      * @author: Rishma (rishmamn@mail.uni-paderborn.de))
      *
      */
  getVisibleData(): SearchHistoryModel[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredSearchHistoryData.slice(startIndex, endIndex);
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
      * This method is responsible to show the address data in a grid manner with anme and contact number.
      * @author: Rishma (rishmamn@mail.uni-paderborn.de))
      *
      */
      gridLayout() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const padding = 10;
        const numCols = 10;
      
        // Filter out entries without both name and contact_point
        const filteredData = this.addressBookData.filter(item => item.name && item.contact_point);
      
        if (filteredData.length === 0) {
          // Handle the case when there are no valid entries
          this.cellSize = 0;
          return;
        }
      
        const numRows = Math.ceil(filteredData.length / numCols);
      
        const maxTextLength = Math.max(
          ...filteredData.map(item => item.name.length + item.contact_point.length)
        );
      
        this.cellSize = Math.min(
          (width - padding * 2) / numCols,
          (height - padding * 2) / numRows,
          maxTextLength * 10
        );
        
        filteredData.forEach(item => {
          const numbers = item.contact_point.split(",");
          this.contactNumbers.push(...numbers);
          this.totalContactNumbers += numbers.length;
        });
        
        
      }
      
      
      /**
      * This method is responsible to filter the searched text.
      * @author: Rishma (rishmamn@mail.uni-paderborn.de))
      *
      */
  filterItems(searchText: string): void {
    // Reset current page to 1 when filtering
    this.currentPage = 1;

    // Get a fresh copy of the search history data
    const freshData = this.searchHistoryData.slice();

    // Perform filtering based on the search text
    this.filteredSearchHistoryData = freshData.filter(item =>
      item.text.toLowerCase().includes(searchText.toLowerCase())
    );

    // Update the total pages based on the filtered data
    this.totalPages = Math.ceil(this.filteredSearchHistoryData.length / this.pageSize);
  }
     /**
      * This method is responsible to clear the searched text.
      * @author: Rishma (rishmamn@mail.uni-paderborn.de))
      *
      */
  clearSearch(): void {
    this.searchText = '';
    this.filterItems('');
  }
}