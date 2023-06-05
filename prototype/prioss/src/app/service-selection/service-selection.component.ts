import { Component,OnInit, Inject, HostListener } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { faCircleRight } from '@fortawesome/free-regular-svg-icons'
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
import { NotificationService } from '../notification/notification.component';
import { AppType } from '../enum/app-type';

import { SQLiteDBConnection, capSQLiteTableOptions } from '@capacitor-community/sqlite';
import { SpotHistoryRepository } from '../db/data-repositories/spotify/spot-history/spot-history.repository';
import { DBService } from '../services/db/db.service';
import { SpotListenHistoryEntry } from '../models/Spotify/ListeningHistory/SpotListenHistoryEntry';
import * as JSZip from 'jszip';

import * as dateUtils from '../utilities/dateUtils.functions';
import * as utilities from '../utilities/generalUtilities.functions'
import { HttpClient } from '@angular/common/http';

import { InferencesRepository } from '../db/data-repositories/general/inferences/inferences.repository';
import { InstaPersonalRepository } from '../db/data-repositories/instagram/insta-personal-info/insta-personal.repository';
import { InstaAdsActivityRepository } from '../db/data-repositories/instagram/insta-ads/insta-ads-activity.repository';
import { InstaAdsInterestRepository } from '../db/data-repositories/instagram/insta-ads/insta-ads-interest.repository';
import { InstaAdsClickedRepository } from '../db/data-repositories/instagram/insta-ads/insta-ads-clicked.repository';
import { InstaAdsViewedRepository } from '../db/data-repositories/instagram/insta-ads/insta-ads-viewed.repository';
import { InstaSignUpRepository } from '../db/data-repositories/instagram/insta-accountcreation-login/insta-signup.repository';

import { UserdataRepository } from '../db/data-repositories/general/userdata/userdata.repository';
import { InstaLikedCommentsRepository } from '../db/data-repositories/instagram/insta-liked-content/insta-likedcomments.repository';
import { InstaLikedPostsRepository } from '../db/data-repositories/instagram/insta-liked-content/insta-likedposts.repository';
import { InstaLoginRepository } from '../db/data-repositories/instagram/insta-accountcreation-login/insta-login.repository';
import { InstaLogoutRepository } from '../db/data-repositories/instagram/insta-accountcreation-login/insta-logout.repository';

//service identifier filenames
const instaIDFilename = "TODO";
const spotIDFilename = "MyData/Read_Me_First.pdf";
const faceIDFilename = "index.html";

/*
 * Use this inline function to wait for the specified number of milliseconds inside an async function by waiting for it:
 * await delay(2000);
 * 
 * @author: Simon (scg@mail.upb.de)
 */
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

/**
  * This component is responsible for offering the user a way to select a service, show the respective download instructions
  * and offer a field where the user can upload the data-download. With uploaded data, the user can press a button to
  * parse the data and go to the dashboard of the respective service
  *
  * @author: Simon (scg@mail.upb.de), Rashida (rbharmal@mail.uni-paderborn.de ), Paul (pasch@mail.upb.de)
  *
  */
@Component({
  selector: 'app-service-selection',
  templateUrl: './service-selection.component.html',
  styleUrls: ['./service-selection.component.less']
})
export class ServiceSelectionComponent {

  //Icon properties
  faCircleRight = faCircleRight;
  faArrowRotateRight = faArrowRotateRight;
  isProcessingFile = false;
  pageYoffset = 0;;

  //file upload
  uploadedFiles: File[] = [];
  selectedFileName: string = "";

  progressBarPercent: number = 0;
  progressBarVisible: boolean = false;
  requestedAbortDataParsing: boolean = false;

  appType: typeof AppType = AppType;

  selectedServiceName: AppType;

  sampleDataPath = "assets/sample-data/";
  sampleDataFilenameSpotify = "spot_sampledata.zip";
  sampleDataFilenameFacebook = "face_sampledata.zip";
  sampleDataFilenameInstagram = "insta_sampledata.zip";

