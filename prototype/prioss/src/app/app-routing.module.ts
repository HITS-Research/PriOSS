import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AboutComponent } from './framework/pages/about/about.component';
import { ContactComponent } from './framework/pages/contact/contact.component';
import { KnownIssuesComponent } from './framework/pages/known-issues/known-issues.component';
import { LandingComponent } from './framework/pages/landing/landing.component';
import { InstaAccountPrivateComponent } from './instagram/pages/insta-account-private/insta-account-private.component';
import { InstaActivityStatusHiddenComponent } from './instagram/pages/insta-activity-status-hidden/insta-activity-status-hidden.component';
import { InstaAddManagerComponent } from './instagram/pages/insta-add-manager/insta-add-manager.component';
import { InstaBlockFollowersComponent } from './instagram/pages/insta-block-followers/insta-block-followers.component';
import { InstaDashboardComponent } from './instagram/pages/insta-dashboard/insta-dashboard.component';
import { InstaDisableCookiesComponent } from './instagram/pages/insta-disable-cookies/insta-disable-cookies.component';
import { InstaHideStoriesComponent } from './instagram/pages/insta-hide-stories/insta-hide-stories.component';
import { InstaProfileInfoPrivateComponent } from './instagram/pages/insta-profile-info-private/insta-profile-info-private.component';
import { InstaPurposesComponent } from './instagram/pages/insta-purposes/insta-purposes.component';
import { InstaSearchesComponent } from './instagram/pages/insta-searches/insta-searches.component';
import { InstaShoppingComponent } from './instagram/pages/insta-shopping/insta-shopping.component';
import { InstaTwoFactorAuthenticationComponent } from './instagram/pages/insta-two-factor-authentication/insta-two-factor-authentication.component';
import { InstaYourTopicComponent } from './instagram/pages/insta-your-topic/insta-your-topic.component';
import { RevokeAccessComponent } from './instagram/pages/revoke-access/revoke-access.component';
import { DataDownloadInstructionsComponent } from './framework/pages/data-download-instructions/data-download-instructions.component';
import { ServiceSelectionComponent } from './framework/pages/service-selection/service-selection.component';
import { SpotDashboardComponent } from './spotify/pages/spot-dashboard/spot-dashboard.component';
import { Insta_PersonalInfoComponent } from './instagram/pages/Insta_personal-info/personal-info.component';
import { InstaAccountCreationLoginComponent } from './instagram/pages/insta-account-creation-login/insta-account-creation-login.component';
import { InstaAdsComponent } from './instagram/pages/insta-ads/insta-ads.component';
import { InstaContactComponent } from './instagram/pages/insta-contact/insta-contact.component';
import { InstaFollowersComponent } from './instagram/pages/insta-followers/insta-followers.component';
import { InstaLikedContentComponent } from './instagram/pages/insta-liked-content/insta-liked-content.component';
import { InstaMessagesComponent } from './instagram/pages/insta-messages/insta-messages.component';
import { InferencesComponent } from './spotify/pages/inferences/inferences.component';
import { ListeningTimeComponent } from './spotify/pages/listening-time/listening-time.component';
import { MoodComponent } from './spotify/pages/mood/mood.component';
import { SpotPrivacyInstructionsComponent } from "./spotify/pages/privacy-instructions/spot-privacy-instructions.component";
import { SpotifySearchHistoryComponent } from './spotify/pages/spotify-search-history/spotify-search-history.component';
import { SongtimelineComponent } from './spotify/pages/songtimeline/songtimeline.component';
import { TopArtistsComponent } from "./spotify/pages/top-artists/top-artists.component";
import { TopSongsComponent } from "./spotify/pages/top-songs/top-songs.component";
import { SpotifyUserDataComponent } from './spotify/pages/spotify-user-data/spotify-user-data.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'known-issues', component: KnownIssuesComponent },
  { path: 'serviceSelection', component: ServiceSelectionComponent },
  { path: 'serviceSelection/dataDownload', component: DataDownloadInstructionsComponent },
  // { path: 'faq', component: FaqComponent },
  { path: 'face/ads-related-data', component: AdsRelatedDataComponent },
  { path: 'face/configure-off-facebook-activity', component: OffFacebookActivityComponent },
  { path: 'face/connections', component: FriendAndFollowersComponent },
  { path: 'face/dashboard', component: FaceDashboardComponent },
  { path: 'face/general-data', component: GeneralDataComponent },
  { path: 'face/groups-and-events-data', component: GroupsAndEventsDataComponent },
  { path: 'face/guidelines-for-ads-settings', component: AdsSettingsComponent },
  { path: 'face/inferred-topics', component: InferredTopicsComponent },
  { path: 'face/messages-info', component: MessagesComponent },
  { path: 'face/other-personal-info', component: OtherPersonalInfoComponent },
  { path: 'face/posts', component: PostsComponent },
  { path: 'face/purposes', component: FacePurposesComponent },
  { path: 'face/security-login', component: SecurityLoginDataComponent },
  { path: 'face/your-topics', component: YourTopicsComponent },
  { path: 'insta/account-private', component: InstaAccountPrivateComponent },
  { path: 'insta/account', component: InstaAccountCreationLoginComponent },
  { path: 'insta/activity-hidden', component: InstaActivityStatusHiddenComponent },
  { path: 'insta/add-manager', component: InstaAddManagerComponent },
  { path: 'insta/ads', component: InstaAdsComponent },
  { path: 'insta/block-followers', component: InstaBlockFollowersComponent },
  { path: 'insta/contacts', component: InstaContactComponent },
  { path: 'insta/dashboard', component: InstaDashboardComponent },
  { path: 'insta/disable-cookies', component: InstaDisableCookiesComponent },
  { path: 'insta/followers', component: InstaFollowersComponent },
  { path: 'insta/hide-stories', component: InstaHideStoriesComponent },
  { path: 'insta/likedcontent', component: InstaLikedContentComponent },
  { path: 'insta/messages', component: InstaMessagesComponent },
  { path: 'insta/personal-info', component: Insta_PersonalInfoComponent },
  { path: 'insta/profile-info-private', component: InstaProfileInfoPrivateComponent },
  { path: 'insta/purposes', component: InstaPurposesComponent },
  { path: 'insta/revoke-access', component: RevokeAccessComponent },
  { path: 'insta/searches', component: InstaSearchesComponent },
  { path: 'insta/shopping', component: InstaShoppingComponent },
  { path: 'insta/two-factor-authentication', component: InstaTwoFactorAuthenticationComponent },
  { path: 'insta/your-topic', component: InstaYourTopicComponent },
  { path: 'spot/dashboard', component: SpotDashboardComponent },
  { path: 'spot/general-data', component: SpotifyUserDataComponent },
  { path: 'spot/inference', component: InferencesComponent },
  { path: 'spot/listening-time', component: ListeningTimeComponent },
  { path: 'spot/listening-time/songtimeline', component: SongtimelineComponent },
  { path: 'spot/mood', component: MoodComponent },
  { path: 'spot/privacy-instructions', component: SpotPrivacyInstructionsComponent },
  { path: 'spot/search-history', component: SpotifySearchHistoryComponent },
  { path: 'spot/top-artists', component: TopArtistsComponent },
  { path: 'spot/top-artists/:start/:end', component: TopArtistsComponent },
  { path: 'spot/top-songs', component: TopSongsComponent },
  { path: 'spot/top-songs/:start/:end', component: TopSongsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
