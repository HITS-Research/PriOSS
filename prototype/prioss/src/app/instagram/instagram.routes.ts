import { Routes } from "@angular/router";
import { instagramGuard } from "../guards/instagram.guard";
import { InstaAccountCreationLoginComponent } from "./pages/insta-account-creation-login/insta-account-creation-login.component";
import { InstaAccountPrivateComponent } from "./pages/insta-account-private/insta-account-private.component";
import { InstaActivityStatusHiddenComponent } from "./pages/insta-activity-status-hidden/insta-activity-status-hidden.component";
import { InstaAddManagerComponent } from "./pages/insta-add-manager/insta-add-manager.component";
import { InstaAdsComponent } from "./pages/insta-ads/insta-ads.component";
import { InstaBlockFollowersComponent } from "./pages/insta-block-followers/insta-block-followers.component";
import { InstaContactComponent } from "./pages/insta-contact/insta-contact.component";
import { InstaDashboardComponent } from "./pages/insta-dashboard/insta-dashboard.component";
import { InstaDisableCookiesComponent } from "./pages/insta-disable-cookies/insta-disable-cookies.component";
import { InstaFollowersComponent } from "./pages/insta-followers/insta-followers.component";
import { InstaHideStoriesComponent } from "./pages/insta-hide-stories/insta-hide-stories.component";
import { InstaLikedContentComponent } from "./pages/insta-liked-content/insta-liked-content.component";
import { InstaMessagesComponent } from "./pages/insta-messages/insta-messages.component";
import { InstaProfileInfoPrivateComponent } from "./pages/insta-profile-info-private/insta-profile-info-private.component";
import { InstaPurposesComponent } from "./pages/insta-purposes/insta-purposes.component";
import { InstaSearchesComponent } from "./pages/insta-searches/insta-searches.component";
import { InstaShoppingComponent } from "./pages/insta-shopping/insta-shopping.component";
import { InstaTwoFactorAuthenticationComponent } from "./pages/insta-two-factor-authentication/insta-two-factor-authentication.component";
import { InstaYourTopicComponent } from "./pages/insta-your-topic/insta-your-topic.component";
import { Insta_PersonalInfoComponent } from "./pages/Insta_personal-info/personal-info.component";
import { RevokeAccessComponent } from "./pages/revoke-access/revoke-access.component";

export const instagramRoutes: Routes = [
  {
    path: 'instagram',
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
];