  constructor(private dbService: NgxIndexedDBService, 
              private router: Router, 
              private notifyService: NotificationService, 
              private spotHistoryRepo: SpotHistoryRepository, 
              private inferencesRepo: InferencesRepository, 
              private UserdataRepo: UserdataRepository,
              private instaPersonalRepo: InstaPersonalRepository, 
              private instaAdsActivityRepo: InstaAdsActivityRepository, 
              private instaAdsInterestRepo: InstaAdsInterestRepository,
              private instaAdsClickedRepo: InstaAdsClickedRepository,
              private instaAdsViewedRepo: InstaAdsViewedRepository,
              private instaSignUpRepo: InstaSignUpRepository,
              private instaLoginRepo: InstaLoginRepository,
              private instaLogoutRepo: InstaLogoutRepository,
              private instaLikedCommentsRepo: InstaLikedCommentsRepository,
              private instaLikedPostsRepo: InstaLikedPostsRepository,
              private sqlDBService: DBService, 
              private http: HttpClient,
              private scroll: ViewportScroller) {
    
    //clear the database when this component gets created
    this.dbService.clear("all/userdata").subscribe((deleted) => {
      console.log("Cleared all/userdata: " + deleted);
    });
    this.dbService.clear("spot/userdata").subscribe((deleted) => {
      console.log("Cleared spot/userdata: " + deleted);
    });
    this.dbService.clear("spot/inferences").subscribe((deleted) => {
      console.log("Cleared spot/inferences: " + deleted);
    });
    this.dbService.clear("spot/history").subscribe((deleted) => {
      console.log("Cleared spot/history: " + deleted);
    });

    this.dbService.clear("insta/ads_interests").subscribe((deleted) => {
      console.log("Cleared insta/ads_interests: " + deleted);
    });
    this.dbService.clear("insta/advertisers_using_your_activity_or_information").subscribe((deleted) => {
      console.log("Cleared insta/advertisers_using_your_activity_or_information: " + deleted);
    });
    this.dbService.clear("insta/ads_viewed").subscribe((deleted) => {
      console.log("Cleared insta/ads_viewed: " + deleted);
    });
    this.dbService.clear("insta/ads_clicked").subscribe((deleted) => {
      console.log("Cleared insta/ads_clicked: " + deleted);
    });
    this.dbService.clear("insta/last_known_location").subscribe((deleted) => {
      console.log("Cleared insta/last_known_location: " + deleted);
    });
    this.dbService.clear("insta/login_activity").subscribe((deleted) => {
      console.log("Cleared insta/login_activity: " + deleted);
    });
    this.dbService.clear("insta/logout_activity").subscribe((deleted) => {
      console.log("Cleared insta/logout_activity: " + deleted);
    });
    this.dbService.clear("insta/password_change_activity").subscribe((deleted) => {
      console.log("Cleared insta/password_change_activity: " + deleted);
    });
    this.dbService.clear("insta/signup_information").subscribe((deleted) => {
      console.log("Cleared insta/signup_information: " + deleted);
    });
    this.dbService.clear("insta/account_information").subscribe((deleted) => {
      console.log("Cleared insta/account_information: " + deleted);
    });
    this.dbService.clear("insta/professional_information").subscribe((deleted) => {
      console.log("Cleared insta/professional_information: " + deleted);
    });
    this.dbService.clear("insta/profile_changes").subscribe((deleted) => {
      console.log("Cleared insta/profile_changes: " + deleted);
    });

    this.dbService.clear("face/ads_information").subscribe((deleted) => {
      console.log("Cleared face/ads_information: " + deleted);
    });
    this.dbService.clear("face/ads_interacted").subscribe((deleted) => {
      console.log("Cleared face/ads_interacted: " + deleted);
    });
    this.dbService.clear("face/inferred_topics").subscribe((deleted) => {
      console.log("Cleared face/inferred_topics: " + deleted);
    });
    this.dbService.clear("face/apps_websites").subscribe((deleted) => {
      console.log("Cleared face/apps_websites: " + deleted);
    });
    this.dbService.clear("face/off_facebook_activity").subscribe((deleted) => {
      console.log("Cleared face/off_facebook_activity: " + deleted);
    });
    this.dbService.clear("face/friend_requests_received").subscribe((deleted) => {
      console.log("Cleared face/friend_requests_received: " + deleted);
    });
    this.dbService.clear("face/friend_requests_sent").subscribe((deleted) => {
      console.log("Cleared face/friend_requests_sent: " + deleted);
    });
    this.dbService.clear("face/friends").subscribe((deleted) => {
      console.log("Cleared face/friends: " + deleted);
    });
    this.dbService.clear("face/rejected_friend_requests").subscribe((deleted) => {
      console.log("Cleared face/rejected_friend_requests: " + deleted);
    });
    this.dbService.clear("face/removed_friends").subscribe((deleted) => {
      console.log("Cleared face/removed_friends: " + deleted);
    });
    this.dbService.clear("face/who_you_follow").subscribe((deleted) => {
      console.log("Cleared face/who_you_follow: " + deleted);
    });
  }

/**
  * Callback called by angular after the view is initialized. Triggers rebuilding of the sql database
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
  async ngAfterViewInit() {
    await this.sqlDBService.rebuildDatabase();
  };

/**
  * Callback called when pressing the X-button in the progressbar dialog. Stops the reading in process and navigates back to the home page.
  * The navigation is necessary because canceling the parsing process midway-through triggers an error related to the SQLite integration.
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
  async abortDataParsing() {
    this.progressBarVisible = false;
    this.requestedAbortDataParsing = true;
    console.log("ABORTING DATA-DOWNLOAD PARSING");
    await this.sqlDBService.rebuildDatabase();
    //this.router.navigate(["home"]);
  }

  /*
   * File Selection Workflow
   */

/**
  * Event callback that is called when the user puts a file in the upload field
  * Todo: This callback checks if the file is a zip file and contains the signature file
  * for the selected service, to make sure it is a valid data-download from the correct service
  * It displays an error if not.
  *
  *
  * @param event - The change file event that holds the newly uploaded file
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
  onFileSelected(event: any) {
    console.log('onFileSelected');
    this.uploadedFiles = event.target.files;

    this.validateFiles(this.selectedServiceName);//TODO: Pass selected File
  }

/**
  * Selects the clicked app and show instructions based on the selection
  *
  * @param appType - The enum for appType is expected
  *
  * @author: rbharmal (rbharmal@mail.upb.de)
  *
  */
  selectApp(appType: AppType) {
    this.selectedServiceName = appType;
  }

/**
  * Checks if the first file in the uploadedFiles array contains the identifying file of the service with the given serviceName
  *
  * @param serviceName - The serviceName constant for which a data-download zip is expected
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
  validateFiles(selectedApp: AppType) {
    let file = this.uploadedFiles[0];

    this.loadZipFile(file).then((zip: any) => {
      if (selectedApp == this.appType.Instagram) {
        let foundFile = zip.files[instaIDFilename];

        if (typeof (foundFile) == undefined) {
          this.notifyService.showNotification("Please select a valid zip-file that you downloaded from Instagram!");
        }
        else {
          this.setSelectedFileName(file.name);
        }
      }
      else if (selectedApp == this.appType.Spotify) {
        let foundFile = zip.files[spotIDFilename];//TODO: this file check does not work yet, look at jszip docs
        //console.log(foundFile);

        if (typeof (foundFile) == undefined) {
          this.notifyService.showNotification("Please select a valid zip-file that you downloaded from Spotify!");
        }
        else {
          this.setSelectedFileName(file.name);
        }
      }
      else if (selectedApp == this.appType.Facebook) {
        let foundFile = zip.files[faceIDFilename];

        if (typeof (foundFile) == undefined) {
          this.notifyService.showNotification("Please select a valid zip-file that you downloaded from Facebook!");
        }
        else {
          this.setSelectedFileName(file.name);
        }
      }
    });

  }

  /**
    * Sets the uploadedFileName to the given filename
    *
    * @param filename - a string containing the name of the file that selected for uploaded
    * @author: Simon (scg@mail.upb.de)
    *
    */
  setSelectedFileName(filename: string) {
    console.log("enabling file selection prompt: " + filename);
    this.selectedFileName = filename;
  }

