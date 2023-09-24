import {AfterViewInit, Component, Input} from '@angular/core';
import { SpotSearchHistoryRepository } from 'src/app/db/data-repositories/spotify/spot-search-history/spot-search-history.repository';
import { SequenceComponentInit } from '../../sequence-component-init.abstract';
import { SpotSearchHistory } from 'src/app/models/Spotify/SearchHistory/SpotSearchHistory';

/**
  * This component visualizes the search history of a user
  * The Preview lists some information about the amount of search queries.
  * The actual visualisation than displayes search query datra in a table format
  *
  *
  * @author: Max (maxy@mail.upb.de)
  *
  */
@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.less']
})
export class SearchHistoryComponent extends SequenceComponentInit implements AfterViewInit{
  searchHistory: SpotSearchHistory[] = [];
  listOfsearchHistory: SpotSearchHistory[] = [];
  latestSearchQuery: string = ""

  @Input()
  previewMode = false;

  constructor(private spotSearchHistoryRepo: SpotSearchHistoryRepository) {
    super();
  }


  /**
    * A Callback called by angular when the views have been initialized
    * It handles the initialization when the component is displayed on its own dedicated page.
    *
    * @author: Simon (scg@mail.upb.de)
    */
  ngAfterViewInit()
  {
    console.log("--- Preview Mode: " + this.previewMode);
    if(!this.previewMode) {
      this.initComponent();
    }
  }

  /**
  * @see-super-class
  * @author: Max (maxy@mail.upb.de)
  */
  override async initComponent(): Promise<void> {
    console.log("--- Initializing Component 5: Search-History");
    await this.spotSearchHistoryRepo.getUserSearches().then((searchHistory) => {
      this.searchHistory = searchHistory;
      this.listOfsearchHistory = [...this.searchHistory];
      this.latestSearchQuery = searchHistory[searchHistory.length-1].searchQuery;
    });
  }
}
