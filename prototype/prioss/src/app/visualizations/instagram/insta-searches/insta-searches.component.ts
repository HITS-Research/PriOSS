import { Component, Input } from '@angular/core';
import { SequenceComponentInit } from '../../sequence-component-init.abstract';
import { InstaUserSearchesRepository } from 'src/app/db/data-repositories/instagram/insta-searches/insta-user-searches.repository';
import { InstaKeywordSearchesRepository } from 'src/app/db/data-repositories/instagram/insta-searches/insta-keyword-searches.repository';
import { InstaTagSearchesRepository } from 'src/app/db/data-repositories/instagram/insta-searches/insta-tag-searches.repository';
import { InstaUserSearch } from 'src/app/models/Instagram/Searches/InstaUserSearch';
import { InstaKeywordSearch } from 'src/app/models/Instagram/Searches/InstaKeywordSearch';
import { InstaTagSearches } from 'src/app/models/Instagram/Searches/InstaTagSearches';
import * as utilities from 'src/app/utilities/generalUtilities.functions';


/**
 * This component visualizes the searches of an instergram user.
 * This page is shown once a user visits the likes tab in instagram dashboard
 * 
 * @author: Paul (pasch@mail.upb.de)
 * 
 */
@Component({
  selector: 'app-insta-searches',
  templateUrl: './insta-searches.component.html',
  styleUrls: ['./insta-searches.component.less']
})
export class InstaSearchesComponent extends SequenceComponentInit{

  @Input()
  previewMode: boolean = false;
  convertTimestamp: (str: string) => any = utilities.convertTimestamp;

  userSearches: InstaUserSearch[] = [];
  keywordSearches: InstaKeywordSearch[] = [];
  tagSearches: InstaTagSearches[] = [];

  constructor(private instaUserSearchRepo: InstaUserSearchesRepository, 
              private instaKeywordSearchRepo: InstaKeywordSearchesRepository, 
              private instaTagSearchRepo: InstaTagSearchesRepository) {
    super();
  }

  /**
  * A Callback called by angular when the views have been initialized
  * It handles the initialization when the component is displayed on its own dedicated page.
  *
  * @author: Paul (pasch@mail.upb.de)
  */
  ngAfterViewInit() {
    if(!this.previewMode) {
      this.initComponent();
    }
  }


  /**
  *
  * @author: Paul (pasch@mail.upb.de)
  */
  override async initComponent(): Promise<void> {
    console.log("--- Initializing Component 7: Searches");

    await this.instaUserSearchRepo.getUserSearches().then((userSearches) => {
      this.userSearches = userSearches;
    });
    await this.instaKeywordSearchRepo.getKeywordSearches().then((keywordSearches) => {
      this.keywordSearches = keywordSearches;
    });
    await this.instaTagSearchRepo.getTagSearches().then((tagSearches) => {
      this.tagSearches = tagSearches;
    });
  }
}