  /*
   * File Parsing Workflow
   */

 /*
  * Callback when user clicks the button to use sample data instead of their personal data download.
  * Sets the sample data zip file of the provided service to be the selected file and then triggers the normal file parsing workflow.
  *
  * @author: Simon (scg@mail.upb.de)
  */
  async onClickedExploreSampleData() {
    //set the uploaded files field to be the sample data for teh respective service
    //this.uploadedFiles[0] = null;//TODO
    
    let sampleDataLocation : string = "";
    if (this.selectedServiceName == this.appType.Instagram) {
      sampleDataLocation = this.sampleDataPath + this.sampleDataFilenameInstagram;
    }
    else if (this.selectedServiceName == this.appType.Spotify) {
      sampleDataLocation = this.sampleDataPath + this.sampleDataFilenameSpotify;
    }
    else if (this.selectedServiceName == this.appType.Facebook) {
      sampleDataLocation = this.sampleDataPath + this.sampleDataFilenameFacebook;
    }
    else {
      throw Error('The selected Service Name is not a known service. Selected: ' + this.selectedServiceName);
    }
    
    this.progressBarPercent = 0;
    this.progressBarVisible = true;

    //download needed sample data from server (comes precached when pwa functionality works)
    this.http.get(sampleDataLocation, {responseType: 'blob'}).subscribe((sampleData) => {
      this.uploadedFiles = [];
      this.uploadedFiles[0] = new File([sampleData], 'sample_data.zip', { type: 'application/zip', });

      //trigger the normal file upload 
      this.onClickedExploreData();
    });
    
  }

  /**
    * Event callback that is called when the user clicks the explore data button
    * This callback starts the process of parsing the datadownload by calling the parseFile method for the selected service
    *
    * @author: Simon (scg@mail.upb.de)
    *
    */
  async onClickedExploreData() {
    console.log("Clicked explore data");
    this.isProcessingFile = true;
    await this.parseFile(this.selectedServiceName);//TODO: get selected service's name
  }

  /**
    * Start of the file parsing procedure. Hands over the file parsing duty to the correct parsing method of the respective service.
    * Any steps that can be made before the service specific parsing can be added into this method
    *
    * @author: Simon (scg@mail.upb.de)
    *
    */
  async parseFile(selectedApp: AppType) {
    //Put service independent parsing operations here

    //Handing over parsing to service specific parsing methods
    if (selectedApp == this.appType.Instagram) {
      console.log("Parsing Instagram file...");
      await this.parseInstagramFileToSQLite();
    }
    else if (selectedApp == this.appType.Spotify) {
      console.log("Parsing Spotify file...");
      await this.parseSpotifyFileToSQLite();
    }
    else if (selectedApp == this.appType.Facebook) {
      console.log("Parsing Facebook file...");
      this.parseFacebookFile();
    }
  }


  /*
   * Service Specific File Parsing Methods
   */

