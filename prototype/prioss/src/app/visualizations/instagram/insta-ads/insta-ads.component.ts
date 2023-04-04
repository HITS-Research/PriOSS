import { Component, Input } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Router } from '@angular/router';
import { NotificationService } from '../../../notification/notification.component';

/**
 * This component is fsor instagram's advertisement page.
 * This page is shown once a user visits the advertisement tab in instagram dashboard
 * 
 * @author: Mayank (mayank@mail.upb.de)
 * 
 */
@Component({
  selector: 'app-insta-ads',
  templateUrl: './insta-ads.component.html',
  styleUrls: ['./insta-ads.component.less']
})
export class InstaAdsComponent {

  @Input()
  previewMode: boolean = false;

  ads_activity: Ads_Activity[] = [];
  ads_clicked: Ads_Clicked[] = [];
  ads_interests: Ads_Interested[] = [];
  ads_viewed: Ads_Viewed[] = [];

  constructor(private dbService: NgxIndexedDBService, private router: Router, private notifyService: NotificationService)
  {

    // Ads Interest Data fetch from IndexedDB
    this.dbService.getAll('insta/ads_interests').subscribe({
      next: (ads_interests: any) => {
        if(ads_interests.length > 0) {
          this.ads_interests = ads_interests
        }
      },
      error: (error: any) => {
        console.log("Error occurred while fetching ads interests data")
        console.log(error)
      }
    });

    // Ads Activity Data fetch from IndexedDB
    this.dbService.getAll('insta/advertisers_using_your_activity_or_information').subscribe({
      next: (ads_activity: any) => {
        if(ads_activity.length > 0) {
          this.ads_activity = ads_activity
        }
      },
      error: (error: any) => {
        console.log("Error occurred while fetching ads activity data")
        console.log(error)
      }
    });

    // Ads Viewed Data fetch from IndexedDB
    this.dbService.getAll('insta/ads_viewed').subscribe({
      next: (ads_viewed: any) => {
        if(ads_viewed.length > 0) {
          this.ads_viewed = ads_viewed
        }
      },
      error: (error: any) => {
        console.log("Error occurred while fetching ads viewed data")
        console.log(error)
      }
    });

    // Ads Clicked Data fetch from IndexedDB
    this.dbService.getAll('insta/ads_clicked').subscribe({
      next: (ads_clicked: any) => {
        if(ads_clicked.length > 0) {
          this.ads_clicked = ads_clicked
        }
      },
      error: (error: any) => {
        console.log("Error occurred while fetching ads clicked data")
        console.log(error)
      }
    });
  }

  // Default page configuration for Ads Activity 
  currentPage = 1;
  pageSize = 10;

  // Pushing only necessary value to table as per page number
  get sliced_ads_activity_data() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.ads_activity.slice(start, end);
  }

  // Changing the page number based on user selection
  on_ads_actvity_page_change(event: any) {
    this.currentPage = event;
  }

}


/**
 * Created interface for fetching value in HTML for Advertisement User Activity
 */
interface Ads_Activity {
  advertiser_name: string;
  has_data_file_custom_audience: boolean;
  has_in_person_store_visit: boolean;
  has_remarketing_custom_audience: boolean;
}

/**
 * Created interface for fetching value in HTML for Advertisement Clicked
 */
interface Ads_Clicked {
  title: string;
}

/**
 * Created interface for fetching value in HTML for Advertisement Interests
 */
interface Ads_Interested {
  interest: string;
}

/**
 * Created interface for fetching value in HTML for Advertisement Viewed
 */
interface Ads_Viewed {
  title: string;
}
