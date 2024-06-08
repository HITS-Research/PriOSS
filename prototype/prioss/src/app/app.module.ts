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
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
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
import { AdsRelatedDataComponent } from './facebook/pages/ads-related-data/ads-related-data.component';
import { AdsSettingsComponent } from './facebook/pages/ads-settings/ads-settings.component';
import { FaceDashboardComponent } from './facebook/pages/face-dashboard/face-dashboard.component';
import { FacePurposesComponent } from './facebook/pages/face-purposes/face-purposes.component';
import { GeneralDataComponent } from './facebook/pages/general-data/general-data.component';
import { GroupsAndEventsDataComponent } from './facebook/pages/groups-and-events-data/groups-and-events-data.component';
import { InferredTopicsComponent } from './facebook/pages/inferred-topics/inferred-topics.component';
import { MessagesComponent } from './facebook/pages/messages/messages.component';
import { OffFacebookActivityComponent } from './facebook/pages/off-facebook-activity/off-facebook-activity.component';
import { OtherPersonalInfoComponent } from './facebook/pages/other-personal-info/other-personal-info.component';
import { PostsComponent } from './facebook/pages/posts/posts.component';
import { SecurityLoginDataComponent } from './facebook/pages/security-login-data/security-login-data.component';
import { YourTopicsComponent } from './facebook/pages/your-topics/your-topics.component';
import { FacebookState } from './facebook/state/fb.state';
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
import { SpotifyDashboardComponent } from './spotify/pages/spotify-dashboard/spotify-dashboard.component';
import { SpotifySearchHistoryComponent } from './spotify/pages/spotify-search-history/spotify-search-history.component';
import { SpotifyUserDataComponent } from './spotify/pages/spotify-user-data/spotify-user-data.component';
import { SpotifyTopSongArtistsComponent } from './spotify/pages/spotif-top-song-artists/spotify-top-song-artists.component';
import { SpotifyModule } from './spotify/spotify.module';
import { AppState } from './state/app.state';
import { PreviewTileComponent } from './unused-components/preview-tile/preview-tile.component';
import { SpotifyState } from './spotify/state/spotify.state';
import { InferencesComponent } from './spotify/pages/inferences/inferences.component';
import { FeatureToggleService } from './features/feature-toggle/feature-toggle.service';
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from './features/chart/chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { TimePipe } from './features/time/time.pipe';
import { AccordionComponent } from './features/accordion/accordion.component';
import { ChatviewComponent } from './facebook/pages/messages/chatview/chatview.component';
import { ChatMessageDistributionChartComponent } from './facebook/pages/messages/chatview/chat-statistics/features/chat-message-distribution-chart/chat-message-distribution-chart.component';
import { ChatStatisticsComponent as FacebookChatStatisticsComponent } from './facebook/pages/messages/chatview/chat-statistics/chat-statistics.component';
import { GeneralChatInfosComponent } from './facebook/pages/messages/chatview/chat-statistics/features/general-chat-infos/general-chat-infos.component';
import { AverageMessageLengthComponent } from './facebook/pages/messages/chatview/chat-statistics/features/average-message-length/average-message-length.component';
import { AverageResponeTimeComponent } from './facebook/pages/messages/chatview/chat-statistics/features/average-respone-time/average-respone-time.component';
import { ChatSentimentAnalysisComponent } from './facebook/pages/messages/chatview/chat-statistics/features/chat-sentiment-analysis/chat-sentiment-analysis.component';
import { ChatWordcloudComponent } from './facebook/pages/messages/chatview/chat-statistics/features/chat-wordcloud/chat-wordcloud.component';
import { MessagesPerDayChartComponent } from './facebook/pages/messages/chatview/chat-statistics/features/messages-per-day-chart/messages-per-day-chart.component';
import { MessagesPerWeekdayComponent } from './facebook/pages/messages/chatview/chat-statistics/features/messages-per-weekday/messages-per-weekday.component';
import { TopChatsComponent } from './facebook/pages/messages/chatview/chat-statistics/features/top-chats/top-chats.component';
import { FacebookFriendsOverviewComponent } from './facebook/pages/friend-and-followers/features/friends-overview/friends-overview.component';
import { FacebookFriendsStatisticsComponent } from './facebook/pages/friend-and-followers/features/friends-statistics/friends-statistics.component';
import { FacebookModule } from './facebook/facebook.module';
import { FriendAndFollowersComponent } from './facebook/pages/friend-and-followers/friend-and-followers.component';
import { TopSongsComponent } from './spotify/pages/top-songs/top-songs.component';
import { WorldMapComponent } from './features/world-map/world-map.component';
import { SpotifyTopPodcastsComponent } from './spotify/pages/spotify-top-podcasts/spotify-top-podcasts.component';
import { SpotifyRoutingModule } from './spotify/spotify-routing.module';
import { SpotifyTopPodcastsDetailsComponent } from './spotify/pages/spotify-top-podcasts-details/spotify-top-podcasts-details.component';
import { HeaderComponent } from './framework/features/header/header.component';


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
    SpotifyDashboardComponent,
    MoodComponent,
    NotificationComponent,
    PreviewTileComponent,
    ListeningTimeComponent,
    SpotifyTopSongArtistsComponent,
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
    AccordionComponent,
  ],
  imports: [
    SpotifyModule,
    SpotifyRoutingModule,
    SpotifyUserDataComponent,
    SpotifyTopPodcastsComponent,
    SpotifyTopPodcastsDetailsComponent,
    SpotifySearchHistoryComponent,
    TopSongsComponent,
    DashboardMenuComponent,
    HeaderComponent,
    TimePipe,
    FacebookModule,
    FriendAndFollowersComponent,
    GeneralDataComponent,
    PostsComponent,
    TitleBarComponent,
    DataDownloadInstructionsComponent,
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
    ChatviewComponent,
    FacebookChatStatisticsComponent,
    GeneralChatInfosComponent,
    AverageMessageLengthComponent,
    AverageResponeTimeComponent,
    ChatSentimentAnalysisComponent,
    ChatWordcloudComponent,
    MessagesPerDayChartComponent,
    MessagesPerWeekdayComponent,
    TopChatsComponent,
    FacebookFriendsOverviewComponent,
    FacebookFriendsStatisticsComponent,
    ChatMessageDistributionChartComponent,
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
    NgxsModule.forRoot([AppState, FacebookState, InstaState, SpotifyState]),
    // Uncomment below dependency for debugging
    // NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot(),
    NgChartsModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
    WorldMapComponent,
  ],
  providers: [FeatureToggleService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