  /**
    * Parses the uploaded Spotify data-download-zip file into the SQLite database
    *
    * @author: Simon (scg@mail.upb.de)
    *
    */
  async parseSpotifyFileToSQLite() {
    const start = Date.now();

    let file = this.uploadedFiles[0];

    let zip: JSZip = await this.loadZipFile(file);

    this.isProcessingFile = true;//shows the processing icon on the button

    this.progressBarPercent = 0;
    this.progressBarVisible = true;

    let filepaths: string[] = Object.keys(zip.files);
    for (let i = 0; i < filepaths.length; i++) {
      if (this.requestedAbortDataParsing) {
        this.requestedAbortDataParsing = false;
        return;
      }

      this.progressBarPercent = Math.round(100 * (i / filepaths.length));

      let filepath: string = filepaths[i];
      let content: string = await zip.files[filepath].async("string");
      let filename: string | undefined = filepath.split('\\').pop()?.split('/').pop();

      if (!filename) {
        continue;
      }

      console.log('Opening: ' + filename);

      if (filename == "Userdata.json") {
        console.log('Parsing: ' + filename);
        
        let jsonData = JSON.parse(content);
        
        await this.UserdataRepo.addUserdata(jsonData.username, jsonData.email, jsonData.country, jsonData.birthdate, jsonData.gender, jsonData.postalCode,
          jsonData.mobileNumber, jsonData.mobileOperator, jsonData.mobileBrand, jsonData.creationTime);
        
        /* await this.dbService.add("all/userdata",
          {
            username: jsonData.username,
            email: jsonData.email,
            //firstname: jsonData.firstname,
            //lastname: jsonData.lastname,
            country: jsonData.country,
            birthdate: jsonData.birthdate,
            gender: jsonData.gender,
            postalCode: jsonData.postalCode,
            mobileNumber: jsonData.mobileNumber,
            mobileOperator: jsonData.mobileOperator,
            mobileBrand: jsonData.mobileBrand,
            creationTime: jsonData.creationTime,
          }).subscribe((key) => {
            //console.log("Userdata:")
            //console.log(key);
          }); */
      }
      else if (filename == "Inferences.json") {
        console.log('Parsing: ' + filename);
        let jsonData = JSON.parse(content);

        let inferences = jsonData.inferences;
        await this.inferencesRepo.startInferencesBulkAdd(inferences[0], inferences.length);

        for (let i = 1; i < inferences.length; i++) {
          await this.inferencesRepo.addBulkInferencesEntry(inferences[i]);
        }
/*
        for (let i = 1; i < jsonData.length; i++) {
         let inference: any = jsonData[i];
          //console.log("Saving inference: " + inference);
          await this.dbService.add("spot/inferences",
            {
              inference: inference,
            }).subscribe((key) => {
              //console.log("inference: ");
              //console.log(key);
            });
        }*/
      }
      //Scan all streaming history files (multiple numbered files may exist in a download)
      else if (filename.startsWith("StreamingHistory")) {
        let jsonData = JSON.parse(content);

        await this.spotHistoryRepo.startHistoryBulkAdd(jsonData[0].endTime, jsonData[0].artistName, jsonData[0].trackName, jsonData[0].msPlayed, jsonData.length);

        for (let i = 1; i < jsonData.length; i++) {
          await this.spotHistoryRepo.addBulkHistoryEntry(jsonData[i].endTime, jsonData[i].artistName, jsonData[i].trackName, jsonData[i].msPlayed);
        }
      }
    }

    if (this.requestedAbortDataParsing) {
      this.requestedAbortDataParsing = false;
      return;
    }

    const end = Date.now();
    console.log(`Data-download files parsed and data inserted in: ${end - start} ms`);
    
    //Use this for testing what has been written into the DB

    console.log("Start History Fetching");
    this.spotHistoryRepo.getSpotHistory().then((history) => {
      console.log("Read History:");
      console.log(history);
    });
    console.log("Start Inferences Fetching");
    this.inferencesRepo.getAllInferences().then((inferences) => {
      console.log("Read Inferences:");
      console.log(inferences);
    });

    this.progressBarPercent = 100;
    await delay(500);

    this.progressBarVisible = false;
    this.router.navigate(['spot/dashboard']);
  }

