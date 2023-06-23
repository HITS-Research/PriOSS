import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

import { SQLiteService } from './services/sqlite/sqlite.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { ServiceSelectionComponent } from './service-selection/service-selection.component';
import { FaceDashboardComponent } from './dashboards/face-dashboard/face-dashboard.component';
import { InstaDashboardComponent } from './dashboards/insta-dashboard/insta-dashboard.component';
import { Insta_PersonalInfoComponent} from './visualizations/instagram/Insta_personal-info/personal-info.component';
import { InstaFollowersComponent } from './visualizations/instagram/insta-followers/insta-followers.component';
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
import { InstaSearchesComponent } from './visualizations/instagram/insta-searches/insta-searches.component';

import { DBService } from './services/db/db.service';
import { SpotHistoryRepository } from './db/data-repositories/spotify/spot-history/spot-history.repository';
import { UserdataRepository } from './db/data-repositories/general/userdata/userdata.repository';
import { InferencesRepository } from './db/data-repositories/general/inferences/inferences.repository';
import { OfflineIndicatorComponent } from './offline-indicator/offline-indicator.component';

import { InstaPersonalRepository } from './db/data-repositories/instagram/insta-personal-info/insta-personal.repository';
import { InstaAdsActivityRepository } from './db/data-repositories/instagram/insta-ads/insta-ads-activity.repository';
import { InstaAdsInterestRepository } from './db/data-repositories/instagram/insta-ads/insta-ads-interest.repository';
import { InstaAdsClickedRepository } from './db/data-repositories/instagram/insta-ads/insta-ads-clicked.repository';
import { InstaAdsViewedRepository } from './db/data-repositories/instagram/insta-ads/insta-ads-viewed.repository';
import { InstaUserSearchesRepository } from './db/data-repositories/instagram/insta-searches/insta-user-searches.repository';
import { InstaKeywordSearchesRepository } from './db/data-repositories/instagram/insta-searches/insta-keyword-searches.repository';
import { InstaTagSearchesRepository } from './db/data-repositories/instagram/insta-searches/insta-tag-searches.repository';
import { InstaSignUpRepository } from './db/data-repositories/instagram/insta-accountcreation-login/insta-signup.repository';
import { InstaLikedCommentsRepository } from './db/data-repositories/instagram/insta-liked-content/insta-likedcomments.repository';
import { InstaLikedPostsRepository } from './db/data-repositories/instagram/insta-liked-content/insta-likedposts.repository';
import { InferredTopicsRepository } from './db/data-repositories/facebook/fb-inferred-data/face_inferred_topics.repo';
import { TitleBarComponent } from './page-sub-components/title-bar/title-bar.component';
import { InstaLikedContentComponent } from './visualizations/instagram/insta-liked-content/insta-liked-content.component';
import { InstaLoginRepository } from './db/data-repositories/instagram/insta-accountcreation-login/insta-login.repository';
import { InstaLogoutRepository } from './db/data-repositories/instagram/insta-accountcreation-login/insta-logout.repository';
import { InstaContactComponent } from './visualizations/instagram/insta-contact/insta-contact.component';
import { InstaContactsRepository } from './db/data-repositories/instagram/insta-contacts/insta-contacts.repository';
import { InstaFollowerRepository } from './db/data-repositories/instagram/insta-follower-info/insta-follower.repository';
import { InstaFollowingRepository } from './db/data-repositories/instagram/insta-follower-info/insta-following.repository';
import { InstaBlockedRepository } from './db/data-repositories/instagram/insta-follower-info/insta-blocked.repository';
import { InstaRecentFollowRepository } from './db/data-repositories/instagram/insta-follower-info/insta-recent-follow.repository';
import { InstaPendingFollowRequestRepository } from './db/data-repositories/instagram/insta-follower-info/insta-pending-follow-request.repository';
import { InstaRecentlyUnfollowedAccountsRepository } from './db/data-repositories/instagram/insta-follower-info/insta-recently-unfollowed-accounts.repository';
import { InstaRemovedSuggestionRepository } from './db/data-repositories/instagram/insta-follower-info/insta-removed-suggestion.repository';
import { InstaReceivedFollowRequestRepository } from './db/data-repositories/instagram/insta-follower-info/insta-received-follow-request.repository';
import { FaqComponent } from './info-pages/faq/faq.component';
import { FacebookAdsInteractedRepository } from './db/data-repositories/facebook/fb_ads_data/face_ads_interacted.repo';
import { FacebookAppsWebsitesRepository } from './db/data-repositories/facebook/fb_ads_data/face_apps_websites.repo';
import { FacebookOffFacebookActivityRepository } from './db/data-repositories/facebook/fb_ads_data/face_off_facebook_activity.repo';
import { KnownIssuesComponent } from './info-pages/known-issues/known-issues.component';
import { FacebookFriendsRepository } from './db/data-repositories/facebook/fb-friends-data/face_friends.repo';
import { AdsSettingsComponent } from './manage-privacy/facebook/guidlines-for-ads-settings/ads-settings/ads-settings.component';
import { GdprComponent } from './info-pages/gdpr/gdpr.component';
import { SpotPrivacyInstructionsComponent } from './visualizations/spotify/privacy-instructions/spot-privacy-instructions.component';

registerLocaleData(de);

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ServiceSelectionComponent,
    FaceDashboardComponent,
    InstaDashboardComponent,
    Insta_PersonalInfoComponent,
    InstaFollowersComponent,
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
    FaqComponent,
    InferredTopicsComponent,
    InstaAccountCreationLoginComponent,
    InstaAdsComponent,
    InstaLikedContentComponent,
    InstaContactComponent,
    AdsRelatedDataComponent,
    FriendAndFollowersComponent,
    SettingsFormComponent,
    HelpButtonComponent,
    OffFacebookActivityComponent,
    InstaSearchesComponent,
    OfflineIndicatorComponent,
    TitleBarComponent,
    KnownIssuesComponent,
    AdsSettingsComponent,
    GdprComponent,
    SpotPrivacyInstructionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    InstaSignUpRepository,
    InstaLoginRepository,
    InstaLogoutRepository,
    InstaLikedCommentsRepository,
    InstaLikedPostsRepository,
    InstaContactsRepository,
    InstaFollowerRepository,
    InstaFollowingRepository,
    InstaBlockedRepository,
    InstaRecentFollowRepository,
    InstaPendingFollowRequestRepository,
    InstaRecentlyUnfollowedAccountsRepository,
    InstaRemovedSuggestionRepository,
    InstaReceivedFollowRequestRepository,
    InferencesRepository,
    UserdataRepository,
    InstaUserSearchesRepository,
    InstaKeywordSearchesRepository,
    InstaTagSearchesRepository,
    InferredTopicsRepository,
    FacebookAdsInteractedRepository,
    FacebookAppsWebsitesRepository,
    FacebookOffFacebookActivityRepository,
    FacebookFriendsRepository,
    { provide: NZ_I18N, useValue: de_DE }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
