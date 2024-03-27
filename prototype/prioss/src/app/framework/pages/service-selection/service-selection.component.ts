import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, HostListener, inject,ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleRight } from '@fortawesome/free-regular-svg-icons';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { AppType } from './app-type';

import JSZip from 'jszip';
import { DBService } from '../../../db/db.service';

import { HttpClient } from '@angular/common/http';
import * as utilities from '../../../features/utils/generalUtilities.functions';
import { UserdataRepository } from '../../../db/data-repositories/general/userdata/userdata.repository';

// import { FacebookAddressBookRepository } from '../db/data-repositories/facebook/fb-other-personal-info/face_address_book.repo';
// import { FacebookSearchHistoryRepository } from '../db/data-repositories/facebook/fb-other-personal-info/face_search_history.repo';
import { Store } from '@ngxs/store';
import {
  SpotifyReadFromZip,
  SpotifyReset,
} from 'src/app/spotify/state/spotify.action';
import {
  ResetFbUserData,
  UpdateFbUserData,
} from '../../../facebook/state/fb.action';
import * as devicetypeUtils from '../../../features/utils/devicetype.functions';
import {
  InstaChatData,
  InstaChatPartnerData,
} from '../../../instagram/models/MessageInfo/InstaChatData';
import {
  ResetInstaUserData,
  UpdateInstaUserData,
} from '../../../instagram/state/insta.action';
import InstaUserDataModel from '../../../instagram/state/models/insta-user-data-model.interface';
import { InferredTopicsModel } from 'src/app/facebook/models/LoggedInformation/Topics/Topics';
import {
  FbActivityAcrossFacebookModel,
  FbAdsInformationModel,
  FbAppsAndWebsitesOffOfFacebookDataModel,
  FbConnectionsDataModel,
  FbLoggedInformationModel,
  FbPersonalInformationDataModel,
  FbPreferencesDataModel,
  FbSecurityLoginInformationDataModel,
  FbUserDataModel,
} from 'src/app/facebook/state/models';
import {
  AccountActivityModel,
  AccountStatusChangesModel,
  ActiveSessionsModel,
  AddressBookModel,
  AdvertiserInteractedModel,
  ConnectedAppsAndWebsitesModel,
  EventResponsesModel,
  GroupInteractionModel,
  GroupsJoinedModel,
  OffFacebookActivityModel,
  PeopleInteractionModel,
  ProfileInformationModel,
  ReceivedFriendRequestsModel,
  RejectedFriendRequestsModel,
  RemovedFriendsModel,
  SearchHistoryModel,
  SentFriendRequestsModel,
  YourFriendsModel,
  LoginsAndLogoutsModel,
  LastLoginInformationModel,
  IPAddressActivityModel,
  AdminRecordsModel,
  LastActivityModel as FacebookActivityHistoryModel,
  RecognizedDevicesModel,
  MobileDeviceModel,
  EmailAddressVerificationModel,
  RecentAccountRecoverySuccessesModel,
  DeviceLocationModel,
  PrimaryLocationModel,
  PeopleAndFriendsModel,
  FeedControlModel,
  FundraiserSettingsModel,
  VideoPreferenceModel,
  EventsInvitedModel,
  GroupCommentsModel,
  GroupsAdminedModel,
  GroupPostsModel,
  GroupBadgesModel,
  LocationTimezoneModel,
  NotificationModel,
  NotificationMetaPrivacyPolicyUpdateModel,
  EventInteractionModel,
  AdsInterestModel,
  ConsentModel,
  SurveyResponseModel,
  RecentlyVisitedModel,
  RecentlyViewedModel,
  PeopleYouMayKnowModel,
  RecentReportedConversionsModel,
  AdPreferencesModel,
  SubscriptionForNoAdsModel,
  OtherCategoriesUsedToReachYouModel,
  AdvertisersUsingYourDataModel,
  LanguageAndLocalesModel,
  ProfileInformationTimezoneModel,
  ArchivedThreadModel,
  InboxMessageModel,
  GroupMessageModel,
  MessageRequestModel,
  PrimaryPublicLocationModel,
  LoginProtectionDataModel,
} from 'src/app/facebook/models';
import { FeatureToggleService, Services } from 'src/app/features/feature-toggle/feature-toggle.service';
import { ReelsPreferenceModel } from 'src/app/facebook/models/Preferences/Preferences/ReelsPreference';
import { DevicePushSettingModel } from 'src/app/facebook/models/Preferences/Preferences/DevicePushSettings';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  #featureToggleService = inject(FeatureToggleService)

  progressBarPercent = 0;
  progressBarVisible = false;
  requestedAbortDataParsing = false;

  appType: typeof AppType = AppType;

  selectedServiceName: AppType;

  sampleDataPath = 'assets/sample-data/';
  sampleDataFilenameSpotify = 'spot_sampledata.zip';
  sampleDataFilenameFacebook = 'facebook_data_marcia_2023_12_20.zip';
  sampleDataFilenameInstagram = 'insta_sampledata.zip';

  errorMsg = '';

  constructor(
    private router: Router,
    //private notifyService: NotificationService,
    private UserdataRepo: UserdataRepository,
    private sqlDBService: DBService,
    private http: HttpClient,
    private scroll: ViewportScroller,
    private store: Store
  ) {}

  /**
   * Callback called by angular after the view is initialized. Triggers rebuilding of the sql database
   *
   * @author: Simon (scg@mail.upb.de)
   *
   */
  async ngAfterViewInit() {
    this.store.dispatch([
      new ResetInstaUserData(),
      new ResetFbUserData(),
      new SpotifyReset(),
    ]);
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
    this.uploadedFiles = event.target.files;
    this.setSelectedFileName(event.target.files[0].name);
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
          this.errorMsg =
            'Please select a valid zip-file that you downloaded from Instagram!';
          this.uploadDialogVisible = true;
        } else {
          this.setSelectedFileName(file.name);
        }
      } else if (selectedApp == this.appType.Spotify) {
        const foundFile = zip.files[spotIDFilename]; //TODO: this file check does not work yet, look at jszip docs
        if (foundFile == null) {
          this.errorMsg =
            'Please select a valid zip-file that you downloaded from Spotify!';
          this.uploadDialogVisible = true;
        } else {
          this.setSelectedFileName(file.name);
        }
      } else if (selectedApp == this.appType.Facebook) {
        const foundFile = zip.files[faceIDFilename];

        if (foundFile == null) {
          this.errorMsg =
            'Please select a valid zip-file that you downloaded from Facebook!';
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
    this.selectedFileName = filename;
  }

  /**
   *  Clears the error message when the error message box is clicked away by the user.
   *
   * @author: Simon (scg@mail.upb.de)
   *
   */
  afterCloseErrorMsg() {
    this.errorMsg = '';
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
      .get(sampleDataLocation, { responseType: 'blob' })
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
    this.isProcessingFile = true;
    this.uploadDialogVisible = false;
    await this.parseFile(this.selectedServiceName);
  }

  parseFacebookJSON(content: string): any {
    let result = {};
    try {
      result = JSON.parse(content);
      console.log('Result: ' + result);
      result = utilities.modifyStringValuesInJSON(result, utilities.fixFacebookEncoding)
      
    } catch (e) {
      console.error('Error parsing JSON: ' + e + ' ' + content);
      return {}; //return empty object if parsing fails
    }
    return result;
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
      await this.parseInstagramFileToSQLite();
    } else if (selectedApp == this.appType.Spotify) {
      await this.parseSpotifyFileToSQLite();
    } else if (selectedApp == this.appType.Facebook) {
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
    const userData: FbUserDataModel = {} as FbUserDataModel;

    // initialize sub-stores
    userData.activity_across_facebook = {} as FbActivityAcrossFacebookModel;
    userData.ads_and_businesses = {} as FbAdsInformationModel;
    userData.logged_information = {} as FbLoggedInformationModel;
    userData.personal_information = {} as FbPersonalInformationDataModel;
    userData.preferences = {} as FbPreferencesDataModel;
    userData.security_and_login_information =
      {} as FbSecurityLoginInformationDataModel;
    userData.apps_and_websites_off_of_fb =
      {} as FbAppsAndWebsitesOffOfFacebookDataModel;
    userData.connections = {} as FbConnectionsDataModel;

    const file = this.uploadedFiles[0];

    const zip: JSZip = await this.loadZipFile(file);

    this.isProcessingFile = true; //shows the processing icon on the button

    this.progressBarPercent = 0;
    this.progressBarVisible = true;
    const filepaths: string[] = Object.keys(zip.files).filter((path) => path.endsWith('.json'));
    for (let i = 0; i < filepaths.length; i++) {
      if (this.requestedAbortDataParsing) {
        this.requestedAbortDataParsing = false;
        return;
      }
      this.progressBarPercent = Math.round(100 * (i / filepaths.length));

      const filepath: string = filepaths[i];
      const filename: string | undefined = filepath
        .split('\\')
        .pop()
        ?.split('/')
        .pop();

      //console.log('Filename: ' + filename);

      
      const content: string = (await zip.files[filepath].async('string'));
      
      
      
      


      if (!filename) {
        continue;
      }
      //logged_information
      if (filename === 'your_topics.json') {
        const inferredTopics: InferredTopicsModel = this.parseFacebookJSON(content);
        userData.logged_information.inferred_topics = inferredTopics;
      } else if (filename === 'device_location.json') {
        const jsonData: DeviceLocationModel = this.parseFacebookJSON(content);
        userData.logged_information.device_location = jsonData;
      } else if (filename === 'primary_location.json') {
        const jsonData: PrimaryLocationModel = this.parseFacebookJSON(content);
        userData.logged_information.primary_location = jsonData;
      } else if (filename === 'primary_public_location.json') {
        const jsonData: PrimaryPublicLocationModel = this.parseFacebookJSON(content);
        userData.logged_information.primary_public_location = jsonData;
      } else if (filename === 'timezone.json') {
        if (filepath.includes('location')) {
          const jsonData: LocationTimezoneModel = this.parseFacebookJSON(content);
          userData.logged_information.timezone = jsonData;
        } else if (filepath.includes('profile')) {
          const jsonData: ProfileInformationTimezoneModel =
            this.parseFacebookJSON(content);
          userData.personal_information.timezone = jsonData;
        }
      } else if (filename === 'notifications.json') {
        const jsonData: NotificationModel = this.parseFacebookJSON(content);
        userData.logged_information.notifications = jsonData;
      } else if (
        filename === 'notification_of_meta_privacy_policy_update.json'
      ) {
        const jsonData: NotificationMetaPrivacyPolicyUpdateModel =
          this.parseFacebookJSON(content);
        userData.logged_information.meta_privacy_policy_update = jsonData;
      } else if (filename === 'events_interactions.json') {
        const jsonData: EventInteractionModel = this.parseFacebookJSON(content);
        userData.logged_information.event_interaction = jsonData;
      } else if (filename === 'ads_interests.json') {
        const jsonData: AdsInterestModel = this.parseFacebookJSON(content);
        userData.logged_information.ads_interest = jsonData;
      } else if (filename === 'consents.json') {
        const jsonData: ConsentModel = this.parseFacebookJSON(content);
        userData.logged_information.consents = jsonData;
      } else if (filename === 'survey_responses.json') {
        const jsonData: SurveyResponseModel = this.parseFacebookJSON(content);
        userData.logged_information.survey_responses = jsonData;
      } else if (filename === 'recently_visited.json') {
        const jsonData: RecentlyVisitedModel = this.parseFacebookJSON(content);
        userData.logged_information.recently_visited = jsonData;
      } else if (filename === 'recently_viewed.json') {
        const jsonData: RecentlyViewedModel = this.parseFacebookJSON(content);
        userData.logged_information.recently_viewed = jsonData;
      }
      //ads_information
      else if (filename === "advertisers_you've_interacted_with.json") {
        const jsonData: AdvertiserInteractedModel = this.parseFacebookJSON(content);
        userData.ads_and_businesses.advertiserInteracted = jsonData;
      } else if (filename === 'your_recent_reported_conversions.json') {
        const jsonData: RecentReportedConversionsModel =
          this.parseFacebookJSON(content);
        userData.ads_and_businesses.recentReportedConversions = jsonData;
      } else if (filename === 'ad_preferences.json') {
        const jsonData: AdPreferencesModel = this.parseFacebookJSON(content);
        userData.ads_and_businesses.adPreferences = jsonData;
      } else if (filename === 'subscription_for_no_ads.json') {
        const jsonData: SubscriptionForNoAdsModel = this.parseFacebookJSON(content);
        userData.ads_and_businesses.subscriptionsForNoAds = jsonData;
      } else if (filename === 'other_categories_used_to_reach_you.json') {
        const jsonData: OtherCategoriesUsedToReachYouModel =
          this.parseFacebookJSON(content);
        userData.ads_and_businesses.otherCategoriesUsedToReachYou = jsonData;
      } else if (
        filename === 'advertisers_using_your_activity_or_information.json'
      ) {
        const jsonData: AdvertisersUsingYourDataModel = this.parseFacebookJSON(content);
        userData.ads_and_businesses.advertisersUsingYourData = jsonData;
      } else if (filename === 'apps_and_websites.json') {
        // TODO missing from new sample data maybe depracted
      } else if (filename === 'connected_apps_and_websites.json') {
        const jsonData: ConnectedAppsAndWebsitesModel = this.parseFacebookJSON(content);
        userData.apps_and_websites_off_of_fb.connectedAppsAndWebsites =
          jsonData;
      } else if (filename === 'your_activity_off_meta_technologies.json') {
        const jsonData: OffFacebookActivityModel = this.parseFacebookJSON(content);
        userData.apps_and_websites_off_of_fb.offFacebookActivity = jsonData;
      }
      //connections
      else if (filename === 'received_friend_requests.json') {
        const receivedFriendRequests: ReceivedFriendRequestsModel =
          this.parseFacebookJSON(content);
        userData.connections.receivedFriendRequests = receivedFriendRequests;
      } else if (filename === 'sent_friend_requests.json') {
        const sentFriendRequests: SentFriendRequestsModel =
          this.parseFacebookJSON(content);
        userData.connections.sentFriendRequests = sentFriendRequests;
      } else if (filename === 'rejected_friend_requests.json') {
        const jsonData: RejectedFriendRequestsModel = this.parseFacebookJSON(content);
        userData.connections.rejectedFriendRequests = jsonData;
      } else if (filename === 'your_friends.json') {
        const jsonData: YourFriendsModel = this.parseFacebookJSON(content);
        userData.connections.yourFriends = jsonData;
      } else if (filename === 'removed_friends.json') {
        const jsonData: RemovedFriendsModel = this.parseFacebookJSON(content);
        userData.connections.removedFriends = jsonData;
      } else if (filename === "who_you've_followed.json") {
        const jsonData = this.parseFacebookJSON(content);
        userData.connections.followed = jsonData;
      } else if (filename === 'people_you_may_know.json') {
        const jsonData: PeopleYouMayKnowModel = this.parseFacebookJSON(content);
        userData.connections.peopleYouMayKnow = jsonData;
      } else if (filename === 'profile_information.json') {
        const jsonData: ProfileInformationModel = this.parseFacebookJSON(content);
        userData.personal_information.profile_information = jsonData;
        //TODO old version below may be useful in future
        /*
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
        */
      } else if (filename === 'your_address_books.json') {
        const jsonData: AddressBookModel = this.parseFacebookJSON(content);
        userData.personal_information.address_books = jsonData;
      } else if (filename === 'your_search_history.json') {
        const jsonData: SearchHistoryModel = this.parseFacebookJSON(content);
        userData.logged_information.search_history = jsonData;
      } else if (filename === 'account_status_changes.json') {
        const jsonData: AccountStatusChangesModel = this.parseFacebookJSON(content);
        userData.security_and_login_information.account_status_changes =
          jsonData;
      } else if (filename === 'people_and_friends.json') {
        const jsonData: PeopleInteractionModel = this.parseFacebookJSON(content);
        userData.logged_information.people_interaction = jsonData;
      } else if (filename === 'group_interactions.json') {
        const jsonData: GroupInteractionModel = this.parseFacebookJSON(content);
        userData.logged_information.group_interaction = jsonData;
      } else if (
        filename === 'your_posts__check_ins__photos_and_videos_1.json'
      ) {
        //TODO fix for new folder structure
      }

      //security_and_login_information
      else if (filename === 'logins_and_logouts.json') {
        const jsonData: LoginsAndLogoutsModel = this.parseFacebookJSON(content);
        userData.security_and_login_information.logins_and_logouts = jsonData;
      } else if (filename === 'account_activity.json') {
        const jsonData: AccountActivityModel = this.parseFacebookJSON(content);
        userData.security_and_login_information.account_activity = jsonData;
      } else if (filename === 'information_about_your_last_login.json') {
        const jsonData: LastLoginInformationModel = this.parseFacebookJSON(content);
        userData.security_and_login_information.last_login_information =
          jsonData;
      } else if (filename === 'ip_address_activity.json') {
        const jsonData: IPAddressActivityModel = this.parseFacebookJSON(content);
        userData.security_and_login_information.ip_address_activity = jsonData;
      } else if (filename === 'record_details.json') {
        const jsonData: AdminRecordsModel = this.parseFacebookJSON(content);
        userData.security_and_login_information.record_details = jsonData;
      } else if (filename === 'your_facebook_activity_history.json') {
        const jsonData: FacebookActivityHistoryModel = this.parseFacebookJSON(content);
        userData.security_and_login_information.facebook_activity_history =
          jsonData;
      } else if (filename === 'recognized_devices.json') {
        const jsonData: RecognizedDevicesModel = this.parseFacebookJSON(content);
        userData.security_and_login_information.recognized_devices = jsonData;
      } else if (filename === 'mobile_devices.json') {
        const jsonData: MobileDeviceModel = this.parseFacebookJSON(content);
        userData.security_and_login_information.mobile_devices = jsonData;
      } else if (filename === 'email_address_verifications.json') {
        const jsonData: EmailAddressVerificationModel = this.parseFacebookJSON(content);
        userData.security_and_login_information.email_address_verifications =
          jsonData;
      } else if (filename === 'login_protection_data.json') {
        const jsonData: LoginProtectionDataModel = this.parseFacebookJSON(content);
        userData.security_and_login_information.login_protection_data =
          jsonData;
      } else if (filename === 'your_recent_account_recovery_successes.json') {
        const jsonData: RecentAccountRecoverySuccessesModel =
          this.parseFacebookJSON(content);
        userData.security_and_login_information.recent_account_recovery_successes =
          jsonData;
      } else if (filename === 'where_you_re_logged_in.json') {
        const jsonData: ActiveSessionsModel = this.parseFacebookJSON(content);
        userData.security_and_login_information.login_location = jsonData;
      }
      //preferences
      else if (filename === 'feed.json') {
        const jsonData: PeopleAndFriendsModel = this.parseFacebookJSON(content);
        userData.preferences.feed = jsonData;
      } else if (filename === 'controls.json') {
        const jsonData: FeedControlModel = this.parseFacebookJSON(content);
        userData.preferences.feedControls = jsonData;
      } else if (filename === 'your_fundraiser_settings.json') {
        const jsonData: FundraiserSettingsModel = this.parseFacebookJSON(content);
        userData.preferences.fundraiserSettings = jsonData;
      } else if (filename === 'reels_preferences.json') {
        const jsonData: ReelsPreferenceModel = this.parseFacebookJSON(content);
        userData.preferences.reelsPreferences = jsonData;
      } else if (filename === 'video.json') {
        const jsonData: VideoPreferenceModel = this.parseFacebookJSON(content);
        userData.preferences.videoPreferences = jsonData;
      } else if (filename === 'your_device_push_settings.json') {
        const jsonData: DevicePushSettingModel = this.parseFacebookJSON(content);
        userData.preferences.devicePushSettings = jsonData;
      } else if (filename === 'language_and_locale.json') {
        const jsonData: LanguageAndLocalesModel = this.parseFacebookJSON(content);
        userData.preferences.languageAndLocales = jsonData;
      } else if (filename === 'your_story_highlights.json') {
        //TODO not implemented
      }

      //activity_across_facebook/groups
      else if (filename === 'your_badges.json') {
        const jsonData: GroupBadgesModel = this.parseFacebookJSON(content);
        userData.activity_across_facebook.groupBadges = jsonData;
      } else if (filename === 'your_group_membership_activity.json') {
        const jsonData: GroupsJoinedModel = this.parseFacebookJSON(content);
        userData.activity_across_facebook.groupsJoined = jsonData;
      } else if (filename === 'your_comments_in_groups.json') {
        const jsonData: GroupCommentsModel = this.parseFacebookJSON(content);
        userData.activity_across_facebook.groupComments = jsonData;
      } else if (filename === 'your_groups.json') {
        const jsonData: GroupsAdminedModel = this.parseFacebookJSON(content);
        userData.activity_across_facebook.groupsAdmined = jsonData;
      } else if (filename === 'group_posts_and_comments.json') {
        const jsonData: GroupPostsModel = this.parseFacebookJSON(content);
        userData.activity_across_facebook.groupPosts = jsonData;
      } else if (filename === 'your_event_responses.json') {
        const jsonData: EventResponsesModel = this.parseFacebookJSON(content);
        userData.activity_across_facebook.eventResponses = jsonData;
      } else if (filename === 'event_invitations.json') {
        const jsonData: EventsInvitedModel = this.parseFacebookJSON(content);
        userData.activity_across_facebook.eventsInvited = jsonData;
      } else if (filename === "events_you've_hidden.json") {
        const jsonData: EventsInvitedModel = this.parseFacebookJSON(content);
        userData.activity_across_facebook.eventsInvited = jsonData;
      } else if (filename === 'message_1.json'){
        if(filepath.includes('archived_threads')){
          const jsonData: ArchivedThreadModel = this.parseFacebookJSON(content);
          userData.activity_across_facebook.archivedThreads ??= [];
          userData.activity_across_facebook.archivedThreads?.push(jsonData);
        } else if(filepath.includes('inbox')){

          //check if message is group message or normal message
          if(content.includes('joinable_mode')){
            const jsonData: GroupMessageModel = this.parseFacebookJSON(content);
            //if groupmessages are nullish, set to empty array
            userData.activity_across_facebook.groupMessages ??= [];
            userData.activity_across_facebook.groupMessages?.push(jsonData);
          } else {
            const jsonData: InboxMessageModel = this.parseFacebookJSON(content);
            userData.activity_across_facebook.inboxMessages ??= [];
            userData.activity_across_facebook.inboxMessages?.push(jsonData);
          }
        } else if(filepath.includes('message_requests')){
          const jsonData: MessageRequestModel = this.parseFacebookJSON(content);
          userData.activity_across_facebook.messageRequests ??= [];
          userData.activity_across_facebook.messageRequests?.push(jsonData);
        }
      }
    }

    this.store.dispatch(new UpdateFbUserData(userData));

    this.progressBarPercent = 100;
    await delay(500);

    this.progressBarVisible = false;

    this.#featureToggleService.enableService(Services.Facebook)

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
      new SpotifyReadFromZip(await this.loadZipFile(this.uploadedFiles[0]))
    );

    if (this.requestedAbortDataParsing) {
      this.requestedAbortDataParsing = false;
      return;
    }

    this.progressBarPercent = 100;
    this.progressBarVisible = false;


    this.#featureToggleService.enableService(Services.Spotify)

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
        userData.personalInfo = {
          username: personalData?.Username?.value,
          email,
          gender,
          birthdate,
        };
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
          firstCloseFriendsStoryTime,
        };
      } else if (filename.startsWith('professional_information')) {
        const jsonData = JSON.parse(content);
        const profData = jsonData.profile_business[0];
        userData.professionalInfo = { title: profData.title };
      } else if (filename.startsWith('account_based_in')) {
        const jsonData = JSON.parse(content);
        const basedData =
          jsonData.inferred_data_primary_location[0].string_map_data;
        userData.basedInInfo = { accountBasedIn: basedData['City Name'].value };
      } else if (filename.startsWith('profile_changes')) {
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
          userData.profileChanges.push({
            title: profileData[i].title,
            changed,
            previous_value,
            new_value,
            change_date,
          });
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
            ),
          });
        }
      } else if (filename.startsWith('advertisers_using_your_activity')) {
        const jsonData = JSON.parse(content);
        const adsData = jsonData.ig_custom_audiences_all_types;
        userData.adsActivityInfo = [];
        for (let i = 0; i < adsData.length; i++) {
          userData.adsActivityInfo.push({
            advertiserName: adsData[i].advertiser_name,
            has_data_file_custom_audience:
              adsData[i].has_data_file_custom_audience,
            has_remarketing_custom_audience:
              adsData[i].has_remarketing_custom_audience,
            has_in_person_store_visit: adsData[i].has_in_person_store_visit,
          });
        }
      } else if (filename.startsWith('ads_clicked')) {
        const jsonData = JSON.parse(content);
        const adsClickedData = jsonData.impressions_history_ads_clicked;
        userData.adsClickedInfo = [];
        for (let i = 0; i < adsClickedData.length; i++) {
          userData.adsClickedInfo.push({
            title: adsClickedData[i].title,
            timestamp: adsClickedData[i].string_list_data[0].timestamp,
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
          userData.adsViewedInfo.push({ title: author, timestamp });
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
        userData.signUpInfo = {
          username,
          ip_address,
          timestamp: time,
          email,
          phone_number,
          device,
          color: 'blue',
        };
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
            type: 'Login',
            color: 'green',
            device: devicetypeUtils.getDeviceNameBasedOnUserAgent(user_agent),
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
          );
          userData.logoutInfo.push({
            user_agent,
            ip_address: utilities.getValueIgnoreCase(
              logoutData[i].string_map_data,
              'IP Address',
              false
            ),
            timestamp: utilities.getValueIgnoreCase(
              logoutData[i].string_map_data,
              'Time',
              true
            ),
            type: 'Logout',
            color: 'red',
            device: devicetypeUtils.getDeviceNameBasedOnUserAgent(user_agent),
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
            timestamp: likedComments[i].string_list_data[0].timestamp,
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
            contactInformation:
              contactsData[i].string_map_data['Contact information'].value,
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
            timestamp: mappingData.Time.timestamp,
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
            timestamp: mappingData.Time.timestamp,
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
            timestamp: mappingData.Time.timestamp,
          });
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
          userData.followerInfo.push({
            instaProfileURL,
            instaAccountName,
            timestamp,
          });
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
          userData.followingInfo.push({
            instaProfileURL,
            instaAccountName,
            timestamp,
          });
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
          userData.blockedInfo.push({
            instaProfileURL,
            instaAccountName,
            timestamp,
          });
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
            ),
          });
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
          const instaAccountName =
            recentFollowData[i].string_list_data[0].value;
          userData.recentFollowInfo.push({
            instaProfileURL,
            instaAccountName,
            timestamp,
          });
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
          const instaAccountName =
            pendingFollowData[i].string_list_data[0].value;
          userData.pendingFollowRequestInfo.push({
            instaProfileURL,
            instaAccountName,
            timestamp,
          });
        }
      }
      //add recently unfollowed accounts information
      else if (filename.startsWith('recently_unfollowed_accounts')) {
        const jsonData = JSON.parse(content);
        const recentlyUnfollowData = jsonData.relationships_unfollowed_users;
        userData.recentlyUnfollowedInfo = [];
        for (let i = 0; i < recentlyUnfollowData.length; i++) {
          const instaProfileURL =
            recentlyUnfollowData[i].string_list_data[0].href;
          const timestamp =
            recentlyUnfollowData[i].string_list_data[0].timestamp;
          const instaAccountName =
            recentlyUnfollowData[i].string_list_data[0].value;
          userData.recentlyUnfollowedInfo.push({
            instaProfileURL,
            instaAccountName,
            timestamp,
          });
        }
      }

      //add removed suggestion information
      else if (filename.startsWith('removed_suggestions')) {
        const jsonData = JSON.parse(content);
        const removedSuggestionData =
          jsonData.relationships_dismissed_suggested_users;
        userData.removedSuggestionInfo = [];
        for (let i = 0; i < removedSuggestionData.length; i++) {
          const instaProfileURL =
            removedSuggestionData[i].string_list_data[0].href;
          const timestamp =
            removedSuggestionData[i].string_list_data[0].timestamp;
          const instaAccountName =
            removedSuggestionData[i].string_list_data[0].value;
          userData.removedSuggestionInfo.push({
            instaProfileURL,
            instaAccountName,
            timestamp,
          });
        }
      }

      //add received follow request information
      else if (filename.startsWith("follow_requests_you've_received")) {
        const jsonData = JSON.parse(content);
        const receivedRequestData =
          jsonData.relationships_follow_requests_received;
        userData.receivedFollowRequestInfo = [];
        for (let i = 0; i < receivedRequestData.length; i++) {
          const instaProfileURL =
            receivedRequestData[i].string_list_data[0].href;
          const timestamp =
            receivedRequestData[i].string_list_data[0].timestamp;
          const instaAccountName =
            receivedRequestData[i].string_list_data[0].value;
          userData.receivedFollowRequestInfo.push({
            instaProfileURL,
            instaAccountName,
            timestamp,
          });
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
            ),
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
                otherMessagesPerUser[message.sender_name].avg +
                message.content.length) /
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
          chatData.otherMessages.push(
            otherMessagesPerUser[otherMessagesPerUserKey]
          );
        }
        userData.chatData.push(chatData);
      }
    }

    if (this.requestedAbortDataParsing) {
      this.requestedAbortDataParsing = false;
      return;
    }

    this.store.dispatch(new UpdateInstaUserData(userData));

    this.progressBarPercent = 100;
    await delay(500);

    this.progressBarVisible = false;

    this.#featureToggleService.enableService(Services.Instagram)

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
      this.errorMsg =
        'The file you selected is not a zip-file. Please select the zip file you downloaded from ' +
        this.selectedServiceName;
      this.uploadDialogVisible = true;
      this.isProcessingFile = false;
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