  /**
    * Parses the uploaded Instagram data-download-zip file into the SQLite database
    *
    * @author: Paul (pasch@mail.upb.de)
    *
    */
  async parseInstagramFileToSQLite() {
    const start = Date.now();

    let file = this.uploadedFiles[0];

    let zip: JSZip = await this.loadZipFile(file);

    this.isProcessingFile = true;//shows the processing icon on the button

    this.progressBarPercent = 0;
    this.progressBarVisible = true;

    let filepaths: string[] = Object.keys(zip.files);
    for (let i = 0; i < filepaths.length; i++) {
      if (this.requestedAbortDataParsing) {
        this.requestedAbortDataParsing = false;
        return;
      }

      this.progressBarPercent = Math.round(100 * (i / filepaths.length));

      let filepath: string = filepaths[i];
      console.log(filepath);
      let content: string = await zip.files[filepath].async("string");
      let filename: string | undefined = filepath.split('\\').pop()?.split('/').pop();
      console.log(filename);

      if (!filename) {
        continue;
      }

      console.log('Opening: ' + filename);

      //add personal information
      if (filename.startsWith("personal_information")) {
        let jsonData = JSON.parse(content);
        let personalData = jsonData.profile_user[0].string_map_data;

        console.log(personalData)

        // Email Handling
        var email = "";
        if(personalData.Email !== undefined) {
          email = personalData.Email.value;
        }
        else if(personalData["Email address"] !== undefined) {
          email = utilities.getValueIgnoreCase(personalData,"Email address",false);
        }

        var gender = utilities.getValueIgnoreCase(personalData,"Gender",false);
        var dob = utilities.getValueIgnoreCase(personalData,"Date of birth",false);

        await this.instaPersonalRepo.addPersonalInformation(personalData?.Username?.value, email, dob, gender);
      }
      else if (filename.startsWith("account_information")) {
        let jsonData = JSON.parse(content);
        let accountData = jsonData.profile_account_insights[0].string_map_data;

        var contact_syncing = utilities.getValueIgnoreCase(accountData,"Contact Syncing",false)
        var first_country_code = utilities.getValueIgnoreCase(accountData,"First Country Code",false)
        var has_shared_live_video = utilities.getValueIgnoreCase(accountData,"Has Shared Live Video",false)
        var last_login = utilities.getValueIgnoreCase(accountData,"Last Login",true)
        var last_logout = utilities.getValueIgnoreCase(accountData,"Last Logout",true)
        var first_story_time = utilities.getValueIgnoreCase(accountData,"First Story Time",true)
        var last_story_time = utilities.getValueIgnoreCase(accountData,"Last Story Time",true)
        var first_close_friends_story_time = utilities.getValueIgnoreCase(accountData,"First Close Friends Story Time",true)

        await this.instaPersonalRepo.addAccountInformation(contact_syncing, first_country_code, 
          has_shared_live_video, last_login, last_logout, first_story_time, last_story_time, 
          first_close_friends_story_time);
      }
      else if (filename.startsWith("professional_information")) {
        let jsonData = JSON.parse(content);
        let profData = jsonData.profile_business[0];

        await this.instaPersonalRepo.addProfessionalInformation(profData.title);
      }
      else if (filename.startsWith("profile_changes")) {
        let jsonData = JSON.parse(content);
        let profileData = jsonData.profile_profile_change;
        
        for (let i = 0; i < profileData.length; i++) {
          

          var changed_data = profileData[i].string_map_data.Changed.value
          var previous_value = utilities.getValueIgnoreCase(profileData[i].string_map_data,"Previous Value", false);
          var new_value = utilities.getValueIgnoreCase(profileData[i].string_map_data,"New Value", false);
          var change_date = utilities.getValueIgnoreCase(profileData[i].string_map_data,"Change Date", true);

          await this.instaPersonalRepo.addProfileChanges(profileData[i].title, changed_data, previous_value, new_value, change_date);
        }
      }
      //add ads related data
      else if (filename.startsWith('ads_interests')) {
        let jsonData = JSON.parse(content);
        let adsData = jsonData.inferred_data_ig_interest;
        let startData = adsData[0].string_map_data;

        await this.instaAdsInterestRepo.startAdInterestBulkAdd(startData.Interest.value, adsData.length);
        for (let i = 1; i < adsData.length; i++) {
          let entry = adsData[i].string_map_data;
          await this.instaAdsInterestRepo.addAdInterestBulkEntry(entry.Interest.value);
        }
      }
      else if (filename.startsWith('advertisers_using_your_activity')) {
        let jsonData = JSON.parse(content);
        let adsData = jsonData.ig_custom_audiences_all_types;

        await this.instaAdsActivityRepo.startAdActivityBulkAdd(adsData[0].advertiser_name, adsData[0].has_data_file_custom_audience, 
                                                       adsData[0].has_remarketing_custom_audience, adsData[0].has_in_person_store_visit, adsData.length);          
        for (let i = 1; i < adsData.length; i++) {
          await this.instaAdsActivityRepo.addAdActivityBulkEntry(adsData[i].advertiser_name, adsData[i].has_data_file_custom_audience, 
                                                   adsData[i].has_remarketing_custom_audience, adsData[i].has_in_person_store_visit);
        }
      }
      else if (filename.startsWith('ads_clicked')) {
        let jsonData = JSON.parse(content);
        let adsData = jsonData.impressions_history_ads_clicked;

        await this.instaAdsClickedRepo.startAdsClickedBulkAdd(adsData[0].title, adsData[0].string_list_data[0].timestamp, adsData.length);
        for (let i = 1; i < adsData.length; i++) {
          await this.instaAdsClickedRepo.addAdsClickedBulkEntry(adsData[i].title, adsData[i].string_list_data[0].timestamp);
        }
      }
      else if (filename.startsWith('ads_viewed')) {
        let jsonData = JSON.parse(content);
        let adsData = jsonData.impressions_history_ads_seen;
        let startData = adsData[0].string_map_data;

        var startDate_time = ""
        if (startData.Time.timestamp !== undefined) { 
          startDate_time = startData.Time.timestamp
        } else if (startData.Time.value !== undefined) {
          startDate_time = startData.Time.value
        }

        await this.instaAdsViewedRepo.startAdsViewedBulkAdd(startData.Author.value, startDate_time, adsData.length);
        for (let i = 1; i < adsData.length; i++) {
          let entry = adsData[i].string_map_data;
          // Some data is incomplete so it is filtered out here
          if (entry.Author === undefined || entry.Time === undefined) {
            continue;
          }
          var time = ""
          if (entry.Time.timestamp !== undefined) { 
            time = entry.Time.timestamp
          } else if (entry.Time.value !== undefined) {
            time = entry.Time.value
          }

          await this.instaAdsViewedRepo.addAdsViewedBulkEntry(entry.Author.value, time);
        }
      }
      else if (filename.startsWith("signup_information.json")) {
        let jsonData = JSON.parse(content);
        let signup_data = jsonData.account_history_registration_info[0].string_map_data;
        
        let username = utilities.getValueIgnoreCase(signup_data, "Username", false);
        let ip_address = utilities.getValueIgnoreCase(signup_data, "IP Address", false);
        let time = utilities.getValueIgnoreCase(signup_data, "Time", true);
        let email = utilities.getValueIgnoreCase(signup_data, "Email", false);
        let phone_number = utilities.getValueIgnoreCase(signup_data, "Phone Number", false);
        let device = utilities.getValueIgnoreCase(signup_data, "Device", false);

        await this.instaSignUpRepo.addSignUpInformation(
          username, ip_address, time, email, phone_number, device
        );
      }
      else if (filename.startsWith("login_activity.json")) {
        let jsonData = JSON.parse(content);
        let loginData = jsonData.account_history_login_history;
        
        await this.instaLoginRepo.startLoginBulkAdd(
          utilities.getValueIgnoreCase(loginData[0].string_map_data,"IP Address",false), 
          utilities.getValueIgnoreCase(loginData[0].string_map_data,"Time",true), 
          utilities.getValueIgnoreCase(loginData[0].string_map_data,"User Agent",false),
          loginData.length);
        
        for (let i = 1; i < loginData.length; i++) {
          await this.instaLoginRepo.addLoginBulkEntry(
            utilities.getValueIgnoreCase(loginData[i].string_map_data,"IP Address",false), 
            utilities.getValueIgnoreCase(loginData[i].string_map_data,"Time",true), 
            utilities.getValueIgnoreCase(loginData[i].string_map_data,"User Agent",false)
          );
        }
      }
      else if (filename.startsWith("logout_activity.json")) {
        let jsonData = JSON.parse(content);
        let logoutData = jsonData.account_history_logout_history;
        
        await this.instaLogoutRepo.startLogoutBulkAdd(
          utilities.getValueIgnoreCase(logoutData[0].string_map_data,"IP Address",false), 
          utilities.getValueIgnoreCase(logoutData[0].string_map_data,"Time",true), 
          utilities.getValueIgnoreCase(logoutData[0].string_map_data,"User Agent",false),
          logoutData.length);
        
        for (let i = 1; i < logoutData.length; i++) {
          await this.instaLogoutRepo.addLogoutBulkEntry(
            utilities.getValueIgnoreCase(logoutData[i].string_map_data,"IP Address",false), 
            utilities.getValueIgnoreCase(logoutData[i].string_map_data,"Time",true), 
            utilities.getValueIgnoreCase(logoutData[i].string_map_data,"User Agent",false)
          );
        }
      }
      else if (filename.startsWith("liked_comments")) {
        let jsonData = JSON.parse(content);
        let likedComments = jsonData.likes_comment_likes;
        
        await this.instaLikedCommentsRepo.startLikedCommentsBulkAdd(
          likedComments[0].title, 
          likedComments[0].string_list_data[0].href, 
          likedComments[0].string_list_data[0].timestamp, 
          likedComments.length);
        
        for (let i = 1; i < likedComments.length; i++) {
          await this.instaLikedCommentsRepo.addLikedCommentsBulkEntry(
            likedComments[i].title,
            likedComments[i].string_list_data[0].href,
            likedComments[i].string_list_data[0].timestamp);
        }
      }
      else if (filename.startsWith("liked_posts")) {
        let jsonData = JSON.parse(content);
        let likedPosts = jsonData.likes_media_likes;
        
        await this.instaLikedPostsRepo.startLikedPostsBulkAdd(
          likedPosts[0].title, 
          likedPosts[0].string_list_data[0].href, 
          likedPosts[0].string_list_data[0].timestamp, 
          likedPosts.length);
        
        for (let i = 1; i < likedPosts.length; i++) {
          await this.instaLikedPostsRepo.addLikedPostsBulkEntry(
            likedPosts[i].title,
            likedPosts[i].string_list_data[0].href,
            likedPosts[i].string_list_data[0].timestamp);
        }
      }
    }

    if (this.requestedAbortDataParsing) {
      this.requestedAbortDataParsing = false;
      return;
    }

    const end = Date.now();
    console.log(`Data-download files parsed and data inserted in: ${end - start} ms`);

    this.progressBarPercent = 100;
    await delay(500);

    this.progressBarVisible = false;
    this.router.navigate(['insta/dashboard']);
  }

