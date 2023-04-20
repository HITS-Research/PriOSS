import { Component } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ActivatedRoute, Router } from "@angular/router";

/**
  * This component is the root component for facebook's dashboard page.
  * This page is shown once a user has successfully uploaded their facebook data-download.
  *
  * @remarks
  * Equivalent components for instagram and spotify exist that define their dashboards
  *
  * @author: rishmamn@campus.uni-paderborn.de rbharmal@mail.upb.de
  *
  */
@Component({
  selector: 'app-face-dashboard',
  templateUrl: './face-dashboard.component.html',
  styleUrls: ['./face-dashboard.component.less']
})
export class FaceDashboardComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dbService: NgxIndexedDBService,
  ) { }
  /**
    * This  method is responsible to navigate to the ads component page.
    * @author: rishmamn@campus.uni-paderborn.de
    *
   */
  adsData() {
    this.router.navigate(['face/ads-related-data']);
  }

  /**
  * This  method is responsible to navigate to the inferred topics component page.
  * @author: rbharmal@mail.upb.de
  *
 */
  navigateToInferredTopics() {
    this.router.navigate(['face/inferred-topics']);
  }

  /**
  * This  method is responsible to navigate to the friends and followers component page.
  * @author: rbharmal@mail.upb.de
  *
 */
  navigateToFriendsAndFollowers() {
    this.router.navigate(['face/friendsandfollowers']);
  }

  /**
  * This method is called on button click and starts the tour.
  */
  startTour() {
    //TODO: Add introjs here
  }
}
