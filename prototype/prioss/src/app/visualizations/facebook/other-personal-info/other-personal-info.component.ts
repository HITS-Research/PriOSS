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
  filteredAddressBookData: AddressBookModel[] = [];
  filteredSearchHistoryData: SearchHistoryModel[] = [];
  cellSize: number;
  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  searchText = '';
  totalContactNumbers = 0;
  contactNumbers: any = [];
  totalSearchedText = 0;
  addressBookPageSize = 10;
  addressBookCurrentPage = 1;
  addressBookTotalPages = 1;

  
  @Input()
  previewMode = false;

  constructor(
    private faceAddressBookRepo: FacebookAddressBookRepository,
    private faceSearchHistoryRepo: FacebookSearchHistoryRepository
    
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    this.faceAddressBookRepo.getAllFaceAddressBook().then((addressBookData) => {
      this.addressBookData = addressBookData;
      this.gridLayout();
      this.addressBookTotalPages = Math.ceil(this.addressBookData.length / this.addressBookPageSize);
      this.filterAddressBookItems(this.searchText);
    });

      this.faceSearchHistoryRepo.getAllFaceSearchHistory().then((searchHistoryData) => {
      this.searchHistoryData = searchHistoryData;
      this.totalSearchedText= this.searchHistoryData.length;
      console.log(this.totalSearchedText)
      this.totalPages = Math.ceil(this.searchHistoryData.length / this.pageSize);
      this.filterSearchHistoryItems(this.searchText);
     
    });
  }

  gridLayout() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const padding = 10;
    const numCols = 10;

    const filteredData = this.addressBookData.filter(item => item.name && item.contact_point);

    if (filteredData.length === 0) {
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

  filterAddressBookItems(searchText: string): void {
    this.addressBookCurrentPage = 1;
  
    const freshData = this.addressBookData.slice();
    this.filteredAddressBookData = freshData.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.contact_point.toLowerCase().includes(searchText.toLowerCase())
    );
  
    this.addressBookTotalPages = Math.ceil(this.filteredAddressBookData.length / this.addressBookPageSize);
  }
  

  filterSearchHistoryItems(searchText: string): void {
    this.currentPage = 1;

    const freshData = this.searchHistoryData.slice();
    this.filteredSearchHistoryData = freshData.filter(item =>
      item.text.toLowerCase().includes(searchText.toLowerCase())
    );

    this.totalPages = Math.ceil(this.filteredSearchHistoryData.length / this.pageSize);
  }

  getVisibleData(): SearchHistoryModel[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredSearchHistoryData.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  getVisibleAddressBookData(): AddressBookModel[] {
    const startIndex = (this.addressBookCurrentPage - 1) * this.addressBookPageSize;
    const endIndex = startIndex + this.addressBookPageSize;
    return this.filteredAddressBookData.slice(startIndex, endIndex);
  }
  
  goToAddressBookPage(page: number): void {
    if (page >= 1 && page <= this.addressBookTotalPages) {
      this.addressBookCurrentPage = page;
    }
  }
  
  clearSearch(): void {
    this.searchText = '';
    this.filterSearchHistoryItems('');
  }
  clearAddressBookSearch(): void {
    this.searchText = '';
    this.filterAddressBookItems('');
  }
}