  /**
    * Parses the uploaded Spotify data-download-zip file into the indexedDB
    *
    * @author: Simon (scg@mail.upb.de)
    *
    */
  parseSpotifyFile() {
    let file = this.uploadedFiles[0];

    this.loadZipFile(file).then((zip: any) => {
      this.isProcessingFile = true;//shows the processing icon on the button

      Object.keys(zip.files).forEach((filepath: any) => {
        zip.files[filepath].async("string").then((content: any) => {
          let filename: string = filepath.split('\\').pop().split('/').pop();
          console.log('Opening: ' + filename);

          if (filename == "Userdata.json") {
            console.log('Parsing: ' + filename);
            let jsonData = JSON.parse(content);

            this.dbService.add("all/userdata",
              {
                username: jsonData.username,
                email: jsonData.email,
                //firstname: jsonData.firstname,
                //lastname: jsonData.lastname,
                country: jsonData.country,
                birthdate: jsonData.birthdate,
                gender: jsonData.gender,
                postalCode: jsonData.postalCode,
                mobileNumber: jsonData.mobileNumber,
                mobileOperator: jsonData.mobileOperator,
                mobileBrand: jsonData.mobileBrand,
                creationTime: jsonData.creationTime,
              }).subscribe((key) => {
                //console.log("Userdata:")
                //console.log(key);
              });
          }
          else if (filename == "Inferences.json") {
            console.log('Parsing: ' + filename);
            let jsonData = JSON.parse(content);

            console.log("Json Data inferences: ");
            console.log(jsonData);

            jsonData.inferences.forEach((inference: any) => {
              //console.log("Saving inference: " + inference);
              this.dbService.add("spot/inferences",
                {
                  inference: inference,
                }).subscribe((key) => {
                  //console.log("inference: ");
                  //console.log(key);
                });
            });
          }
          //Scan all streaming history files (multiple numbered files may exist in a download)
          if (filename.startsWith("StreamingHistory")) {
            //console.log('Parsing: ' + filename);
            let jsonData = JSON.parse(content);

            //console.log("Json Data history: ");
            //console.log(jsonData);

            jsonData.forEach((historyItem: any) => {
              console.log(historyItem);
              this.dbService.add("spot/history",
                {
                  endTime: historyItem.endTime,
                  artistName: historyItem.artistName,
                  trackName: historyItem.trackName,
                  msPlayed: historyItem.msPlayed,
                }).subscribe((key) => {
                  //console.log("inference: ");
                  //console.log(key);
                });
            });
          }
        });
        return true;
      });

      setTimeout(() => {
        //TODO: properly wait for data to be available in DB
        this.router.navigate(['spot/dashboard']);
      }, 3000);

    });
  }

