import { CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
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
import { InstaShoppingRepository } from './db/data-repositories/instagram/insta-shopping/insta-shopping.repository';
import { InstaShoppingComponent } from './visualizations/instagram/insta-shopping/insta-shopping.component';
import { InstaRecentFollowRepository } from './db/data-repositories/instagram/insta-follower-info/insta-recent-follow.repository';
import { InstaPendingFollowRequestRepository } from './db/data-repositories/instagram/insta-follower-info/insta-pending-follow-request.repository';
import { InstaRecentlyUnfollowedAccountsRepository } from './db/data-repositories/instagram/insta-follower-info/insta-recently-unfollowed-accounts.repository';
import { InstaRemovedSuggestionRepository } from './db/data-repositories/instagram/insta-follower-info/insta-removed-suggestion.repository';
import { InstaReceivedFollowRequestRepository } from './db/data-repositories/instagram/insta-follower-info/insta-received-follow-request.repository';
import { FaqComponent } from './info-pages/faq/faq.component';
import { FacebookAdsInteractedRepository } from './db/data-repositories/facebook/fb-ads-data/face-ads-interacted.repo';
import { FacebookAppsWebsitesRepository } from './db/data-repositories/facebook/fb-ads-data/face-apps-websites.repo';
import { FacebookOffFacebookActivityRepository } from './db/data-repositories/facebook/fb-ads-data/face-off-facebook-activity.repo';
import { KnownIssuesComponent } from './info-pages/known-issues/known-issues.component';
import { FacebookFriendsRepository } from './db/data-repositories/facebook/fb-friends-data/face_friends.repo';
import { AdsSettingsComponent } from './manage-privacy/facebook/guidlines-for-ads-settings/ads-settings/ads-settings.component';
import { DashCardComponent } from './page-sub-components/dash-card/dash-card.component';
import { InstaBlockFollowersComponent } from './rectification/instagram/insta-block-followers/insta-block-followers.component';
import { InstaAccountPrivateComponent } from './rectification/instagram/insta-account-private/insta-account-private.component';
import { InstaTwoFactorAuthenticationComponent } from './rectification/instagram/insta-two-factor-authentication/insta-two-factor-authentication.component';
import { InstaHideStoriesComponent } from './rectification/instagram/insta-hide-stories/insta-hide-stories.component';
import { InstaProfileInfoPrivateComponent } from './rectification/instagram/insta-profile-info-private/insta-profile-info-private.component';
import { InstaAddManagerComponent } from './rectification/instagram/insta-add-manager/insta-add-manager.component';
import { RevokeAccessComponent } from './rectification/instagram/revoke-access/revoke-access.component';
import { SpotPrivacyInstructionsComponent } from './visualizations/spotify/privacy-instructions/spot-privacy-instructions.component';
import { SongtimelineComponent } from './visualizations/spotify/songtimeline/songtimeline.component';
import { GdprComponent } from './info-pages/gdpr/gdpr.component';
import { FacebookAddressBookRepository } from './db/data-repositories/facebook/fb-other-personal-info/face-address-book.repo';
import { FacebookSearchHistoryRepository } from './db/data-repositories/facebook/fb-other-personal-info/face-search-history.repo';
import { YourTopicsComponent } from './manage-privacy/facebook/your-topics/your-topics.component';
import { FacebookLoginLocationsRepository } from './db/data-repositories/facebook/fb-security-login-data/face_login_locations.repo';
import { FacebookAccountActivityRepository } from './db/data-repositories/facebook/fb-security-login-data/face_account_activity.repo';
import { FacebookAccountStatusChangesRepository } from './db/data-repositories/facebook/fb-security-login-data/face_account_status_changes.repo';
import { FacebookLoginLogoutsRepository } from './db/data-repositories/facebook/fb-security-login-data/face_login_logouts.repo';
import { SecurityLoginDataComponent } from './visualizations/facebook/security-login-data/security-login-data.component';
import { OtherPersonalInfoComponent } from './visualizations/facebook/other-personal-info/other-personal-info.component';
import { FacebookPostsRepository } from './db/data-repositories/facebook/fb-posts/face-posts.repo';
import { PostsComponent } from './visualizations/facebook/face-posts/posts/posts.component';

import { FaceBookMessagesInfoRepository } from './db/data-repositories/facebook/fb-messages-data/fb-messages-friends.repo';
import { MessagesComponent } from './visualizations/facebook/messages/messages.component';
import { FaceBookGroupMessagesInfoRepository } from './db/data-repositories/facebook/fb-messages-data/fb-messages-groups.repo';
import { InstaShoppingWishlistRepository } from './db/data-repositories/instagram/insta-shopping/insta-shopping_wishlist.repository';

import { GroupsAndEventsDataComponent } from './visualizations/facebook/groups-and-events-data/groups-and-events-data.component';
import { FacebookEventsRepository } from './db/data-repositories/facebook/fb-groups-events-info/face_events.repo';
import { FacebookGroupsRepository } from './db/data-repositories/facebook/fb-groups-events-info/face_groups.repo';
import { InstaTopicsRepository } from './db/data-repositories/instagram/insta-your-topics/insta-topics.repository';
import { InstaYourTopicComponent } from './visualizations/instagram/insta-your-topic/insta-your-topic.component';
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
    InstaShoppingComponent,
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
    InstaYourTopicComponent,
    OfflineIndicatorComponent,
    TitleBarComponent,
    KnownIssuesComponent,
    AdsSettingsComponent,
    DashCardComponent,
    GdprComponent,
    InstaBlockFollowersComponent,
    InstaAccountPrivateComponent,
    InstaTwoFactorAuthenticationComponent,
    InstaHideStoriesComponent,
    InstaProfileInfoPrivateComponent,
    InstaAddManagerComponent,
    RevokeAccessComponent,
    SpotPrivacyInstructionsComponent,
    SongtimelineComponent,
    OtherPersonalInfoComponent,
    PostsComponent,
    YourTopicsComponent,
    SecurityLoginDataComponent,
    OtherPersonalInfoComponent,
    MessagesComponent,
    GroupsAndEventsDataComponent
,
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
      enabled: environment.production,
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
    InstaShoppingRepository,
    InstaShoppingWishlistRepository,
    InstaRecentFollowRepository,
    InstaPendingFollowRequestRepository,
    InstaRecentlyUnfollowedAccountsRepository,
    InstaRemovedSuggestionRepository,
    InstaReceivedFollowRequestRepository,
    InstaTopicsRepository,
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
    FacebookLoginLocationsRepository,
    FacebookAddressBookRepository,
    FacebookSearchHistoryRepository,
    FacebookPostsRepository,
    FacebookAccountActivityRepository,
    FacebookAccountStatusChangesRepository,
    FacebookLoginLogoutsRepository,
    FaceBookMessagesInfoRepository,
    FaceBookGroupMessagesInfoRepository,
    FacebookGroupsRepository,
    FacebookEventsRepository,
    { provide: NZ_I18N, useValue: de_DE }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }