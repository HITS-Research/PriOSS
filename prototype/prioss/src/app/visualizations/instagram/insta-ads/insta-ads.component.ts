import { Component, Input } from '@angular/core';
import { SequenceComponentInit } from '../../sequence-component-init.abstract';

import { InstaAdsActivityRepository } from 'src/app/db/data-repositories/instagram/insta-ads/insta-ads-activity.repository';
import { InstaAdsClickedRepository } from 'src/app/db/data-repositories/instagram/insta-ads/insta-ads-clicked.repository';
import { InstaAdsInterestRepository } from 'src/app/db/data-repositories/instagram/insta-ads/insta-ads-interest.repository';
import { InstaAdsViewedRepository } from 'src/app/db/data-repositories/instagram/insta-ads/insta-ads-viewed.repository';

import { InstaAdsActivityInfo } from 'src/app/models/Instagram/LikedAdsInfo/InstaAdsActivityInfo';
import { InstaAdsClickedInfo } from 'src/app/models/Instagram/LikedAdsInfo/InstaAdsClickedInfo';
import { InstaAdsInterestInfo } from 'src/app/models/Instagram/LikedAdsInfo/InstaAdsInterestInfo';
import { InstaAdsViewedInfo } from 'src/app/models/Instagram/LikedAdsInfo/InstaAdsViewedInfo';

import * as generalUtils from "../../../utilities/generalUtilities.functions";

/**
 * This component is fsor instagram's advertisement page.
 * This page is shown once a user visits the advertisement tab in instagram dashboard
 * 
 * @author: Aayushma & Mayank (aayushma@mail.uni-paderborn.de & mayank@mail.upb.de) 
 * 
 */
@Component({
  selector: 'app-insta-ads',
  templateUrl: './insta-ads.component.html',
  styleUrls: ['./insta-ads.component.less']
})
export class InstaAdsComponent extends SequenceComponentInit{

  @Input()
  previewMode: boolean = false;

  ads_activity: InstaAdsActivityInfo[] = [];
  ads_clicked: InstaAdsClickedInfo[] = [];
  ads_interests: InstaAdsInterestInfo[] = [];
  ads_viewed: InstaAdsViewedInfo[] = [];

  constructor(private instaAdsActivityRepo: InstaAdsActivityRepository,
    private instaAdsClickedRepo: InstaAdsClickedRepository,
    private instaAdsInterestRepo: InstaAdsInterestRepository,
    private instaAdsViewedRepo: InstaAdsViewedRepository){

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
  * @see-super-class
  * @author Paul (pasch@mail.upb.de)
  */
  override async initComponent(): Promise<void> {
    console.log("--- Initializing Component 2: Advertisement");

    // Ads Data fetched from SQlite
    
    let ads_activity = await this.instaAdsActivityRepo.getAllInstaAdsActivity();
    if(ads_activity.length > 0) {
      this.ads_activity = ads_activity
    }

    let ads_clicked = await this.instaAdsClickedRepo.getAllInstaAdsClicked();
    if(ads_clicked.length > 0) {
      this.ads_clicked = ads_clicked
    }

    let ads_interests = await this.instaAdsInterestRepo.getAllInstaAdsInterested();
    if(ads_interests.length > 0) {
      this.ads_interests = ads_interests
    }

    let ads_viewed = await this.instaAdsViewedRepo.getAllInstaAdsViewed();
    if(ads_viewed.length > 0) {
      this.ads_viewed = ads_viewed
    }
  }
}