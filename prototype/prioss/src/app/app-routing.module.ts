import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaceDashboardComponent } from './dashboards/face-dashboard/face-dashboard.component';
import { InstaDashboardComponent } from './dashboards/insta-dashboard/insta-dashboard.component';
import {Insta_PersonalInfoComponent} from './visualizations/instagram/Insta_personal-info/personal-info.component';
import { InstaAccountCreationLoginComponent } from './visualizations/instagram/insta-account-creation-login/insta-account-creation-login.component';
import { InstaAdsComponent } from './visualizations/instagram/insta-ads/insta-ads.component';
import { InstaLikedContentComponent } from './visualizations/instagram/insta-liked-content/insta-liked-content.component';

import { SpotDashboardComponent } from './dashboards/spot-dashboard/spot-dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { ServiceSelectionComponent } from './service-selection/service-selection.component';
import { GeneralDataComponent } from './visualizations/all/general-data/general-data.component';
import { ListeningTimeComponent } from './visualizations/spotify/listening-time/listening-time.component';
import { InferencesComponent } from './visualizations/spotify/inferences/inferences.component';
import { MoodComponent } from './visualizations/spotify/mood/mood.component';
import {TopArtistsComponent} from "./visualizations/spotify/top-artists/top-artists.component";
import {TopSongsComponent} from "./visualizations/spotify/top-songs/top-songs.component";
import { AboutComponent } from './info-pages/about/about.component';
import { ContactComponent } from './info-pages/contact/contact.component';
import { InferredTopicsComponent } from './visualizations/facebook/inferred-topics/inferred-topics.component';
import { AdsRelatedDataComponent } from './visualizations/facebook/ads-related-data/ads-related-data.component';
import { FriendAndFollowersComponent } from './visualizations/facebook/friend-and-followers/friend-and-followers.component';
import { OffFacebookActivityComponent } from './rectification/facebook/off-facebook-activity/off-facebook-activity.component';
import { InstaSearchesComponent } from './visualizations/instagram/insta-searches/insta-searches.component';
import { InstaFollowersComponent } from './visualizations/instagram/insta-followers/insta-followers.component';
import { InstaContactComponent } from './visualizations/instagram/insta-contact/insta-contact.component';
import { FaqComponent } from './info-pages/faq/faq.component';
import { KnownIssuesComponent } from './info-pages/known-issues/known-issues.component';
import { AdsSettingsComponent } from './manage-privacy/facebook/guidlines-for-ads-settings/ads-settings/ads-settings.component';
import { OtherPersonalInfoComponent } from './visualizations/facebook/other-personal-info/other-personal-info.component';
import {
SpotPrivacyInstructionsComponent
} from "./visualizations/spotify/privacy-instructions/spot-privacy-instructions.component";
import { SongtimelineComponent } from './visualizations/spotify/songtimeline/songtimeline.component';
import { SecurityLoginDataComponent } from './visualizations/facebook/security-login-data/security-login-data.component';
import { MessagesComponent } from './visualizations/facebook/messages/messages.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'known-issues', component: KnownIssuesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
 // { path: 'faq', component: FaqComponent },
  { path: 'spot/inference', component: InferencesComponent },
  { path: 'spot/mood', component: MoodComponent },
  { path: 'spot/listening-time', component: ListeningTimeComponent },
  { path: 'spot/listening-time/songtimeline', component: SongtimelineComponent },
  { path: 'spot/general-data', component: GeneralDataComponent },
  { path: 'spot/dashboard', component: SpotDashboardComponent },
  { path: 'spot/top-artists', component: TopArtistsComponent },
  { path: 'spot/top-artists/:start/:end', component: TopArtistsComponent },
  { path: 'spot/privacy-instructions', component: SpotPrivacyInstructionsComponent },
  { path: 'spot/top-songs', component: TopSongsComponent },
  { path: 'spot/top-songs/:start/:end', component: TopSongsComponent },
  { path: 'insta/dashboard', component: InstaDashboardComponent },
  { path: 'insta/personal-info', component:Insta_PersonalInfoComponent },
  { path: 'insta/account', component:InstaAccountCreationLoginComponent },
  { path: 'insta/ads', component: InstaAdsComponent },
  { path: 'insta/followers', component: InstaFollowersComponent},
  { path: 'insta/likedcontent', component: InstaLikedContentComponent },
  { path: 'insta/contacts', component: InstaContactComponent },
  { path: 'face/dashboard', component: FaceDashboardComponent },
  { path: 'face/inferred-topics', component: InferredTopicsComponent },
  { path: 'serviceSelection', component: ServiceSelectionComponent },
  { path: 'face/ads-related-data', component: AdsRelatedDataComponent },
  { path: 'face/connections', component: FriendAndFollowersComponent },
  { path: 'face/configure-off-facebook-activity', component: OffFacebookActivityComponent },
  { path: 'face/guidelines-for-ads-settings', component: AdsSettingsComponent },
  { path: 'face/security-login', component: SecurityLoginDataComponent },
  { path: 'insta/searches', component: InstaSearchesComponent},
  { path: 'face/other-personal-info' ,component:OtherPersonalInfoComponent},
  { path: 'face/messages-info' ,component:MessagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
