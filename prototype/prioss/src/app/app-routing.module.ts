import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaceDashboardComponent } from './dashboards/face-dashboard/face-dashboard.component';
import { InstaDashboardComponent } from './dashboards/insta-dashboard/insta-dashboard.component';
import {Insta_PersonalInfoComponent} from './visualizations/instagram/Insta_personal-info/personal-info.component';
import { InstaAccountCreationLoginComponent } from './visualizations/instagram/insta-account-creation-login/insta-account-creation-login.component';
import { InstaAdsComponent } from './visualizations/instagram/insta-ads/insta-ads.component';
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

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'spot/inference', component: InferencesComponent },
  { path: 'spot/mood', component: MoodComponent },
  { path: 'spot/listening-time', component: ListeningTimeComponent },
  { path: 'spot/general-data', component: GeneralDataComponent },
  { path: 'spot/dashboard', component: SpotDashboardComponent },
  { path: 'spot/top-artists', component: TopArtistsComponent },
  { path: 'spot/top-songs', component: TopSongsComponent },
  { path: 'insta/dashboard', component: InstaDashboardComponent },
  { path: 'insta/personal-info', component:Insta_PersonalInfoComponent },
  { path: 'insta/account', component:InstaAccountCreationLoginComponent },
  { path: 'insta/ads', component: InstaAdsComponent },
  { path: 'face/dashboard', component: FaceDashboardComponent },
  { path: 'face/inferred-topics', component: InferredTopicsComponent },
  { path: 'serviceSelection', component: ServiceSelectionComponent },
  { path: 'face/ads-related-data', component: AdsRelatedDataComponent },
  { path: 'face/friendsandfollowers', component: FriendAndFollowersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
