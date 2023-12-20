import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleRight } from '@fortawesome/free-regular-svg-icons';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { AppType } from './app-type';

import * as JSZip from 'jszip';
import { DBService } from '../../../db/db.service';

import { HttpClient } from '@angular/common/http';
import * as utilities from '../../../features/utils/generalUtilities.functions';


import {
  FacebookAdsInteractedRepository
} from '../../../db/data-repositories/facebook/fb-ads-data/face-ads-interacted.repo';
import {
  FacebookAppsWebsitesRepository
} from '../../../db/data-repositories/facebook/fb-ads-data/face-apps-websites.repo';
import {
  FacebookOffFacebookActivityRepository
} from '../../../db/data-repositories/facebook/fb-ads-data/face-off-facebook-activity.repo';
import { FacebookFriendsRepository } from '../../../db/data-repositories/facebook/fb-friends-data/face_friends.repo';
import {
  InferredTopicsRepository
} from '../../../db/data-repositories/facebook/fb-inferred-data/face_inferred_topics.repo';
import { FacebookPostsRepository } from '../../../db/data-repositories/facebook/fb-posts/face-posts.repo';
import { UserdataRepository } from '../../../db/data-repositories/general/userdata/userdata.repository';

// import { FacebookAddressBookRepository } from '../db/data-repositories/facebook/fb-other-personal-info/face_address_book.repo';
// import { FacebookSearchHistoryRepository } from '../db/data-repositories/facebook/fb-other-personal-info/face_search_history.repo';
import { Store } from "@ngxs/store";
import { SpotifyReadFromZip, SpotifyReset } from 'src/app/spotify/state/spotify.action';
import { FacebookEventsRepository } from '../../../db/data-repositories/facebook/fb-groups-events-info/face_events.repo';
import { FacebookGroupsRepository } from '../../../db/data-repositories/facebook/fb-groups-events-info/face_groups.repo';
import {
  FaceBookMessagesInfoRepository
} from '../../../db/data-repositories/facebook/fb-messages-data/fb-messages-friends.repo';
import {
  FaceBookGroupMessagesInfoRepository
} from '../../../db/data-repositories/facebook/fb-messages-data/fb-messages-groups.repo';
import {
  FacebookAddressBookRepository
} from '../../../db/data-repositories/facebook/fb-other-personal-info/face-address-book.repo';
import {
  FacebookSearchHistoryRepository
} from '../../../db/data-repositories/facebook/fb-other-personal-info/face-search-history.repo';
import {
  FacebookAccountActivityRepository
} from '../../../db/data-repositories/facebook/fb-security-login-data/face_account_activity.repo';
import {
  FacebookAccountStatusChangesRepository
} from '../../../db/data-repositories/facebook/fb-security-login-data/face_account_status_changes.repo';
import {
  FacebookLoginLocationsRepository
} from '../../../db/data-repositories/facebook/fb-security-login-data/face_login_locations.repo';
import {
  FacebookLoginLogoutsRepository
} from '../../../db/data-repositories/facebook/fb-security-login-data/face_login_logouts.repo';
import { ResetFbUserData } from "../../../facebook/state/fb.action";
import * as devicetypeUtils from "../../../features/utils/devicetype.functions";
import { InstaChatData, InstaChatPartnerData } from "../../../instagram/models/MessageInfo/InstaChatData";
import { ResetInstaUserData, UpdateInstaUserData } from "../../../instagram/state/insta.action";
import InstaUserDataModel from "../../../instagram/state/models/insta-user-data-model.interface";
//service identifier filenames
const instaIDFilename = 'TODO';
const spotIDFilename = 'MyData/Read_Me_First.pdf';
const faceIDFilename = 'index.html';

/*
 * Use this inline function to wait for the specified number of milliseconds inside an async function by waiting for it:
 * await delay(2000);
 *
 * @author: Simon (scg@mail.upb.de)
 */
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

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
  styleUrls: ['./service-selection.component.less'],
})
export class ServiceSelectionComponent implements AfterViewInit {
  //Icon properties
  faCircleRight = faCircleRight;
  faArrowRotateRight = faArrowRotateRight;
  isProcessingFile = false;
  pageYoffset = 0;

  //file upload
  uploadedFiles: File[] = [];
  selectedFileName = '';
  uploadDialogVisible = false;

  progressBarPercent = 0;
  progressBarVisible = false;
  requestedAbortDataParsing = false;

  appType: typeof AppType = AppType;

  selectedServiceName: AppType;

  sampleDataPath = 'assets/sample-data/';
  sampleDataFilenameSpotify = 'spot_sampledata.zip';
  sampleDataFilenameFacebook = 'face_sampledata.zip';
  sampleDataFilenameInstagram = 'insta_sampledata.zip';

  errorMsg = "";

  constructor(
    private router: Router,
    //private notifyService: NotificationService,
    private UserdataRepo: UserdataRepository,
    private sqlDBService: DBService,
    private http: HttpClient,
    private inferredTopicsDataRepo: InferredTopicsRepository,
    private faceAdsInteractedRepo: FacebookAdsInteractedRepository,
    private faceAppsAndWebsitesRepo: FacebookAppsWebsitesRepository,
    private faceOffFacebookActivityRepo: FacebookOffFacebookActivityRepository,
    private scroll: ViewportScroller,
    private faceFriendsRepo: FacebookFriendsRepository,
    private faceLoginLocationsRepo: FacebookLoginLocationsRepository,
    private faceLoginLogoutsRepo: FacebookLoginLogoutsRepository,
    private faceAccStatusChangesRepo: FacebookAccountStatusChangesRepository,
    private faceAccActivityRepo: FacebookAccountActivityRepository,
    private faceAddressRepo: FacebookAddressBookRepository,
    private faceSearchhistoryRepo: FacebookSearchHistoryRepository,
    private facePostsRepo: FacebookPostsRepository,
    private faceEventsRepo: FacebookEventsRepository,
    private faceGroupsRepo: FacebookGroupsRepository,
    private faceMessagesRepo: FaceBookMessagesInfoRepository,
    private faceGroupMessagesRepo: FaceBookGroupMessagesInfoRepository,
    private store: Store
  ) {
  }

