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
import { DataDownloadInstructionsComponent } from './framework/pages/data-download-instructions/data-download-instructions.component';
import { KnownIssuesComponent } from './framework/pages/known-issues/known-issues.component';
import { DarkPatternsComponent } from './framework/pages/dark_patterns/dark_patterns.component';
import { LandingComponent } from './framework/pages/landing/landing.component';
import { ServiceSelectionComponent } from './framework/pages/service-selection/service-selection.component';
import { facebookGuard } from './guards/facebook.guard';
import { instagramGuard } from './guards/instagram.guard';
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

const routes: Routes = [
  { path: 'home', component: LandingComponent },
  { path: 'dark-patterns', component: DarkPatternsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'known-issues', component: KnownIssuesComponent },
  { path: 'serviceSelection', component: ServiceSelectionComponent },
  {
    path: 'serviceSelection/dataDownload',
    component: DataDownloadInstructionsComponent,
  },
  // { path: 'faq', component: FaqComponent },
  {
    path: 'face',
    canActivateChild: [facebookGuard],
    children: [
      { path: 'ads-related-data', component: AdsRelatedDataComponent },
      {
        path: 'configure-off-facebook-activity',
        component: OffFacebookActivityComponent,
      },
      { path: 'connections', component: FriendAndFollowersComponent },
      { path: 'dashboard', component: FaceDashboardComponent },
      { path: 'general-data', component: GeneralDataComponent },
      {
        path: 'groups-and-events-data',
        component: GroupsAndEventsDataComponent,
      },
      { path: 'guidelines-for-ads-settings', component: AdsSettingsComponent },
      { path: 'inferred-topics', component: InferredTopicsComponent },
      { path: 'messages-info', component: MessagesComponent },
      { path: 'other-personal-info', component: OtherPersonalInfoComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'purposes', component: FacePurposesComponent },
      { path: 'security-login', component: SecurityLoginDataComponent },
      { path: 'your-topics', component: YourTopicsComponent },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
  {
    path: 'insta',
    canActivateChild: [instagramGuard],
    children: [
      { path: 'account-private', component: InstaAccountPrivateComponent },
      { path: 'account', component: InstaAccountCreationLoginComponent },
      {
        path: 'activity-hidden',
        component: InstaActivityStatusHiddenComponent,
      },
      { path: 'add-manager', component: InstaAddManagerComponent },
      { path: 'ads', component: InstaAdsComponent },
      { path: 'block-followers', component: InstaBlockFollowersComponent },
      { path: 'contacts', component: InstaContactComponent },
      { path: 'dashboard', component: InstaDashboardComponent },
      { path: 'disable-cookies', component: InstaDisableCookiesComponent },
      { path: 'followers', component: InstaFollowersComponent },
      { path: 'hide-stories', component: InstaHideStoriesComponent },
      { path: 'likedcontent', component: InstaLikedContentComponent },
      { path: 'messages', component: InstaMessagesComponent },
      { path: 'personal-info', component: Insta_PersonalInfoComponent },
      {
        path: 'profile-info-private',
        component: InstaProfileInfoPrivateComponent,
      },
      { path: 'purposes', component: InstaPurposesComponent },
      { path: 'revoke-access', component: RevokeAccessComponent },
      { path: 'searches', component: InstaSearchesComponent },
      { path: 'shopping', component: InstaShoppingComponent },
      {
        path: 'two-factor-authentication',
        component: InstaTwoFactorAuthenticationComponent,
      },
      { path: 'your-topic', component: InstaYourTopicComponent },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
