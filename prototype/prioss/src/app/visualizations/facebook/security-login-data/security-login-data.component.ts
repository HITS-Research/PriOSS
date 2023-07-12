import { Component, Input, OnInit} from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import * as d3 from 'd3';
import { Router } from '@angular/router';
import { FacebookLoginLocationsRepository } from '../../../db/data-repositories/facebook/fb-security-login-data/face_login_locations.repo';
import { LoginLocationsModel } from "../../../models/Facebook/loginLocations";
import { FacebookLoginLogoutsRepository } from '../../../db/data-repositories/facebook/fb-security-login-data/face_login_logouts.repo';
import { LoginLogoutsModel } from '../../../models/Facebook/loginlogouts';
import { FacebookAccountStatusChangesRepository } from '../../../db/data-repositories/facebook/fb-security-login-data/face_account_status_changes.repo';
import { AccountStatusChangesModel } from '../../../models/Facebook/accountStatusChanges';

@Component({
  selector: 'app-security-login-data',
  templateUrl: './security-login-data.component.html',
  styleUrls: ['./security-login-data.component.less']
})

export class SecurityLoginDataComponent {

  @Input()
  previewMode: boolean = false;

  loginLocationsData: LoginLocationsModel[] = [];
  locations: string[] = [];
  devices: any[] = [];
  timestamps: any [] = [];

  loginlogoutData: LoginLogoutsModel[] = [];
  login_count: number = 0;
  logout_count: number = 0;

  accStatusChangeData: AccountStatusChangesModel[] = [];
  account_deactivated: number = 0;
  account_reactivated: number = 0;

  constructor(private dbService: NgxIndexedDBService,
              private faceLoginLocationsRepo: FacebookLoginLocationsRepository,
              private faceLoginLogoutsRepo: FacebookLoginLogoutsRepository,
              private faceAccStatusChangesRepo: FacebookAccountStatusChangesRepository,
              ){}

  ngOnInit() {
    this.prepareData();
  }

  /**
  * This methods fetches all login locations related data from PriossDB
  *
  * @author: Deepa(dbelvi@mail.upb.de)
  *
  */

  async prepareData() {
    this.faceLoginLocationsRepo.getAllLoginLocations().then((allLoginLocations) => {
      this.loginLocationsData = allLoginLocations;
      console.log("this.loginLocationsData", this.loginLocationsData);
      console.log("type of this.loginLocationsData", typeof(this.loginLocationsData));

      for(let i = 0; i < this.loginLocationsData.length; i++) {
        const loc = this.loginLocationsData[i].location;
        const device = this.loginLocationsData[i].device;
        const time = this.loginLocationsData[i].timestamp;

        const unixTime: number  = +this.loginLocationsData[i].timestamp;
        this.loginLocationsData[i].timestamp = new Date(unixTime * 1000).toDateString();
      } 
    });

    this.faceLoginLogoutsRepo.getAllLoginLogouts().then((allLoginLogouts) => {
      this.loginlogoutData = allLoginLogouts;
      for(let i = 0; i < this.loginlogoutData.length; i++) {
        const unixTime: number  = +this.loginlogoutData[i].timestamp;
        this.loginlogoutData[i].timestamp = new Date(unixTime * 1000).toDateString();

        if(this.loginlogoutData[i].action === 'Login') {
          this.login_count++;
        }
        else if(this.loginlogoutData[i].action === 'Log out') {
          this.logout_count++;
        }
      }  
    });

    this.faceAccStatusChangesRepo.getAllAccStatusChanges().then((allAccStatusChanges) => {
      this.accStatusChangeData = allAccStatusChanges;
      for(let i = 0; i< this.accStatusChangeData.length; i++) {
        const unixTime: number  = +this.accStatusChangeData[i].timestamp;
        this.accStatusChangeData[i].timestamp = new Date(unixTime * 1000).toDateString();

        if (this.accStatusChangeData[i].status === 'Account deactivated') {
          this.account_deactivated++;
        }
        else {
          this.account_reactivated++;
        }
      }
    });
  }

  async visualizeData(locations: string[], devices: string[], timestamps: string[]) {
    console.log("In visualizeData");

  }



}