  /**
    * Parses the uploaded Facebook data-download-zip file into the indexedDB
    *
    * @author: rishmamn@campus.uni-paderborn.de
    *
    */
  parseFacebookFile() {
    let file = this.uploadedFiles[0];

    this.loadZipFile(file).then((zip: any) => {
      this.isProcessingFile = true;//shows the processing icon on the button

      Object.keys(zip.files).forEach((filename: any) => {
        zip.files[filename].async("string").then((content: any) => {
          if (filename == "profile_information/profile_information.json") {
            let jsonData = JSON.parse(content);
            let personal_data = jsonData.profile_v2;
            const birthdate = personal_data.birthday;
            const formattedBirthdate = `${birthdate.day.toString().padStart(2, '0')}
            -${birthdate.month.toString().padStart(2, '0')}-${birthdate.year}`;
            this.dbService.add("all/userdata",
              {
                username: personal_data.name.full_name,
                email: personal_data.emails.emails,
                birthdate: formattedBirthdate,
                gender: personal_data.gender.gender_option
              }).subscribe((key) => {
              });
              setTimeout(() => {
                //TODO: properly wait for data to be available in DB
                this.progressBarPercent = 30;
              }, 1000);
         
          }
       
          else if (filename == "ads_information/advertisers_using_your_activity_or_information.json") {
            console.log('Parsing: ' + filename);
            let jsonData = JSON.parse(content);
            jsonData.custom_audiences_all_types_v2.forEach((advertisers_info: any) => {
              this.dbService.add('face/ads_information',
                {
                  advertiser_name: advertisers_info.advertiser_name,
                  has_data_file_custom_audience: advertisers_info.has_data_file_custom_audience,
                  has_remarketing_custom_audience: advertisers_info.has_remarketing_custom_audience,
                  has_in_person_store_visit: advertisers_info.has_in_person_store_visit,
                }).subscribe((key) => {
                });
            });
            setTimeout(() => {
              //TODO: properly wait for data to be available in DB
              this.progressBarPercent = 60;
            }, 1500);
         
          }
          else if (filename == "ads_information/advertisers_you've_interacted_with.json") {
            console.log('Parsing: ' + filename);
            let jsonData = JSON.parse(content);
            jsonData.history_v2.forEach((ads_interacted_with_info: any) => {
              this.dbService.add('face/ads_interacted',
                {
                  title: ads_interacted_with_info.title,
                  action: ads_interacted_with_info.action,
                  timestamp: ads_interacted_with_info.timestamp,
                }).subscribe((key) => {
                  console.log("interact", key, this.dbService.getAll('face/ads_interacted'))
                });
            });
          }
          else if (filename == "your_topics/your_topics.json") {
            console.log('Parsing: ' + filename);
            let jsonData = JSON.parse(content);
            jsonData.inferred_topics_v2.forEach((topic: any) => {
              this.dbService.add('face/inferred_topics',
                {
                  topic: topic
                }).subscribe((key) => {
                  console.log("inferred", key, this.dbService.getAll('face/inferred_topics'))
                });
            });
          }
          else if (filename == "apps_and_websites_off_of_facebook/apps_and_websites.json") {
            console.log('Parsing: ' + filename);
            let jsonData = JSON.parse(content);
            jsonData.installed_apps_v2.forEach((apps_websites_info: any) => {
              this.dbService.add('face/apps_websites',
                {
                  name: apps_websites_info.name,
                  added_timestamp: apps_websites_info.added_timestamp,
                  user_app_scoped_id: apps_websites_info.user_app_scoped_id,
                  category: apps_websites_info.category,
                  removed_timestamp: apps_websites_info.removed_timestamp
                }).subscribe((key) => {

                });
            });
          }
          else if (filename == "apps_and_websites_off_of_facebook/your_off-facebook_activity.json") {
            console.log('Parsing: ' + filename);
            let jsonData = JSON.parse(content);
            jsonData.off_facebook_activity_v2.forEach((off_facebook_activity_info: any) => {
              this.dbService.add('face/off_facebook_activity',
                {
                  name: off_facebook_activity_info.name,
                  events: off_facebook_activity_info.events,
                  id: off_facebook_activity_info.events[0].id,
                  type: off_facebook_activity_info.events[0].type,
                  timestamp: off_facebook_activity_info.events[0].timestamp
                }).subscribe((key) => {

                });
            });
          }
          else if (filename == "friends_and_followers/friend_requests_received.json") {
            console.log('Parsing: ' + filename);
            let jsonData = JSON.parse(content);
            jsonData.received_requests_v2.forEach((friends: any) => {
              this.dbService.add('face/friend_requests_received',
                {
                  name: friends.name,
                  timestamp: new Date(friends.timestamp * 1000),
                }).subscribe((key) => {
                  console.log("requests", key, this.dbService.getAll('face/friend_requests_received'))
                });
            });
          }
          else if (filename == "friends_and_followers/friend_requests_sent.json") {
            console.log('Parsing: ' + filename);
            let jsonData = JSON.parse(content);
            jsonData.sent_requests_v2.forEach((friends: any) => {
              this.dbService.add('face/friend_requests_sent',
                {
                  name: friends.name,
                  timestamp: new Date(friends.timestamp * 1000),
                }).subscribe((key) => {
                  console.log("request_sent", key, this.dbService.getAll('face/friend_requests_sent'))
                });
            });
          }
          else if (filename == "friends_and_followers/friends.json") {
            console.log('Parsing: ' + filename);
            let jsonData = JSON.parse(content);
            jsonData.friends_v2.forEach((friends: any) => {
              this.dbService.add('face/friends',
                {
                  name: friends.name,
                  timestamp: new Date(friends.timestamp * 1000),
                }).subscribe((key) => {
                  console.log("friends", key, this.dbService.getAll('face/friends'))
                });
            });
          }
          else if (filename == "friends_and_followers/rejected_friend_requests.json") {
            console.log('Parsing: ' + filename);
            let jsonData = JSON.parse(content);
            jsonData.rejected_requests_v2.forEach((friends: any) => {
              this.dbService.add('face/rejected_friend_requests',
                {
                  name: friends.name,
                  timestamp: new Date(friends.timestamp * 1000),
                }).subscribe((key) => {
                  console.log("rejected_friend_request", key, this.dbService.getAll('face/rejected_friend_requests'))
                });
            });
          }
          else if (filename == "friends_and_followers/removed_friends.json") {
            console.log('Parsing: ' + filename);
            let jsonData = JSON.parse(content);
            jsonData.deleted_friends_v2.forEach((friends: any) => {
              this.dbService.add('face/removed_friends',
                {
                  name: friends.name,
                  timestamp: new Date(friends.timestamp * 1000),
                }).subscribe((key) => {
                  console.log("removed_friends", key, this.dbService.getAll('face/removed_friends'))
                });
            });
          }
          else if (filename == "friends_and_followers/who_you_follow.json") {
            console.log('Parsing: ' + filename);
            let jsonData = JSON.parse(content);
            jsonData.following_v2.forEach((friends: any) => {
              this.dbService.add('face/who_you_follow',
                {
                  name: friends.name,
                  timestamp: new Date(friends.timestamp * 1000),
                }).subscribe((key) => {
                  console.log("who_you_follow", key, this.dbService.getAll('friends_and_followers/who_you_follow'))
                });
            });
          }
          setTimeout(() => {
        
            this.progressBarPercent = 100;
          }, 2000);
        });
      });
      return true;
    });

    console.log("navigating...");
    setTimeout(() => {
      //TODO: properly wait for data to be available in DB
      this.router.navigate(['face/dashboard']);
    }, 3000);
  }

