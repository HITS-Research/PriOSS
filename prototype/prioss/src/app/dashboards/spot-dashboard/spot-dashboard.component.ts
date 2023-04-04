import { Component } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Router } from '@angular/router';
import { GeneralDataComponent } from 'src/app/visualizations/all/general-data/general-data.component';
import { MoodComponent } from 'src/app/visualizations/spotify/mood/mood.component';
import { InferencesComponent } from 'src/app/visualizations/spotify/inferences/inferences.component';

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
export class SpotDashboardComponent{
  thirdPartyConnection = false;
  username: string = "";
  pathToGeneralData: string = "";
  pathToMood: string = "";
  pathToInference: string = "";

  constructor(private dbService: NgxIndexedDBService, private router: Router)
  {
    this.dbService.getAll('all/userdata').subscribe((userdata: any) =>
    {
        console.log("Userdata: ");
        console.log(userdata);
        this.username = userdata[0].username;
    });

    this.dbService.getAll('spot/inferences').subscribe((inferences) =>
    {
      console.log("Inferences: ");
      console.log(inferences);
    });


    //this.username = this.dbService.getByKey<string>("all/userdata", "username");

    /*

    this.dbService.getAll('all/userdata').subscribe({
      next(userdata: any)
      {
        console.log("Userdata: ");
        console.log(userdata);
        let username: any = userdata[0].username;
      },
      error(msg)
      {
        console.log("Error obtaining all/userdata");
        console.log(msg);
      }
    });

    this.dbService.getAll('spot/inferences').subscribe((inferences) => {
      console.log("Inferences: ");
      console.log(inferences);
    });

    */
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
    console.log(this.router.config);
    for (var route of this.router.config){
      if(route.component == GeneralDataComponent){
        this.pathToGeneralData = route.path!; // The exclemation mark ensures that route.path is non-null, which we know because routes are hardcoded
      }
      if(route.component == MoodComponent){
        this.pathToMood = route.path!;
      }
      if(route.component == InferencesComponent){
        this.pathToInference = route.path!;
      }
    }
  }

}
