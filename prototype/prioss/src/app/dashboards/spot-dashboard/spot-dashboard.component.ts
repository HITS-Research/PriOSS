import { Component } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Router } from '@angular/router';
import { GeneralDataComponent } from 'src/app/visualizations/all/general-data/general-data.component';
import { MoodComponent } from 'src/app/visualizations/spotify/mood/mood.component';
import { InferencesComponent } from 'src/app/visualizations/spotify/inferences/inferences.component';
import { IntrojsService } from 'src/app/introjs/introjs.service';

/**
  * This component is the root component for spotify's dashboard page.
  * This page is shown once a user has successfully uploaded their spotify data-download.
  *
  * @remarks
  * Equivalent components for facebook and instagram exist that define their dashboards
  *
  * @author: Simon (scg@mail.upb.de), Rashida (rbharmal@mail.uni-paderborn.de), Max (maxy@mail.upb.de))
  *
  */
@Component({
  selector: 'app-spot-dashboard',
  templateUrl: './spot-dashboard.component.html',
  styleUrls: ['./spot-dashboard.component.less']
})
export class SpotDashboardComponent {
  thirdPartyConnection = false;
  username: string = "";
  pathToGeneralData: string = "";
  pathToMood: string = "";
  pathToInference: string = "";


  constructor(private dbService: NgxIndexedDBService, private router: Router, private introService: IntrojsService) {
    this.dbService.getAll('all/userdata').subscribe((userdata: any) => {
      this.username = userdata[0].username;
    });
  }


  /**
  * This method is responsible for getting the appropriate component's paths from the app-routing module
  *
  * for example it gets "spot/general-data" for pathToGeneralData from the app-routing module
  *
  * @author: Max (maxy@mail.upb.de))
  *
  */
  ngOnInit() {
    //console.log(this.router.config);
    for (var route of this.router.config) {
      if (route.component == GeneralDataComponent) {
        this.pathToGeneralData = route.path!; // The exclemation mark ensures that route.path is non-null, which we know because routes are hardcoded
      }
      if (route.component == MoodComponent) {
        this.pathToMood = route.path!;
      }
      if (route.component == InferencesComponent) {
        this.pathToInference = route.path!;
      }
    }
  }

  /**
   * This method starts the tour and sets @param tourCompleted in the @service introjs to true.
   * The boolean is set so not every time the page is navigated to, the tour starts again.
   *
   * @author: Sven (svenf@mail.upb.de)
   */
  ngAfterViewInit(): void  {
    // if (this.introService.isSpotifyTourCompleted() == false) {
    //   this.introService.spotifyDashboardTour();
    //   this.introService.setSpotifyTourCompleted(true);
    // }

  }

  /**
   * This method is called on button click and starts the tour.
   */
  startTour() {
    this.introService.spotifyDashboardTour();
  }

}
