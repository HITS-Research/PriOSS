import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import de from '@angular/common/locales/de';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; //free icon library for buttons etc
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NZ_I18N, de_DE } from 'ng-zorro-antd/i18n';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FacebookAdsInteractedRepository } from './db/data-repositories/facebook/fb-ads-data/face-ads-interacted.repo';
import { FacebookAppsWebsitesRepository } from './db/data-repositories/facebook/fb-ads-data/face-apps-websites.repo';
import { FacebookOffFacebookActivityRepository } from './db/data-repositories/facebook/fb-ads-data/face-off-facebook-activity.repo';
import { FacebookFriendsRepository } from './db/data-repositories/facebook/fb-friends-data/face_friends.repo';
import { FacebookEventsRepository } from './db/data-repositories/facebook/fb-groups-events-info/face_events.repo';
import { FacebookGroupsRepository } from './db/data-repositories/facebook/fb-groups-events-info/face_groups.repo';
import { InferredTopicsRepository } from './db/data-repositories/facebook/fb-inferred-data/face_inferred_topics.repo';
import { FaceBookMessagesInfoRepository } from './db/data-repositories/facebook/fb-messages-data/fb-messages-friends.repo';
import { FaceBookGroupMessagesInfoRepository } from './db/data-repositories/facebook/fb-messages-data/fb-messages-groups.repo';
import { FacebookAddressBookRepository } from './db/data-repositories/facebook/fb-other-personal-info/face-address-book.repo';
import { FacebookSearchHistoryRepository } from './db/data-repositories/facebook/fb-other-personal-info/face-search-history.repo';
import { FacebookPostsRepository } from './db/data-repositories/facebook/fb-posts/face-posts.repo';
import { FacebookAccountActivityRepository } from './db/data-repositories/facebook/fb-security-login-data/face_account_activity.repo';
import { FacebookAccountStatusChangesRepository } from './db/data-repositories/facebook/fb-security-login-data/face_account_status_changes.repo';
import { FacebookLoginLocationsRepository } from './db/data-repositories/facebook/fb-security-login-data/face_login_locations.repo';
import { FacebookLoginLogoutsRepository } from './db/data-repositories/facebook/fb-security-login-data/face_login_logouts.repo';
import { InferencesRepository } from './db/data-repositories/general/inferences/inferences.repository';
import { UserdataRepository } from './db/data-repositories/general/userdata/userdata.repository';
import { InstaLoginRepository } from './db/data-repositories/instagram/insta-accountcreation-login/insta-login.repository';
import { InstaLogoutRepository } from './db/data-repositories/instagram/insta-accountcreation-login/insta-logout.repository';
import { InstaSignUpRepository } from './db/data-repositories/instagram/insta-accountcreation-login/insta-signup.repository';
import { InstaAdsActivityRepository } from './db/data-repositories/instagram/insta-ads/insta-ads-activity.repository';
import { InstaAdsClickedRepository } from './db/data-repositories/instagram/insta-ads/insta-ads-clicked.repository';
import { InstaAdsInterestRepository } from './db/data-repositories/instagram/insta-ads/insta-ads-interest.repository';
import { InstaAdsViewedRepository } from './db/data-repositories/instagram/insta-ads/insta-ads-viewed.repository';
import { InstaContactsRepository } from './db/data-repositories/instagram/insta-contacts/insta-contacts.repository';
import { InstaBlockedRepository } from './db/data-repositories/instagram/insta-follower-info/insta-blocked.repository';
import { InstaFollowerRepository } from './db/data-repositories/instagram/insta-follower-info/insta-follower.repository';
import { InstaFollowingRepository } from './db/data-repositories/instagram/insta-follower-info/insta-following.repository';
import { InstaPendingFollowRequestRepository } from './db/data-repositories/instagram/insta-follower-info/insta-pending-follow-request.repository';
import { InstaReceivedFollowRequestRepository } from './db/data-repositories/instagram/insta-follower-info/insta-received-follow-request.repository';
import { InstaRecentFollowRepository } from './db/data-repositories/instagram/insta-follower-info/insta-recent-follow.repository';
import { InstaRecentlyUnfollowedAccountsRepository } from './db/data-repositories/instagram/insta-follower-info/insta-recently-unfollowed-accounts.repository';
import { InstaRemovedSuggestionRepository } from './db/data-repositories/instagram/insta-follower-info/insta-removed-suggestion.repository';
import { InstaLikedCommentsRepository } from './db/data-repositories/instagram/insta-liked-content/insta-likedcomments.repository';
import { InstaLikedPostsRepository } from './db/data-repositories/instagram/insta-liked-content/insta-likedposts.repository';
import { InstaChatDataRepository } from './db/data-repositories/instagram/insta-messages/insta-chat-data.repository';
import { InstaChatPartnerDataRepository } from './db/data-repositories/instagram/insta-messages/insta-chat-partner-data.repository';
import { InstaPersonalRepository } from './db/data-repositories/instagram/insta-personal-info/insta-personal.repository';
import { InstaKeywordSearchesRepository } from './db/data-repositories/instagram/insta-searches/insta-keyword-searches.repository';
import { InstaTagSearchesRepository } from './db/data-repositories/instagram/insta-searches/insta-tag-searches.repository';
import { InstaUserSearchesRepository } from './db/data-repositories/instagram/insta-searches/insta-user-searches.repository';
import { InstaShoppingRepository } from './db/data-repositories/instagram/insta-shopping/insta-shopping.repository';
import { InstaShoppingWishlistRepository } from './db/data-repositories/instagram/insta-shopping/insta-shopping_wishlist.repository';
import { InstaTopicsRepository } from './db/data-repositories/instagram/insta-your-topics/insta-topics.repository';
import { SpotHistoryRepository } from './db/data-repositories/spotify/spot-history/spot-history.repository';
import { SpotSearchHistoryRepository } from './db/data-repositories/spotify/spot-search-history/spot-search-history.repository';
import { DBService } from './db/db.service';
import { SQLiteService } from './db/sqlite/sqlite.service';
import { AdsRelatedDataComponent } from './facebook/pages/ads-related-data/ads-related-data.component';
import { AdsSettingsComponent } from './facebook/pages/ads-settings/ads-settings.component';
import { FaceDashboardComponent } from './facebook/pages/face-dashboard/face-dashboard.component';
import { FacePurposesComponent } from './facebook/pages/face-purposes/face-purposes.component';
import { FriendAndFollowersComponent } from './facebook/pages/friend-and-followers/friend-and-followers.component';
import { GeneralDataComponent } from './facebook/pages/general-data/general-data.component';
import { GroupsAndEventsDataComponent } from './facebook/pages/groups-and-events-data/groups-and-events-data.component';
import { InferredTopicsComponent } from './facebook/pages/inferred-topics/inferred-topics.component';
import { MessagesComponent } from './facebook/pages/messages/messages.component';
import { OffFacebookActivityComponent } from './facebook/pages/off-facebook-activity/off-facebook-activity.component';
import { OtherPersonalInfoComponent } from './facebook/pages/other-personal-info/other-personal-info.component';
import { PostsComponent } from './facebook/pages/posts/posts.component';
import { SecurityLoginDataComponent } from './facebook/pages/security-login-data/security-login-data.component';
import { YourTopicsComponent } from './facebook/pages/your-topics/your-topics.component';
import { FbState } from './facebook/state/fb.state';
import { DashCardComponent } from './features/dash-card/dash-card.component';
import { HelpButtonComponent } from './features/help-button/help-button.component';
import { NotificationComponent } from './features/notification/notification.component';
import { OfflineIndicatorComponent } from './features/offline-indicator/offline-indicator.component';
import { SettingsFormComponent } from './features/settings-form/settings-form.component';
import { TitleBarComponent } from './features/title-bar/title-bar.component';
import { DashboardMenuComponent } from './framework/features/dashboard-menu/dashboard-menu.component';
import { AboutComponent } from './framework/pages/about/about.component';
import { ContactComponent } from './framework/pages/contact/contact.component';
import { DataDownloadInstructionsComponent } from './framework/pages/data-download-instructions/data-download-instructions.component';
import { FaqComponent } from './framework/pages/faq/faq.component';
import { GdprComponent } from './framework/pages/gdpr/gdpr.component';
import { KnownIssuesComponent } from './framework/pages/known-issues/known-issues.component';
import { LandingComponent } from './framework/pages/landing/landing.component';
import { ServiceSelectionComponent } from './framework/pages/service-selection/service-selection.component';
import { IconsProviderModule } from './icons-provider.module';
import { Insta_PersonalInfoComponent } from './instagram/pages/Insta_personal-info/personal-info.component';
import { InstaAccountCreationLoginComponent } from './instagram/pages/insta-account-creation-login/insta-account-creation-login.component';
import { InstaAccountPrivateComponent } from './instagram/pages/insta-account-private/insta-account-private.component';
import { InstaActivityStatusHiddenComponent } from './instagram/pages/insta-activity-status-hidden/insta-activity-status-hidden.component';
import { InstaAddManagerComponent } from './instagram/pages/insta-add-manager/insta-add-manager.component';
import { InstaAdsComponent } from './instagram/pages/insta-ads/insta-ads.component';
import { InstaBlockFollowersComponent } from './instagram/pages/insta-block-followers/insta-block-followers.component';
import { InstaContactComponent } from './instagram/pages/insta-contact/insta-contact.component';
import { InstaDashboardComponent } from './instagram/pages/insta-dashboard/insta-dashboard.component';
import { InstaDisableCookiesComponent } from './instagram/pages/insta-disable-cookies/insta-disable-cookies.component';
import { InstaFollowersComponent } from './instagram/pages/insta-followers/insta-followers.component';
import { InstaHideStoriesComponent } from './instagram/pages/insta-hide-stories/insta-hide-stories.component';
import { InstaLikedContentComponent } from './instagram/pages/insta-liked-content/insta-liked-content.component';
import { InstaMessagesComponent } from './instagram/pages/insta-messages/insta-messages.component';
import { InstaProfileInfoPrivateComponent } from './instagram/pages/insta-profile-info-private/insta-profile-info-private.component';
import { InstaPurposesComponent } from './instagram/pages/insta-purposes/insta-purposes.component';
import { InstaSearchesComponent } from './instagram/pages/insta-searches/insta-searches.component';
import { InstaShoppingComponent } from './instagram/pages/insta-shopping/insta-shopping.component';
import { InstaTwoFactorAuthenticationComponent } from './instagram/pages/insta-two-factor-authentication/insta-two-factor-authentication.component';
import { InstaYourTopicComponent } from './instagram/pages/insta-your-topic/insta-your-topic.component';
import { RevokeAccessComponent } from './instagram/pages/revoke-access/revoke-access.component';
import { InstaState } from './instagram/state/insta.state';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { InferencesMailComponent } from './spotify/features/inferences-mail/inferences-mail.component';
import { PurposesComponent } from './spotify/features/purposes/purposes.component';
import { ListeningTimeComponent } from './spotify/pages/listening-time/listening-time.component';
import { MoodComponent } from './spotify/pages/mood/mood.component';
import { SpotPrivacyInstructionsComponent } from './spotify/pages/privacy-instructions/spot-privacy-instructions.component';
import { SongtimelineComponent } from './spotify/pages/songtimeline/songtimeline.component';
import { SpotDashboardComponent } from './spotify/pages/spot-dashboard/spot-dashboard.component';
import { SpotifySearchHistoryComponent } from './spotify/pages/spotify-search-history/spotify-search-history.component';
import { SpotifyUserDataComponent } from './spotify/pages/spotify-user-data/spotify-user-data.component';
import { TopArtistsComponent } from './spotify/pages/top-artists/top-artists.component';
import { TopSongsComponent } from './spotify/pages/top-songs/top-songs.component';
import { SpotifyModule } from './spotify/spotify.module';
import { AppState } from './state/app.state';
import { PreviewTileComponent } from './unused-components/preview-tile/preview-tile.component';
import { SpotifyState } from './spotify/state/spotify.state';
import { InferencesComponent } from './spotify/pages/inferences/inferences.component';
import { FeatureToggleService } from './features/feature-toggle/feature-toggle.service';
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from './features/chart/chart.component';

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
    TopArtistsComponent,
    TopSongsComponent,
    InferencesComponent,
    AboutComponent,
    ContactComponent,
    FaqComponent,
    InstaShoppingComponent,
    InferredTopicsComponent,
    InstaAccountCreationLoginComponent,
    InstaAdsComponent,
    InstaLikedContentComponent,
    InstaContactComponent,
    InstaMessagesComponent,
    AdsRelatedDataComponent,
    FriendAndFollowersComponent,
    SettingsFormComponent,
    HelpButtonComponent,
    OffFacebookActivityComponent,
    InstaSearchesComponent,
    InstaYourTopicComponent,
    OfflineIndicatorComponent,
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
    GroupsAndEventsDataComponent,
    PurposesComponent,
    InferencesMailComponent,
    InstaActivityStatusHiddenComponent,
    InstaDisableCookiesComponent,
    InstaPurposesComponent,
    FacePurposesComponent,
  ],
  imports: [
    TitleBarComponent,
    DataDownloadInstructionsComponent,
    SpotifyModule,
    SpotifyUserDataComponent,
    SpotifySearchHistoryComponent,
    DashboardMenuComponent,
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
    NzButtonModule,
    ChartComponent,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    CommonModule,
    NzTimelineModule,
    NzPopoverModule,
    NzTabsModule,
    NzStatisticModule,
    NzSpaceModule,
    ReactiveFormsModule,
    NzFormModule,
    NzResultModule,
    NgxsModule.forRoot([AppState, FbState, InstaState, SpotifyState]),
    // Uncomment below dependency for debugging
    // NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot(),
    NgChartsModule,
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
    InstaChatDataRepository,
    InstaChatPartnerDataRepository,
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
    SpotSearchHistoryRepository,
    FeatureToggleService,
    { provide: NZ_I18N, useValue: de_DE },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
