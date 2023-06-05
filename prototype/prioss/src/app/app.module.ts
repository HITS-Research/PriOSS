import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { NgxIndexedDBModule,DBConfig } from 'ngx-indexed-db';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

import { SQLiteService } from './services/sqlite/sqlite.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { ServiceSelectionComponent } from './service-selection/service-selection.component';
import { FaceDashboardComponent } from './dashboards/face-dashboard/face-dashboard.component';
import { InstaDashboardComponent } from './dashboards/insta-dashboard/insta-dashboard.component';
import {Insta_PersonalInfoComponent} from './visualizations/instagram/Insta_personal-info/personal-info.component';
import { InstaAccountCreationLoginComponent } from './visualizations/instagram/insta-account-creation-login/insta-account-creation-login.component';
import { InstaAdsComponent } from './visualizations/instagram/insta-ads/insta-ads.component';
import { SpotDashboardComponent } from './dashboards/spot-dashboard/spot-dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';//free icon library for buttons etc
import { MoodComponent } from './visualizations/spotify/mood/mood.component';
import { NotificationComponent } from './notification/notification.component';
import { GeneralDataComponent } from './visualizations/all/general-data/general-data.component';
import { PreviewTileComponent } from './visualizations/all/preview-tile/preview-tile.component';
import { ListeningTimeComponent } from './visualizations/spotify/listening-time/listening-time.component';
import { InferencesComponent } from './visualizations/spotify/inferences/inferences.component';
import { TopArtistsComponent } from './visualizations/spotify/top-artists/top-artists.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { de_DE } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import de from '@angular/common/locales/de';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule } from "./ng-zorro-antd.module";
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzProgressModule } from 'ng-zorro-antd/progress'
import { AboutComponent } from './info-pages/about/about.component';
import { ContactComponent } from './info-pages/contact/contact.component';
import { InferredTopicsComponent } from './visualizations/facebook/inferred-topics/inferred-topics.component';
import { AdsRelatedDataComponent } from './visualizations/facebook/ads-related-data/ads-related-data.component';
import { FriendAndFollowersComponent } from './visualizations/facebook/friend-and-followers/friend-and-followers.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { TopSongsComponent } from './visualizations/spotify/top-songs/top-songs.component';
import { SettingsFormComponent } from './visualizations/all/privacy-settings-judge/settings-form/settings-form.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { HelpButtonComponent } from './help-button/help-button/help-button.component';
import { IntrojsService } from './introjs/introjs.service';
import { OffFacebookActivityComponent } from './rectification/facebook/off-facebook-activity/off-facebook-activity.component';
import { DBService } from './services/db/db.service';
import { SpotHistoryRepository } from './db/data-repositories/spotify/spot-history/spot-history.repository';
import { UserdataRepository } from './db/data-repositories/general/userdata/userdata.repository';
import { InferencesRepository } from './db/data-repositories/general/inferences/inferences.repository';
import { InstaPersonalRepository } from './db/data-repositories/instagram/insta-personal-info/insta-personal.repository';
import { InstaAdsActivityRepository } from './db/data-repositories/instagram/insta-ads/insta-ads-activity.repository';
import { InstaAdsInterestRepository } from './db/data-repositories/instagram/insta-ads/insta-ads-interest.repository';
import { InstaAdsClickedRepository } from './db/data-repositories/instagram/insta-ads/insta-ads-clicked.repository';
import { InstaAdsViewedRepository } from './db/data-repositories/instagram/insta-ads/insta-ads-viewed.repository';
import { InferredTopicsRepository } from './db/data-repositories/facebook/fb-inferred-data/face_inferred_topics.repo';
import { TitleBarComponent } from './page-sub-components/title-bar/title-bar.component';

registerLocaleData(de);

// Ahead of time compiles requires an exported function for factories
export function migrationFactory()
{
  return {
    2: (_db: any, transaction: any) => {
      //this defines which new indexes (= table-columns) were added to which previously existing tables in version 2
      //you dont need to mention completely new tables & their indexes
      const store = transaction.objectStore('all/userdata');
      store.createIndex('country', 'country', { unique: false });
      store.createIndex('birthdate', 'birthdate', { unique: false });
      store.createIndex('gender', 'gender', { unique: false });
      store.createIndex('mobileNumber', 'mobileNumber', { unique: false });
      store.createIndex('mobileOperator', 'mobileOperator', { unique: false });
      store.createIndex('mobileBrand', 'mobileBrand', { unique: false });
      store.createIndex('creationTime', 'creationTime', { unique: false });
    },
    //add new version upgrades here
  };
}

//This dbConfig defines the datalayout for the IndexedDB database that is used to store the content of the datadownload
//When adding new stores to the database, increase the version number
const dbConfig: DBConfig  =
{
  name: 'priossDB',
  version: 12,
  objectStoresMeta:
  [
    //Data relevant to all services
    {
      store: 'all/userdata',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'username', keypath: 'username', options: { unique: false } },
        { name: 'email', keypath: 'email', options: { unique: false } },
        { name: 'firstname', keypath: 'firstname', options: { unique: false } },
        { name: 'lastname', keypath: 'lastname', options: { unique: false } },
        { name: 'country', keypath: 'country', options: { unique: false } },
        { name: 'birthdate', keypath: 'birthdate', options: { unique: false } },
        { name: 'gender', keypath: 'gender', options: { unique: false } },
        { name: 'postalCode', keypath: 'postalCode', options: { unique: false } },
        { name: 'mobileNumber', keypath: 'mobileNumber', options: { unique: false } },
        { name: 'mobileOperator', keypath: 'mobileOperator', options: { unique: false } },
        { name: 'mobileBrand', keypath: 'mobileBrand', options: { unique: false } },
        { name: 'creationTime', keypath: 'creationTime', options: { unique: false } },
      ]
    },
    //spotify specific data
    {
      store: 'spot/userdata',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'createdFromFacebook', keypath: 'createdFromFacebook', options: { unique: false } },
      ]
    },
    {
      store: 'spot/inferences',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'inference', keypath: 'inference', options: { unique: false } },
      ]
    },
    {
      store: 'spot/library/tracks',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'artist', keypath: 'artist', options: { unique: false } },
        { name: 'album', keypath: 'album', options: { unique: false } },
        { name: 'track', keypath: 'track', options: { unique: false } },
        { name: 'uri', keypath: 'uri', options: { unique: false } },
      ]
    },
    {
      store: 'spot/history',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'endTime', keypath: 'endTime', options: { unique: false } },
        { name: 'artistName', keypath: 'artistName', options: { unique: false } },
        { name: 'trackName', keypath: 'trackName', options: { unique: false } },
        { name: 'msPlayed', keypath: 'msPlayed', options: { unique: false } },
      ]
    },
    {
      store: 'spot/library/albums',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'artist', keypath: 'artist', options: { unique: false } },
        { name: 'album', keypath: 'album', options: { unique: false } },
        { name: 'uri', keypath: 'uri', options: { unique: false } },
      ]
    },
    //instagram specific data
    //data regarding ads
    {
      store: 'insta/ads_interests',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'interest', keypath: 'interest', options: { unique: false } },
      ]
    },
    {
      store: 'insta/advertisers_using_your_activity_or_information',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'advertiser_name', keypath: 'advertiser_name', options: { unique: false } },
        { name: 'has_data_file_custom_audience', keypath: 'has_data_file_custom_audience', options: { unique: false } },
        { name: 'has_remarketing_custom_audience', keypath: 'has_remarketing_custom_audience', options: { unique: false } },
        { name: 'has_in_person_store_visit', keypath: 'has_in_person_store_visit', options: { unique: false } },
      ]
    },
    {
      store: 'insta/ads_viewed',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'author', keypath: 'author', options: { unique: false } },
        { name: 'timestamp', keypath: 'timestamp', options: { unique: false } },
      ]
    },
    {
      store: 'insta/ads_clicked',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'title', keypath: 'title', options: { unique: false } },
        { name: 'timestamp', keypath: 'timestamp', options: { unique: false } },
      ]
    },
    //data ragarding login and account creation
    {
      store: 'insta/last_known_location',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'imprecise_latitude', keypath: 'imprecise_latitude', options: { unique: false } },
        { name: 'imprecise_longitude', keypath: 'imprecise_longitude', options: { unique: false } },
        { name: 'time_uploaded', keypath: 'time_uploaded', options: { unique: false } },
      ]
    },
    {
      store: 'insta/login_activity',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'title', keypath: 'title', options: { unique: false } },
        { name: 'ip_address', keypath: 'ip_address', options: { unique: false } },
        { name: 'time', keypath: 'time', options: { unique: false } },
        { name: 'user_agent', keypath: 'user_agent', options: { unique: false } },
      ]
    },
    {
      store: 'insta/logout_activity',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'title', keypath: 'title', options: { unique: false } },
        { name: 'ip_address', keypath: 'ip_address', options: { unique: false } },
        { name: 'time', keypath: 'time', options: { unique: false } },
        { name: 'user_agent', keypath: 'user_agent', options: { unique: false } },
      ]
    },
    {
      store: 'insta/password_change_activity',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'time', keypath: 'time', options: { unique: false } },
      ]
    },
    {
      store: 'insta/signup_information',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'username', keypath: 'username', options: { unique: false } },
        { name: 'ip_address', keypath: 'ip_address', options: { unique: false } },
        { name: 'time', keypath: 'time', options: { unique: false } },
        { name: 'email', keypath: 'email', options: { unique: false } },
        { name: 'phone_number', keypath: 'phone_number', options: { unique: false } },
        { name: 'device', keypath: 'device', options: { unique: false } },
      ]
    },
    //data regarding personal information
    {
      store: 'insta/account_information',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'contact_syncing', keypath: 'contact_syncing', options: { unique: false } },
        { name: 'first_country_code', keypath: 'first_country_code', options: { unique: false } },
        { name: 'has_shared_live_video', keypath: 'has_shared_live_video', options: { unique: false } },
        { name: 'last_login', keypath: 'last_login', options: { unique: false } },
        { name: 'last_logout', keypath: 'last_logout', options: { unique: false } },
        { name: 'first_story_time', keypath: 'first_story_time', options: { unique: false } },
        { name: 'last_story_time', keypath: 'last_story_time', options: { unique: false } },
        { name: 'first_close_friends_story_time', keypath: 'first_close_friends_story_time', options: { unique: false } },
      ]
    },
    {
      store: 'insta/professional_information',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'title', keypath: 'title', options: { unique: false } },
      ]
    },
    {
      store: 'insta/profile_changes',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'title', keypath: 'title', options: { unique: false } },
        { name: 'changed', keypath: 'changed', options: { unique: false } },
        { name: 'previous_value', keypath: 'previous_value', options: { unique: false } },
        { name: 'new_value', keypath: 'new_value', options: { unique: false } },
        { name: 'change_date', keypath: 'change_date', options: { unique: false } },
      ]
    },
     //facebook data ads related data
     {
      store: 'face/ads_information',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'advertiser_name', keypath: 'advertiser_name', options: { unique: false } },
        { name: 'has_data_file_custom_audience', keypath: 'has_data_file_custom_audience', options: { unique: false } },
        { name: 'has_remarketing_custom_audience', keypath: 'has_remarketing_custom_audience', options: { unique: false } },
        { name: 'has_in_person_store_visit', keypath: 'has_in_person_store_visit', options: { unique: false } },
      ]
    },
     //facebook data ads interacted with
    {
      store: 'face/ads_interacted',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'title', keypath: 'title', options: { unique: false } },
        { name: 'action', keypath: 'action', options: { unique: false } },
        { name: 'timestamp', keypath: 'timestamp', options: { unique: false } },
      ]
    },
    //facebook inferred topics
    {
      store: 'face/inferred_topics',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'topics', keypath: 'topics', options: { unique: false } },
      ]
    },
    //facebook data apps and websites info
    {
      store: 'face/apps_websites',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'added_timestamp', keypath: 'added_timestamp', options: { unique: false } },
        { name: 'user_app_scoped_id', keypath: 'user_app_scoped_id', options: { unique: false } },
        { name: 'category', keypath: 'category', options: { unique: false } },
        { name: 'removed_timestamp', keypath: 'removed_timestamp', options: { unique: false } },
      ]
    },
    //facebook data off facebook info
    {
      store: 'face/off_facebook_activity',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema:
      [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'events', keypath: 'events', options: { unique: false } },
        { name: 'id', keypath: 'id', options: { unique: false } },
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'timestamp', keypath: 'timestamp', options: { unique: false } },
      ]
    },
    //facebook data friends and followers 
    {
      store: 'face/friend_requests_received',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema: 
      [
        { name: 'name', keypath: 'title', options: { unique: false } },
        { name: 'timestamp', keypath: 'timestamp', options: { unique: false } },
      ]
    },
    {
      store: 'face/friend_requests_sent',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema: 
      [
        { name: 'name', keypath: 'title', options: { unique: false } },
        { name: 'timestamp', keypath: 'timestamp', options: { unique: false } },
      ]
    },
    {
      store: 'face/friends',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema: 
      [
        { name: 'name', keypath: 'title', options: { unique: false } },
        { name: 'timestamp', keypath: 'timestamp', options: { unique: false } },
      ]
    },
    {
      store: 'face/rejected_friend_requests',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema: 
      [
        { name: 'name', keypath: 'title', options: { unique: false } },
        { name: 'timestamp', keypath: 'timestamp', options: { unique: false } },
      ]
    },
    {
      store: 'face/removed_friends',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema: 
      [
        { name: 'name', keypath: 'title', options: { unique: false } },
        { name: 'timestamp', keypath: 'timestamp', options: { unique: false } },
      ]
    },
    {
      store: 'face/who_you_follow',
      storeConfig: { keyPath: '$id', autoIncrement: true },
      storeSchema: 
      [
        { name: 'name', keypath: 'title', options: { unique: false } },
        { name: 'timestamp', keypath: 'timestamp', options: { unique: false } },
      ]
    }
  ],
  // provide the migration factory to the DBConfig
  migrationFactory
};

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ServiceSelectionComponent,
    FaceDashboardComponent,
    InstaDashboardComponent,
    Insta_PersonalInfoComponent,
    SpotDashboardComponent,
    MoodComponent,
    NotificationComponent,
    GeneralDataComponent,
    PreviewTileComponent,
    ListeningTimeComponent,
    InferencesComponent,
    TopArtistsComponent,
    TopSongsComponent,
    AboutComponent,
    ContactComponent,
    InferredTopicsComponent,
    InstaAccountCreationLoginComponent,
    InstaAdsComponent,
    AdsRelatedDataComponent,
    FriendAndFollowersComponent,
    SettingsFormComponent,
    HelpButtonComponent,
    OffFacebookActivityComponent,
    TitleBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NgZorroAntdModule,
    NzGridModule,
    NzCardModule,
    NzTableModule,
    NzDividerModule,
    NzProgressModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    CommonModule,
    NzTimelineModule,
    NzPopoverModule,
    NzTabsModule,
    NzStatisticModule,
    NzSpaceModule,
    ReactiveFormsModule,
    NzFormModule
  ],
  providers: [
    SQLiteService,
    DBService,
    SpotHistoryRepository,
    InstaPersonalRepository,
    InstaAdsActivityRepository,
    InstaAdsInterestRepository,
    InstaAdsClickedRepository,
    InstaAdsViewedRepository,
    InferencesRepository,
    UserdataRepository,
    InferredTopicsRepository,
    { provide: NZ_I18N, useValue: de_DE }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
