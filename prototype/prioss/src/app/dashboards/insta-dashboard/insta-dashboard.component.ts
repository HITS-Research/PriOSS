import { Component } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ActivatedRoute, Router } from "@angular/router";
import { IntrojsService } from 'src/app/introjs/introjs.service';

/**
  * This component is the root component for instagram's dashboard page.
  * This page is shown once a user has successfully uploaded their instagram data-download.
  *
  * @remarks
  * Equivalent components for facebook and spotify exist that define their dashboards
  *
  * @author: Paul (pasch@mail.upb.de)
  *
  */
@Component({
  selector: 'app-insta-dashboard',
  templateUrl: './insta-dashboard.component.html',
  styleUrls: ['./insta-dashboard.component.less']
})
export class InstaDashboardComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dbService: NgxIndexedDBService,
    private introService: IntrojsService,
  ) { }

  current = 0;
  index = 'First-content';

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      case 3: {
        this.index = 'fourth-content';
        break;
      }
      case 4: {
        this.index = 'fifth-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

  /**
    * This method starts the tour and sets @param tourCompleted in the @service introjs to true.
    * The boolean is set so not every time the page is navigated to, the tour starts again.
    * 
    * @author: Melina (kleber@mail.uni-paderborn.de)
    */
  ngAfterViewInit(): void  {
    if (this.introService.isInstagramTourCompleted() == false) {
      this.introService.instagramDashboardTour();
      this.introService.setInstagramTourCompleted(true);
    }
  }

  /**
  * This method is called on button click and starts the tour.
  */
  startTour() {
    //TODO: Add introjs here
    this.introService.instagramDashboardTour();
  }
}