    /**
     * Callback called by angular after the view is initialized. Triggers rebuilding of the sql database
     *
     * @author: Simon (scg@mail.upb.de)
     *
     */
    async ngAfterViewInit() {
        this.store.dispatch([new ResetInstaUserData(), new ResetFbUserData(), new SpotifyReset()])
        await this.sqlDBService.rebuildDatabase();
    }

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
    console.log('ABORTING DATA-DOWNLOAD PARSING');
    await this.sqlDBService.rebuildDatabase();
    //this.router.navigate(["home"]);
  }

  /**
   * Callback called when pressing the X-button in the upload file dialog.
   *
   * @author: Simon (scg@mail.upb.de)
   *
   */
  async abortDataUpload() {
    this.uploadedFiles = [];
    this.uploadDialogVisible = false;
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

    // this.validateFiles(this.selectedServiceName); //TODO: Pass selected File
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
    const file = this.uploadedFiles[0];

    this.loadZipFile(file).then((zip: any) => {
      if (selectedApp == this.appType.Instagram) {
        const foundFile = zip.files[instaIDFilename];

        if (foundFile == null) {
          this.errorMsg = 'Please select a valid zip-file that you downloaded from Instagram!';
          this.uploadDialogVisible = true;
        } else {
          this.setSelectedFileName(file.name);
        }
      } else if (selectedApp == this.appType.Spotify) {
        const foundFile = zip.files[spotIDFilename]; //TODO: this file check does not work yet, look at jszip docs
        if (foundFile == null) {
          this.errorMsg = 'Please select a valid zip-file that you downloaded from Spotify!';
          this.uploadDialogVisible = true;
        } else {
          this.setSelectedFileName(file.name);
        }
      } else if (selectedApp == this.appType.Facebook) {
        const foundFile = zip.files[faceIDFilename];

        if (foundFile == null) {
          this.errorMsg = 'Please select a valid zip-file that you downloaded from Facebook!';
          this.uploadDialogVisible = true;
        } else {
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
    console.log('enabling file selection prompt: ' + filename);
    this.selectedFileName = filename;
  }

  /**
   *  Clears the error message when the error message box is clicked away by the user.
   *
   * @author: Simon (scg@mail.upb.de)
   *
   */
  afterCloseErrorMsg() {
    this.errorMsg = "";
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

    let sampleDataLocation = '';
    if (this.selectedServiceName == this.appType.Instagram) {
      sampleDataLocation =
        this.sampleDataPath + this.sampleDataFilenameInstagram;
    } else if (this.selectedServiceName == this.appType.Spotify) {
      sampleDataLocation = this.sampleDataPath + this.sampleDataFilenameSpotify;
    } else if (this.selectedServiceName == this.appType.Facebook) {
      sampleDataLocation =
        this.sampleDataPath + this.sampleDataFilenameFacebook;
    } else {
      throw Error(
        'The selected Service Name is not a known service. Selected: ' +
        this.selectedServiceName
      );
    }

    this.progressBarPercent = 0;
    this.progressBarVisible = true;

    //download needed sample data from server (comes precached when pwa functionality works)
    this.http
      .get(sampleDataLocation, {responseType: 'blob'})
      .subscribe((sampleData) => {
        this.uploadedFiles = [];
        this.uploadedFiles[0] = new File([sampleData], 'sample_data.zip', {
          type: 'application/zip',
        });

        //trigger the normal file upload
        this.onClickedExploreData();
      });
  }

  /**
   * Callback that opens up the data upload dialog.
   *
   * @author: Simon (scg@mail.upb.de)
   *
   */
  async openDataUploadDialog() {
    this.uploadDialogVisible = true;
  }

  /**
   * Event callback that is called when the user clicks the explore data button
   * This callback starts the process of parsing the datadownload by calling the parseFile method for the selected service
   *
   * @author: Simon (scg@mail.upb.de)
   *
   */
  async onClickedExploreData() {
    console.log('Clicked explore data');

    this.isProcessingFile = true;
    this.uploadDialogVisible = false;
    await this.parseFile(this.selectedServiceName);

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
      console.log('Parsing Instagram file...');
      await this.parseInstagramFileToSQLite();
    } else if (selectedApp == this.appType.Spotify) {
      await this.parseSpotifyFileToSQLite();
    } else if (selectedApp == this.appType.Facebook) {
      console.log('Parsing Facebook file...');
      await this.parseFacebookFileToSQLite();
    }
  }

  /*
   * Service Specific File Parsing Methods
   */

  /**
   * Parses the uploaded Facebook data-download-zip file into the SQLite database
   *
   * @author: Rashida (rbharmal@mail.upb.de), Rishma (rishmamn@mail.uni-paderborn.de)
   *
   */
  async parseFacebookFileToSQLite() {
    const file = this.uploadedFiles[0];

    const zip: JSZip = await this.loadZipFile(file);

    this.isProcessingFile = true; //shows the processing icon on the button

    this.progressBarPercent = 0;
    this.progressBarVisible = true;

    const filepaths: string[] = Object.keys(zip.files);
    for (let i = 0; i < filepaths.length; i++) {
      if (this.requestedAbortDataParsing) {
        this.requestedAbortDataParsing = false;
        return;
      }
      this.progressBarPercent = Math.round(100 * (i / filepaths.length));

      const filepath: string = filepaths[i];
      const content: string = await zip.files[filepath].async('string');
      const filename: string | undefined = filepath
        .split('\\')
        .pop()
        ?.split('/')
        .pop();

      if (!filename) {
        continue;
      }
      console.log('Opening: ' + filename);

      if (filename === 'your_topics.json') {
        console.log('Parsing: ' + filename);

        const jsonData = JSON.parse(content);
        const inferredTopics = jsonData.inferred_topics_v2;
        await this.inferredTopicsDataRepo.addInferredTopics(
          inferredTopics[0],
          inferredTopics.length
        );

        for (let i = 1; i < inferredTopics.length; i++) {
          await this.inferredTopicsDataRepo.addBulkInferredTopicsEntry(
            inferredTopics[i]
          );
        }
      } else if (filename === "advertisers_you've_interacted_with.json") {
        console.log('file---', filename);
        const jsonData = JSON.parse(content);
        const adsInteractedWithData = jsonData.history_v2;

        await this.faceAdsInteractedRepo.startAdsClickedBulkAdd(
          adsInteractedWithData[0].title,
          adsInteractedWithData[0].action,
          adsInteractedWithData[0].timestamp,
          adsInteractedWithData.length
        );
        for (let i = 1; i < adsInteractedWithData.length; i++) {
          await this.faceAdsInteractedRepo.addAdsClickedBulkEntry(
            adsInteractedWithData[i].title,
            adsInteractedWithData[i].action,
            adsInteractedWithData[0].timestamp
          );
        }
        console.log('repoads', this.faceAdsInteractedRepo);
      } else if (filename === 'apps_and_websites.json') {
        console.log('fileapps---', filename);
        const jsonData = JSON.parse(content);
        const appsAndWebsiteData = jsonData.installed_apps_v2;

        await this.faceAppsAndWebsitesRepo.startAdActivityBulkAdd(
          appsAndWebsiteData[0].name,
          appsAndWebsiteData[0].added_timestamp,
          appsAndWebsiteData[0].user_app_scoped_id,
          appsAndWebsiteData[0].category,
          appsAndWebsiteData[0].removed_timestamp,
          appsAndWebsiteData.length
        );
        for (let i = 1; i < appsAndWebsiteData.length; i++) {
          await this.faceAppsAndWebsitesRepo.addAdActivityBulkEntry(
            appsAndWebsiteData[i].name,
            appsAndWebsiteData[i].added_timestamp,
            appsAndWebsiteData[i].user_app_scoped_id,
            appsAndWebsiteData[i].category,
            appsAndWebsiteData[i].removed_timestamp
          );
        }
      } else if (filename === "connected_apps_and_websites.json") {
        console.log("fileapps---", filename)
        const jsonData = JSON.parse(content);
        const appsAndWebsiteData = jsonData.installed_apps_v2;

        await this.faceAppsAndWebsitesRepo.startAdActivityBulkAdd(appsAndWebsiteData[0].name, appsAndWebsiteData[0].added_timestamp, appsAndWebsiteData[0].user_app_scoped_id, appsAndWebsiteData[0].category, appsAndWebsiteData[0].removed_timestamp, appsAndWebsiteData.length);
        for (let i = 1; i < appsAndWebsiteData.length; i++) {
          await this.faceAppsAndWebsitesRepo.addAdActivityBulkEntry(appsAndWebsiteData[i].name, appsAndWebsiteData[i].added_timestamp, appsAndWebsiteData[i].user_app_scoped_id, appsAndWebsiteData[i].category, appsAndWebsiteData[i].removed_timestamp);
        }
      } else if (filename === "your_off-facebook_activity.json") {
        console.log("fileoff---", filename)
        const jsonData = JSON.parse(content);
        const offfacebookActivityData = jsonData.off_facebook_activity_v2;

        await this.faceOffFacebookActivityRepo.startAdActivityBulkAdd(
          offfacebookActivityData[0].name,
          offfacebookActivityData[0].events,
          offfacebookActivityData[0].events[0].type,
          offfacebookActivityData.length
        );
        for (let i = 1; i < offfacebookActivityData.length; i++) {
          await this.faceOffFacebookActivityRepo.addAdActivityBulkEntry(
            offfacebookActivityData[i].name,
            offfacebookActivityData[i].events,
            offfacebookActivityData[i].events[0].type
          );
        }
        console.log('data', offfacebookActivityData);
      } else if (filename === 'received_friend_requests.json') {
        console.log('fileoff---', filename);
        const jsonData = JSON.parse(content);
        const friendRequestsRecieved = jsonData.received_requests_v2;

        await this.faceFriendsRepo.startAdActivityBulkAdd(
          friendRequestsRecieved[0].name,
          friendRequestsRecieved[0].timestamp,
          '#requestsReceived',
          friendRequestsRecieved.length
        );
        for (let i = 1; i < friendRequestsRecieved.length; i++) {
          await this.faceFriendsRepo.addAdActivityBulkEntry(
            friendRequestsRecieved[i].name,
            friendRequestsRecieved[i].timestamp,
            '#requestsReceived'
          );
        }
      } else if (filename === "sent_friend_requests.json") {
        console.log("fileoff---", filename)
        const jsonData = JSON.parse(content);
        const friendRequestsSent = jsonData.sent_requests_v2;

        await this.faceFriendsRepo.startAdActivityBulkAdd(
          friendRequestsSent[0].name,
          friendRequestsSent[0].timestamp,
          '#requestsSent',
          friendRequestsSent.length
        );
        for (let i = 1; i < friendRequestsSent.length; i++) {
          await this.faceFriendsRepo.addAdActivityBulkEntry(
            friendRequestsSent[i].name,
            friendRequestsSent[i].timestamp,
            '#requestsSent'
          );
        }
      } else if (filename === "your_friends.json") {
        console.log("fileoff---", filename)
        const jsonData = JSON.parse(content);
        const friends = jsonData.friends_v2;

        await this.faceFriendsRepo.startAdActivityBulkAdd(
          friends[0].name,
          friends[0].timestamp,
          '#friends',
          friends.length
        );
        for (let i = 1; i < friends.length; i++) {
          await this.faceFriendsRepo.addAdActivityBulkEntry(
            friends[i].name,
            friends[i].timestamp,
            '#friends'
          );
        }
      } else if (filename === 'rejected_friend_requests.json') {
        console.log('fileoff---', filename);
        const jsonData = JSON.parse(content);
        const rejectedFriends = jsonData.rejected_requests_v2;

        await this.faceFriendsRepo.startAdActivityBulkAdd(
          rejectedFriends[0].name,
          rejectedFriends[0].timestamp,
          '#rejectedFriends',
          rejectedFriends.length
        );
        for (let i = 1; i < rejectedFriends.length; i++) {
          await this.faceFriendsRepo.addAdActivityBulkEntry(
            rejectedFriends[i].name,
            rejectedFriends[i].timestamp,
            '#rejectedFriends'
          );
        }
      } else if (filename === 'removed_friends.json') {
        console.log('fileoff---', filename);
        const jsonData = JSON.parse(content);
        const removedFriends = jsonData.deleted_friends_v2;

        await this.faceFriendsRepo.startAdActivityBulkAdd(
          removedFriends[0].name,
          removedFriends[0].timestamp,
          '#removedFriends',
          removedFriends.length
        );
        for (let i = 1; i < removedFriends.length; i++) {
          await this.faceFriendsRepo.addAdActivityBulkEntry(
            removedFriends[i].name,
            removedFriends[i].timestamp,
            '#removedFriends'
          );
        }
      } else if (filename === "who_you've_followed.json") {
        console.log("fileoff---", filename)
        const jsonData = JSON.parse(content);
        const following = jsonData.following_v3;

        await this.faceFriendsRepo.startAdActivityBulkAdd(
          following[0].name,
          following[0].timestamp,
          '#following',
          following.length
        );
        for (let i = 1; i < following.length; i++) {
          await this.faceFriendsRepo.addAdActivityBulkEntry(
            following[i].name,
            following[i].timestamp,
            '#following'
          );
        }
      } else if (filename === 'profile_information.json') {
        const jsonData = JSON.parse(content);
        const personal_data = jsonData.profile_v2;
        const birthdate = personal_data.birthday;
        const formattedBirthdate = `${birthdate.day
          .toString()
          .padStart(2, '0')}-${birthdate.month.toString().padStart(2, '0')}-${
          birthdate.year
        }`;
        await this.UserdataRepo.addUserdata(
          personal_data.name.full_name,
          personal_data.emails.emails[0],
          personal_data.current_city ? personal_data.current_city.name : '',
          formattedBirthdate,
          personal_data.gender.gender_option,
          0,
          0,
          '',
          '',
          ''
        );
      } else if (filename === 'your_address_books.json') {
        const jsonData = JSON.parse(content);
        const address_book = jsonData.address_book_v2.address_book;

        const name = address_book[0].name;
        const contact_point = address_book[0].details[0]
          ? address_book[0].details[0].contact_point
          : '';
        const created_timestamp = address_book[0].created_timestamp;
        await this.faceAddressRepo.startAddressBookBulkAdd(
          name,
          contact_point,
          created_timestamp,
          address_book.length
        );

        for (let i = 1; i < address_book.length; i++) {
          const name = address_book[i].name;
          const contact_point = address_book[i].details[0]
            ? address_book[i].details[0].contact_point
            : '';
          const created_timestamp = address_book[i].created_timestamp;
          await this.faceAddressRepo.addAddressBookBulkEntry(
            name,
            contact_point,
            created_timestamp
          );
        }
      } else if (filename === 'your_search_history.json') {
        const jsonData = JSON.parse(content);
        const search_history = jsonData.searches_v2;

        const text = search_history[0].data[0].text;
        const timestamp = search_history[0].timestamp;
        await this.faceSearchhistoryRepo.startSearchHistoryBulkAdd(
          text,
          timestamp,
          search_history.length
        );

        for (let i = 1; i < search_history.length; i++) {
          const text = search_history[i].data[0].text;
          const timestamp = search_history[i].timestamp;
          await this.faceSearchhistoryRepo.addSearchHistoryBulkEntry(
            text,
            timestamp
          );
        }
      } else if (filename === 'where_you_re_logged_in.json') {
        const jsonData = JSON.parse(content);
        const login_locations = jsonData.active_sessions_v2;
        console.log('Parsing ****************:', filename);
        console.log('Parsing name to data ****************:', login_locations);
        console.log(login_locations);

        await this.faceLoginLocationsRepo.startAdActivityBulkAdd(
          login_locations[0].location,
          login_locations[0].device,
          login_locations[0].created_timestamp,
          login_locations.length
        );
        for (let i = 1; i < login_locations.length; i++) {
          await this.faceLoginLocationsRepo.addAdActivityBulkEntry(
            login_locations[i].location,
            login_locations[i].device,
            login_locations[i].created_timestamp
          );
        }
      } else if (filename === 'logins_and_logouts.json') {
        const jsonData = JSON.parse(content);
        const logins_logouts = jsonData.account_accesses_v2;

        await this.faceLoginLogoutsRepo.startAdActivityBulkAdd(
          logins_logouts[0].action,
          logins_logouts[0].timestamp,
          logins_logouts.length
        );
        for (let i = 1; i < logins_logouts.length; i++) {
          await this.faceLoginLogoutsRepo.addAdActivityBulkEntry(
            logins_logouts[i].action,
            logins_logouts[i].timestamp
          );
        }
      } else if (filename === 'event_invitations.json') {
        const jsonData = JSON.parse(content);
        const events_invited = jsonData.events_invited_v2;

        await this.faceEventsRepo.startAdActivityBulkAdd(
          events_invited[0].name,
          events_invited[0].start_timestamp,
          events_invited[0].end_timestamp,
          events_invited.length
        );
        for (let i = 1; i < events_invited.length; i++) {
          await this.faceEventsRepo.addAdActivityBulkEntry(
            events_invited[i].name,
            events_invited[i].start_timestamp,
            events_invited[i].end_timestamp
          );
        }
      }
        // else if(filename === "your_event_responses.json") {
        //   let jsonData = JSON.parse(content);
        //   let _events_responses = jsonData.event_responses_v2;
        //   let events_responses = _events_responses.events_joined[0];

        //   await this.faceEventsRepo.startAdActivityBulkAdd(events_responses[0].name, events_responses[0].start_timestamp, events_responses[0].end_timestamp, events_responses.length);
        //   for(let i = 1; i < events_responses.events_joined.length; i++) {
        //     await this.faceEventsRepo.addAdActivityBulkEntry(events_responses[i].name, events_responses[i].start_timestamp, events_responses[i].end_timestamp);
        //   }
      // }
      else if (filename === 'your_group_membership_activity.json') {
        const jsonData = JSON.parse(content);
        const groups_joined = jsonData.groups_joined_v2;

        await this.faceGroupsRepo.startAdActivityBulkAdd(
          groups_joined[0].data[0].name,
          groups_joined[0].timestamp,
          groups_joined.length
        );

        for (let i = 1; i < groups_joined.length; i++) {
          const groupName = groups_joined[i]?.data?.[0]?.name || '';

          if (groupName) {
            await this.faceGroupsRepo.addAdActivityBulkEntry(
              groupName,
              groups_joined[i]?.timestamp);
          } else {
            console.log("groupName is either null or empty. Handling it with an empty string.");
          }
        }
      } else if (filename === 'account_status_changes.json') {
        const jsonData = JSON.parse(content);
        const acc_status_changes = jsonData.account_status_changes_v2;

        await this.faceAccStatusChangesRepo.startAdActivityBulkAdd(
          acc_status_changes[0].status,
          acc_status_changes[0].timestamp,
          acc_status_changes.length
        );
        for (let i = 1; i < acc_status_changes.length; i++) {
          await this.faceAccStatusChangesRepo.addAdActivityBulkEntry(
            acc_status_changes[i].status,
            acc_status_changes[i].timestamp
          );
        }
      } else if (filename === 'account_activity.json') {
        const jsonData = JSON.parse(content);
        const account_activity_data = jsonData.account_activity_v2;

        await this.faceAccActivityRepo.startAdActivityBulkAdd(
          account_activity_data[0].action,
          account_activity_data[0].timestamp,
          account_activity_data[0].city,
          account_activity_data[0].region,
          account_activity_data[0].country,
          account_activity_data[0].site_name,
          account_activity_data.length
        );
        for (let i = 1; i < account_activity_data.length; i++) {
          await this.faceAccActivityRepo.addAdActivityBulkEntry(
            account_activity_data[i].action,
            account_activity_data[i].timestamp,
            account_activity_data[i].city,
            account_activity_data[i].region,
            account_activity_data[i].country,
            account_activity_data[i].site_name
          );
        }
      } else if (filename === 'people_and_friends.json') {
        const jsonData = JSON.parse(content);
        const people_friends_messages_data = jsonData.people_interactions_v2;

        if (people_friends_messages_data.length > 0) {
          const entries = people_friends_messages_data[0].entries;
          await this.faceMessagesRepo.startMessagesBulkAdd(
            entries[0].data.name,
            entries[0].timestamp,
            entries[0].data.uri,
            entries.length
          );

          for (let i = 1; i < entries.length; i++) {
            const entry = entries[i];
            const name = entry.data.name;
            const timestamp = entry.timestamp;
            const uri = entry.data.uri;
            await this.faceMessagesRepo.addMessagesBulkEntry(
              name,
              timestamp,
              uri
            );
          }
        }
      } else if (filename === 'group_interactions.json') {
        const jsonData = JSON.parse(content);
        const group_messages_data = jsonData.group_interactions_v2;

        if (group_messages_data.length > 0) {
          const entries = group_messages_data[0].entries;
          await this.faceGroupMessagesRepo.startGroupMessagesBulkAdd(
            entries[0].data.name,
            entries[0].data.value,
            entries.length
          );

          for (let i = 1; i < entries.length; i++) {
            const entry = entries[i];
            const name = entry.data.name;
            const value = entry.data.value;
            await this.faceGroupMessagesRepo.addGroupMessagesBulkEntry(
              name,
              value
            );
          }
        }
      } else if (filename === "your_posts__check_ins__photos_and_videos_1.json") {
        const jsonData = JSON.parse(content);
        const posts = jsonData;

        const timestamp = posts[0].timestamp;
        const title = posts[0].title;
        const post = posts[0].data.length > 0 ? posts[0].data[0].post : "Added a photo";
        await this.facePostsRepo.startPostsBulkAdd(timestamp, title, post, posts.length);

        for (let i = 1; i < posts.length; i++) {
          const title = posts[i].title ? posts[i].title : "Updated timeline";
          const timestamp = posts[i].timestamp;
          const post = posts[i].data.length > 0 ? posts[i].data[0].post : "Added a photo";
          await this.facePostsRepo.addPostsBulkEntry(timestamp, title, post);
        }
      }
    }

    this.progressBarPercent = 100;
    await delay(500);

    this.progressBarVisible = false;
    this.router.navigate(['face/dashboard']);
  }

  /*
   * Service Specific File Parsing Methods
   */

  /**
   * Parses the uploaded Spotify data-download-zip file into the SQLite database
   */
  async parseSpotifyFileToSQLite() {
    this.progressBarPercent = 0;
    this.isProcessingFile = true;
    this.progressBarVisible = true;

    this.store.dispatch(
      new SpotifyReadFromZip(
        await this.loadZipFile(this.uploadedFiles[0])
      )
    );

    if (this.requestedAbortDataParsing) {
      this.requestedAbortDataParsing = false;
      return;
    }

    this.progressBarPercent = 100;
    this.progressBarVisible = false;
    this.router.navigate(['spot', 'dashboard']);
  }

  /**
   * Parses the uploaded Instagram data-download-zip file into the SQLite database
   *
   * @author: Paul (pasch@mail.upb.de)
   *
   */
  async parseInstagramFileToSQLite() {
    const userData: InstaUserDataModel = {} as InstaUserDataModel;
    userData.chatData = [];
    const start = Date.now();

    const file = this.uploadedFiles[0];

    const zip: JSZip = await this.loadZipFile(file);

    this.isProcessingFile = true; //shows the processing icon on the button

    this.progressBarPercent = 0;
    this.progressBarVisible = true;

    const filepaths: string[] = Object.keys(zip.files);
    for (let i = 0; i < filepaths.length; i++) {
      if (this.requestedAbortDataParsing) {
        this.requestedAbortDataParsing = false;
        return;
      }

      this.progressBarPercent = Math.round(100 * (i / filepaths.length));

      const filepath: string = filepaths[i];
      console.log(filepath);
      const content: string = await zip.files[filepath].async('string');
      const filename: string | undefined = filepath
        .split('\\')
        .pop()
        ?.split('/')
        .pop();
      console.log(filename);

      if (!filename) {
        continue;
      }

      console.log('Opening: ' + filename);

      //add personal information
      if (filename.startsWith('personal_information')) {
        const jsonData = JSON.parse(content);
        const personalData = jsonData.profile_user[0].string_map_data;
        // Email Handling
        let email = '';
        if (personalData.Email !== undefined) {
          email = personalData.Email.value;
        } else if (personalData['Email address'] !== undefined) {
          email = utilities.getValueIgnoreCase(
            personalData,
            'Email address',
            false
          );
        }

        const gender = utilities.getValueIgnoreCase(
          personalData,
          'Gender',
          false
        );
        const birthdate = utilities.getValueIgnoreCase(
          personalData,
          'Date of birth',
          false
        );
        userData.personalInfo = {username: personalData?.Username?.value, email, gender, birthdate};
      } else if (filename.startsWith('account_information')) {
        const jsonData = JSON.parse(content);
        const accountData =
          jsonData.profile_account_insights[0].string_map_data;

        const contactSyncing = utilities.getValueIgnoreCase(
          accountData,
          'Contact Syncing',
          false
        );
        const firstCountryCode = utilities.getValueIgnoreCase(
          accountData,
          'First Country Code',
          false
        );
        const hasSharedLiveVideo = utilities.getValueIgnoreCase(
          accountData,
          'Has Shared Live Video',
          false
        );
        const lastLogin = utilities.getValueIgnoreCase(
          accountData,
          'Last Login',
          true
        );
        const lastLogout = utilities.getValueIgnoreCase(
          accountData,
          'Last Logout',
          true
        );
        const firstStoryTime = utilities.getValueIgnoreCase(
          accountData,
          'First Story Time',
          true
        );
        const lastStoryTime = utilities.getValueIgnoreCase(
          accountData,
          'Last Story Time',
          true
        );
        const firstCloseFriendsStoryTime = utilities.getValueIgnoreCase(
          accountData,
          'First Close Friends Story Time',
          true
        );
        userData.accountInfo = {
          contactSyncing,
          firstCountryCode,
          hasSharedLiveVideo,
          lastLogin,
          lastLogout,
          firstStoryTime,
          lastStoryTime,
          firstCloseFriendsStoryTime
        };
      } else if (filename.startsWith('professional_information')) {
        const jsonData = JSON.parse(content);
        const profData = jsonData.profile_business[0];
        userData.professionalInfo = {title: profData.title};
      } else if (filename.startsWith("account_based_in")) {
        const jsonData = JSON.parse(content);
        const basedData = jsonData.inferred_data_primary_location[0].string_map_data;
        userData.basedInInfo = {accountBasedIn: basedData["City Name"].value};
      } else if (filename.startsWith("profile_changes")) {
        const jsonData = JSON.parse(content);
        const profileData = jsonData.profile_profile_change;
        userData.profileChanges = [];
        for (let i = 0; i < profileData.length; i++) {
          const changed = profileData[i].string_map_data.Changed.value;
          const previous_value = utilities.getValueIgnoreCase(
            profileData[i].string_map_data,
            'Previous Value',
            false
          );
          const new_value = utilities.getValueIgnoreCase(
            profileData[i].string_map_data,
            'New Value',
            false
          );
          const change_date = utilities.getValueIgnoreCase(
            profileData[i].string_map_data,
            'Change Date',
            true
          );
          userData.profileChanges.push({title: profileData[i].title, changed, previous_value, new_value, change_date});
        }
      }
      //add ads related data
      else if (filename.startsWith('ads_interests')) {
        const jsonData = JSON.parse(content);
        const adsInterestData = jsonData.inferred_data_ig_interest;
        userData.adsInterestInfo = [];
        for (let i = 0; i < adsInterestData.length; i++) {
          userData.adsInterestInfo.push({
            interest: utilities.getValueIgnoreCase(
              adsInterestData[i].string_map_data,
              'Interest',
              false
            )
          });
        }
      } else if (filename.startsWith('advertisers_using_your_activity')) {
        const jsonData = JSON.parse(content);
        const adsData = jsonData.ig_custom_audiences_all_types;
        userData.adsActivityInfo = [];
        for (let i = 0; i < adsData.length; i++) {
          userData.adsActivityInfo.push({
            advertiserName: adsData[i].advertiser_name,
            has_data_file_custom_audience: adsData[i].has_data_file_custom_audience,
            has_remarketing_custom_audience: adsData[i].has_remarketing_custom_audience,
            has_in_person_store_visit: adsData[i].has_in_person_store_visit
          })
        }
      } else if (filename.startsWith('ads_clicked')) {
        const jsonData = JSON.parse(content);
        const adsClickedData = jsonData.impressions_history_ads_clicked;
        userData.adsClickedInfo = [];
        for (let i = 0; i < adsClickedData.length; i++) {
          userData.adsClickedInfo.push({
            title: adsClickedData[i].title,
            timestamp: adsClickedData[i].string_list_data[0].timestamp
          });
        }
      } else if (filename.startsWith('ads_viewed')) {
        const jsonData = JSON.parse(content);
        const adsViewedData = jsonData.impressions_history_ads_seen;
        userData.adsViewedInfo = [];

        const author = utilities.getValueIgnoreCase(
          adsViewedData[0].string_map_data,
          'Author',
          false
        );
        const timestamp = utilities.getValueIgnoreCase(
          adsViewedData[0].string_map_data,
          'Time',
          true
        );
        for (let i = 0; i < adsViewedData.length; i++) {
          userData.adsViewedInfo.push({title: author, timestamp});
        }
      } else if (filename.startsWith('signup_information.json')) {
        const jsonData = JSON.parse(content);
        const signup_data =
          jsonData.account_history_registration_info[0].string_map_data;

        const username = utilities.getValueIgnoreCase(
          signup_data,
          'Username',
          false
        );
        const ip_address = utilities.getValueIgnoreCase(
          signup_data,
          'IP Address',
          false
        );
        const time = utilities.getValueIgnoreCase(signup_data, 'Time', true);
        const email = utilities.getValueIgnoreCase(signup_data, 'Email', false);
        const phone_number = utilities.getValueIgnoreCase(
          signup_data,
          'Phone Number',
          false
        );
        const device = utilities.getValueIgnoreCase(
          signup_data,
          'Device',
          false
        );
        userData.signUpInfo = {username, ip_address, timestamp: time, email, phone_number, device, color: 'blue'};
      } else if (filename.startsWith('login_activity.json')) {
        const jsonData = JSON.parse(content);
        const loginData = jsonData.account_history_login_history;
        userData.loginInfo = [];
        for (let i = 0; i < loginData.length; i++) {
          const user_agent = utilities.getValueIgnoreCase(
            loginData[i].string_map_data,
            'User Agent',
            false
          );
          userData.loginInfo.push({
            ip_address: utilities.getValueIgnoreCase(
              loginData[i].string_map_data,
              'IP Address',
              false
            ),
            timestamp: utilities.getValueIgnoreCase(
              loginData[i].string_map_data,
              'Time',
              true
            ),
            user_agent,
            type: "Login",
            color: "green",
            device: devicetypeUtils.getDeviceNameBasedOnUserAgent(user_agent)
          });
        }
      } else if (filename.startsWith('logout_activity.json')) {
        const jsonData = JSON.parse(content);
        const logoutData = jsonData.account_history_logout_history;
        userData.logoutInfo = [];
        for (let i = 0; i < logoutData.length; i++) {
          const user_agent = utilities.getValueIgnoreCase(
            logoutData[i].string_map_data,
            'User Agent',
            false
          )
          userData.logoutInfo.push({
            user_agent, ip_address: utilities.getValueIgnoreCase(
              logoutData[i].string_map_data,
              'IP Address',
              false
            ),
            timestamp: utilities.getValueIgnoreCase(
              logoutData[i].string_map_data,
              'Time',
              true
            ),
            type: "Logout",
            color: "red",
            device: devicetypeUtils.getDeviceNameBasedOnUserAgent(user_agent)
          });
        }
      } else if (filename.startsWith('liked_comments')) {
        const jsonData = JSON.parse(content);
        const likedComments = jsonData.likes_comment_likes;
        userData.likedCommentsInfo = [];
        for (let i = 0; i < likedComments.length; i++) {
          userData.likedCommentsInfo.push({
            user: likedComments[i].title,
            href_link: likedComments[i].string_list_data[0].href,
            timestamp: likedComments[i].string_list_data[0].timestamp
          });
        }
      } else if (filename.startsWith('liked_posts')) {
        const jsonData = JSON.parse(content);
        const likedPosts = jsonData.likes_media_likes;
        userData.likedPostsInfo = [];
        for (let i = 0; i < likedPosts.length; i++) {
          userData.likedPostsInfo.push({
            user: likedPosts[i].title,
            href_link: likedPosts[i].string_list_data[0].href,
            timestamp: likedPosts[0].string_list_data[0].timestamp,
          });
        }
      } else if (filename.startsWith('synced_contacts')) {
        const jsonData = JSON.parse(content);
        const contactsData = jsonData.contacts_contact_info;
        userData.contactInfo = [];
        for (let i = 0; i < contactsData.length; i++) {
          userData.contactInfo.push({
            firstName: contactsData[i].string_map_data['First name'].value,
            surname: contactsData[i].string_map_data['Surname'].value,
            contactInformation: contactsData[i].string_map_data['Contact information'].value
          });
        }
      }
      //searches related data
      else if (filename.startsWith('account_searches')) {
        const jsonData = JSON.parse(content);
        const searchData = jsonData.searches_user;
        userData.userSearch = [];
        for (let i = 0; i < searchData.length; i++) {
          const mappingData = searchData[i].string_map_data;
          userData.userSearch.push({
            search: mappingData.Search.value,
            timestamp: mappingData.Time.timestamp
          });
        }
      } else if (filename.startsWith('word_or_phrase_searches')) {
        const jsonData = JSON.parse(content);
        const searchData = jsonData.searches_keyword;
        userData.keywordSearch = [];
        for (let i = 0; i < searchData.length; i++) {
          const mappingData = searchData[i].string_map_data;
          userData.keywordSearch.push({
            search: mappingData.Search.value,
            timestamp: mappingData.Time.timestamp
          });
        }
      } else if (filename.startsWith('tag_searches')) {
        const jsonData = JSON.parse(content);
        const searchData = jsonData.searches_hashtag;
        userData.tagSearch = [];
        for (let i = 0; i < searchData.length; i++) {
          const mappingData = searchData[i].string_map_data;
          userData.tagSearch.push({
            search: mappingData.Search.value,
            timestamp: mappingData.Time.timestamp
          })
        }
      }
      //add follower information
      else if (filename.startsWith('followers_1')) {
        const jsonData = JSON.parse(content);
        userData.followerInfo = [];
        for (let i = 0; i < jsonData.length; i++) {
          const instaProfileURL = jsonData[i].string_list_data[0].href;
          const timestamp = jsonData[i].string_list_data[0].timestamp;
          const instaAccountName = jsonData[i].string_list_data[0].value;
          userData.followerInfo.push({instaProfileURL, instaAccountName, timestamp});
        }
      }
      //add following information
      else if (filename.startsWith('following')) {
        const jsonData = JSON.parse(content);
        const followingData = jsonData.relationships_following;
        userData.followingInfo = [];
        for (let i = 0; i < followingData.length; i++) {
          const instaProfileURL = followingData[i].string_list_data[0].href;
          const timestamp = followingData[i].string_list_data[0].timestamp;
          const instaAccountName = followingData[i].string_list_data[0].value;
          userData.followingInfo.push({instaProfileURL, instaAccountName, timestamp});
        }
      }
      //add blocked information
      else if (filename.startsWith('blocked_accounts')) {
        const jsonData = JSON.parse(content);
        const blockedData = jsonData.relationships_blocked_users;
        userData.blockedInfo = [];
        for (let i = 0; i < blockedData.length; i++) {
          const instaProfileURL = blockedData[i].string_list_data[0].href;
          const timestamp = blockedData[i].string_list_data[0].timestamp;
          const instaAccountName = blockedData[i].title;
          userData.blockedInfo.push({instaProfileURL, instaAccountName, timestamp});
        }
      }
      //Shopping related information
      else if (filename.startsWith('recently_viewed_items.json')) {
        const jsonData = JSON.parse(content);
        const shoppingData = jsonData.checkout_saved_recently_viewed_products;
        userData.shoppingInfo = [];
        for (let i = 0; i < shoppingData.length; i++) {
          userData.shoppingInfo.push({
            merchantName: utilities.getValueIgnoreCase(
              shoppingData[i].string_map_data,
              'Merchant Name',
              false
            ),
            productName: utilities.getValueIgnoreCase(
              shoppingData[i].string_map_data,
              'Product Name',
              false
            )
          })
        }
      }
      //Shopping wishlist related information
      else if (filename.startsWith('wishlist_items.json')) {
        const jsonData = JSON.parse(content);
        const shoppingWishListData = jsonData.checkout_saved_products;
        userData.shoppingWishlistInfo = [];
        for (let i = 0; i < shoppingWishListData.length; i++) {
          userData.shoppingWishlistInfo.push({
            productName: utilities.getValueIgnoreCase(
              shoppingWishListData[i].string_map_data,
              'Product Name',
              false
            ),
            merchantName: utilities.getValueIgnoreCase(
              shoppingWishListData[i].string_map_data,
              'Merchant Name',
              false
            ),
          });
        }
      }

      //add recent follow information
      else if (filename.startsWith('recent_follow_requests')) {
        const jsonData = JSON.parse(content);
        const recentFollowData =
          jsonData.relationships_permanent_follow_requests;
        userData.recentFollowInfo = [];
        for (let i = 0; i < recentFollowData.length; i++) {
          const instaProfileURL = recentFollowData[i].string_list_data[0].href;
          const timestamp = recentFollowData[i].string_list_data[0].timestamp;
          const instaAccountName = recentFollowData[i].string_list_data[0].value;
          userData.recentFollowInfo.push({instaProfileURL, instaAccountName, timestamp});
        }
      }
      //add pending follow request information
      else if (filename.startsWith('pending_follow_requests')) {
        const jsonData = JSON.parse(content);
        const pendingFollowData = jsonData.relationships_follow_requests_sent;
        userData.pendingFollowRequestInfo = [];
        for (let i = 0; i < pendingFollowData.length; i++) {
          const instaProfileURL = pendingFollowData[i].string_list_data[0].href;
          const timestamp = pendingFollowData[i].string_list_data[0].timestamp;
          const instaAccountName = pendingFollowData[i].string_list_data[0].value;
          userData.pendingFollowRequestInfo.push({instaProfileURL, instaAccountName, timestamp});
        }
      }
      //add recently unfollowed accounts information
      else if (filename.startsWith('recently_unfollowed_accounts')) {
        const jsonData = JSON.parse(content);
        const recentlyUnfollowData = jsonData.relationships_unfollowed_users;
        userData.recentlyUnfollowedInfo = [];
        for (let i = 0; i < recentlyUnfollowData.length; i++) {
          const instaProfileURL = recentlyUnfollowData[i].string_list_data[0].href;
          const timestamp = recentlyUnfollowData[i].string_list_data[0].timestamp;
          const instaAccountName = recentlyUnfollowData[i].string_list_data[0].value;
          userData.recentlyUnfollowedInfo.push({instaProfileURL, instaAccountName, timestamp});
        }
      }

      //add removed suggestion information
      else if (filename.startsWith('removed_suggestions')) {
        const jsonData = JSON.parse(content);
        const removedSuggestionData =
          jsonData.relationships_dismissed_suggested_users;
        userData.removedSuggestionInfo = [];
        for (let i = 0; i < removedSuggestionData.length; i++) {
          const instaProfileURL = removedSuggestionData[i].string_list_data[0].href;
          const timestamp = removedSuggestionData[i].string_list_data[0].timestamp;
          const instaAccountName = removedSuggestionData[i].string_list_data[0].value;
          userData.removedSuggestionInfo.push({instaProfileURL, instaAccountName, timestamp});
        }
      }

      //add received follow request information
      else if (filename.startsWith("follow_requests_you've_received")) {
        const jsonData = JSON.parse(content);
        const receivedRequestData =
          jsonData.relationships_follow_requests_received;
        userData.receivedFollowRequestInfo = [];
        for (let i = 0; i < receivedRequestData.length; i++) {
          const instaProfileURL = receivedRequestData[i].string_list_data[0].href;
          const timestamp = receivedRequestData[i].string_list_data[0].timestamp;
          const instaAccountName = receivedRequestData[i].string_list_data[0].value;
          userData.receivedFollowRequestInfo.push({instaProfileURL, instaAccountName, timestamp});
        }
      }

      //your topic data
      else if (filename.startsWith('your_topics')) {
        const jsonData = JSON.parse(content);
        const yourTopicData = jsonData.topics_your_topics;
        userData.topicsInfo = [];
        for (let i = 0; i < yourTopicData.length; i++) {
          userData.topicsInfo.push({
            topic: utilities.getValueIgnoreCase(
              yourTopicData[i].string_map_data,
              'Name',
              false
            )
          });
        }
      }

      //ChatDataInformation
      else if (filename.startsWith('message_1')) {
        const jsonData = JSON.parse(content);
        const otherMessagesPerUser: { [id: string]: InstaChatPartnerData } = {};
        jsonData.participants.forEach((participant: any) => {
          otherMessagesPerUser[participant.name] = {
            sender: participant.name,
            messages: 0,
            avg: 0,
            text: 0,
            share: 0,
            audio: 0,
            photos: 0,
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0,
            sunday: 0,
          };
        });
        jsonData.messages.forEach((message: any) => {
          if (message.content == undefined) {
            return;
          }
          if (otherMessagesPerUser[message.sender_name] == undefined) {
            otherMessagesPerUser[message.sender_name] = {
              sender: message.sender_name,
              messages: 0,
              avg: 0,
              text: 0,
              share: 0,
              audio: 0,
              photos: 0,
              monday: 0,
              tuesday: 0,
              wednesday: 0,
              thursday: 0,
              friday: 0,
              saturday: 0,
              sunday: 0,
            };
          }
          otherMessagesPerUser[message.sender_name].messages++;

          if (message.share != undefined) {
            otherMessagesPerUser[message.sender_name].share++;
          } else if (message.audio_files != undefined) {
            otherMessagesPerUser[message.sender_name].audio++;
          } else if (message.photos != undefined) {
            otherMessagesPerUser[message.sender_name].photos++;
          } else {

            otherMessagesPerUser[message.sender_name].avg =
              (otherMessagesPerUser[message.sender_name].text *
                otherMessagesPerUser[message.sender_name].avg + message.content.length) /
              (otherMessagesPerUser[message.sender_name].text + 1);

            otherMessagesPerUser[message.sender_name].text++;
          }

          switch (new Date(message.timestamp_ms).getDay()) {
            case 0:
              otherMessagesPerUser[message.sender_name].sunday++;
              break;
            case 1:
              otherMessagesPerUser[message.sender_name].monday++;
              break;
            case 2:
              otherMessagesPerUser[message.sender_name].tuesday++;
              break;
            case 3:
              otherMessagesPerUser[message.sender_name].wednesday++;
              break;
            case 4:
              otherMessagesPerUser[message.sender_name].thursday++;
              break;
            case 5:
              otherMessagesPerUser[message.sender_name].friday++;
              break;
            case 6:
              otherMessagesPerUser[message.sender_name].saturday++;
              break;
          }
        });
        const yourName =
          jsonData.participants[jsonData.participants.length - 1].name;
        const chatData: InstaChatData = {
          chat: jsonData.title,
          yourMessages: otherMessagesPerUser[yourName].messages,
          monday: otherMessagesPerUser[yourName].monday,
          tuesday: otherMessagesPerUser[yourName].tuesday,
          wednesday: otherMessagesPerUser[yourName].wednesday,
          thursday: otherMessagesPerUser[yourName].thursday,
          friday: otherMessagesPerUser[yourName].friday,
          saturday: otherMessagesPerUser[yourName].saturday,
          sunday: otherMessagesPerUser[yourName].sunday,
          otherMessages: [],
        };
        delete otherMessagesPerUser[yourName];
        for (const otherMessagesPerUserKey in otherMessagesPerUser) {
          chatData.otherMessages.push(otherMessagesPerUser[otherMessagesPerUserKey])
        }
        userData.chatData.push(chatData);
      }
    }

    if (this.requestedAbortDataParsing) {
      this.requestedAbortDataParsing = false;
      return;
    }

    this.store.dispatch(new UpdateInstaUserData(userData));


    const end = Date.now();
    console.log(
      `Data-download files parsed and data inserted in: ${end - start} ms`
    );

    this.progressBarPercent = 100;
    await delay(500);

    this.progressBarVisible = false;
    this.router.navigate(['insta/dashboard']);
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
    if (typeof file == 'undefined') {
      //Show error: you didn't upload a zip file
      this.errorMsg = 'Please select a data-download zip-file first!';
      this.uploadDialogVisible = true;
      this.isProcessingFile = false;
      throw Error('No File selected!');
    }

    if (
      file.type == 'application/zip' ||
      file.type == 'application/x-zip-compressed'
    ) {
      const zip = new JSZip();
      return await zip.loadAsync(file);
    } else {
      //Show error: you didn't upload a zip file
      this.errorMsg = 'The file you selected is not a zip-file. Please select the zip file you downloaded from ' + this.selectedServiceName;
      this.uploadDialogVisible = true;
      this.isProcessingFile = false;
      console.log('Filetype: ' + typeof file);
      throw Error('Selected File is not a .zip file!');
    }
  }

  /**
   * Add Go-to-Top button on Facebook service selection page
   * Author: Deepa (dbelvi@mail.upb.de)
   */

  @HostListener('window:scroll', []) onScroll() {
    this.pageYoffset = window.pageYOffset;
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

  InstaDataDownload = 0;
  instructionTextInstaDataDownload =
    'Log in to your account, or use this Instagram Website link- https://www.instagram.com/ and enter your log in details.';
  instructionPictureInstaDataDownload =
    '../../assets/images/insta-instructions/login.png';

  /**
   * Callback function to decrement the "InstaDataDownload" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  preInstaDataDownload(): void {
    this.InstaDataDownload -= 1;
    this.changeInstaDataDownload();
  }

  /**
   * Callback function to increment the "InstaDataDownload" variable.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  nextInstaDataDownload(): void {
    this.InstaDataDownload += 1;
    this.changeInstaDataDownload();
  }

  /**
   * This method shows the instruction text and picture for Instagram user to download their personal data.
   * @author: Aayushma (aayushma@mail.uni-paderborn.de)
   *
   */
  changeInstaDataDownload(): void {
    switch (this.InstaDataDownload) {
      case 0: {
        this.instructionTextInstaDataDownload =
          'Log in to your account, or use this Instagram Website link- https://www.instagram.com/ and enter your log in details.';
        this.instructionPictureInstaDataDownload =
          '../../assets/images/insta-instructions/login.png';
        break;
      }
      case 1: {
        this.instructionTextInstaDataDownload =
          'Now go to "More" option in the bottom-left corner.';
        this.instructionPictureInstaDataDownload =
          '../../assets/images/insta-instructions/31.png';
        break;
      }
      case 2: {
        this.instructionTextInstaDataDownload = 'Select "Your activity" option';
        this.instructionPictureInstaDataDownload =
          '../../assets/images/insta-instructions/32.png';
        break;
      }
      case 3: {
        this.instructionTextInstaDataDownload =
          'On the page, now click on "Download your information" option.';
        this.instructionPictureInstaDataDownload =
          '../../assets/images/insta-instructions/33.png';
        break;
      }
      case 4: {
        this.instructionTextInstaDataDownload =
          'Verify your e-mail address. Select "JSON format" and click on "Next".';
        this.instructionPictureInstaDataDownload =
          '../../assets/images/insta-instructions/34.png';
        break;
      }
      case 5: {
        this.instructionTextInstaDataDownload =
          'Before you go to the final step of requesting your data, make sure that the website is set to English. You can change that on the bottom of the screen. It is necessary to analyze your data correcty and after requesting your data you can switch back to your favorite language.';
        this.instructionPictureInstaDataDownload =
          '../../assets/images/insta-instructions/35.png';
        break;
      }
      case 6: {
        this.instructionTextInstaDataDownload =
          'Enter your account password and click "Request Download".';
        this.instructionPictureInstaDataDownload =
          '../../assets/images/insta-instructions/36.png';
        break;
      }
      default: {
        this.instructionTextInstaDataDownload = 'Error';
      }
    }
  }
}