  /*
   * Utility Methods
   */

  /**
    * takes the first file in the uploadedFiles array and tries to load it as a zip-file.
    *
    * @returns the Promise of a zip file loaded by jszip
    *
    * @author: Simon (scg@mail.upb.de)
    *
    */
  async loadZipFile(file: File): Promise<JSZip> {
    if (typeof (file) == "undefined") {
      //TODO: Show error: you didn't upload a zip file
      this.notifyService.showNotification("Please select a data-download zip-file first!");
      this.isProcessingFile = false;
      throw Error('No File selected!');
    }

    if (file.type == "application/zip" || file.type == "application/x-zip-compressed") {
      const zip = new JSZip();
      return await zip.loadAsync(file)
    }
    else {
      //TODO: Show error: you didn't upload a zip file
      this.notifyService.showNotification("The file you selected is not a zip-file. Please select the zip file you downloaded from " + this.selectedServiceName, 10000);
      this.isProcessingFile = false;
      console.log("Filetype: " + typeof(file));
      throw Error('Selected File is not a .zip file!');
    }
  }

  /**
   * Add Go-to-Top button on Facebook service selection page
   * Author: Deepa (dbelvi@mail.upb.de)
   */
  
  @HostListener('window:scroll', []) onScroll(){
    this.pageYoffset = window.pageYOffset;
  }

  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
  }
        
}
