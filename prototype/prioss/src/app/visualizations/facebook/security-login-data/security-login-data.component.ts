import { Component, Input, OnInit} from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import * as d3 from 'd3';
import { Router } from '@angular/router';
import { FacebookLoginLocationsRepository } from '../../../db/data-repositories/facebook/fb-security-login-data/face_login_locations.repo';
import { LoginLocationsModel } from "../../../models/Facebook/loginLocations";

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

  // vars for test purpose

  first_loc: string;
  first_device: string;
  first_timestamp: string;

  constructor(private dbService: NgxIndexedDBService,
              private faceLoginLocationsRepo: FacebookLoginLocationsRepository){}

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

        this.locations.push(loc);
        this.devices.push(device);
        this.timestamps.push(time);

        const unixTime: number  = +this.loginLocationsData[i].timestamp;
        this.loginLocationsData[i].timestamp = new Date(unixTime * 1000).toDateString();

      }

      this.visualizeData(this.locations, this.devices, this.timestamps);  
    });

    // console.log("locations:", this.locations);
    // console.log("devices:", this.devices);
    // console.log("timestamps:", this.timestamps);

    // this.first_loc = this.locations[0];
    // this.first_device = this.devices[0];
    // this.first_timestamp = this.timestamps[0];

    // console.log("this.first_loc:", this.first_loc);
    // console.log("this.first_device:", this.first_device);
    // console.log("this.first_timestamp:", this.first_timestamp);

  }

  async visualizeData(locations: string[], devices: string[], timestamps: string[]) {
    console.log("In visualizeData");

  }



}
