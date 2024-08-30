import { Routes } from "@angular/router";
import { facebookGuard } from "../guards/facebook.guard";
import { AdsRelatedDataComponent } from "./pages/ads-related-data/ads-related-data.component";
import { AdsSettingsComponent } from "./pages/ads-settings/ads-settings.component";
import { FaceDashboardComponent } from "./pages/face-dashboard/face-dashboard.component";
import { FacePurposesComponent } from "./pages/face-purposes/face-purposes.component";
import { FriendAndFollowersComponent } from "./pages/friend-and-followers/friend-and-followers.component";
import { GeneralDataComponent } from "./pages/general-data/general-data.component";
import { GroupsAndEventsDataComponent } from "./pages/groups-and-events-data/groups-and-events-data.component";
import { InferredTopicsComponent } from "./pages/inferred-topics/inferred-topics.component";
import { FacebookMediaComponent } from "./pages/media/media.component";
import { MessagesComponent } from "./pages/messages/messages.component";
import { OffFacebookActivityComponent } from "./pages/off-facebook-activity/off-facebook-activity.component";
import { OtherPersonalInfoComponent } from "./pages/other-personal-info/other-personal-info.component";
import { PostsComponent } from "./pages/posts/posts.component";
import { SecurityLoginDataComponent } from "./pages/security-login-data/security-login-data.component";
import { YourTopicsComponent } from "./pages/your-topics/your-topics.component";

export const facebookRoutes: Routes = [
  {
    path: 'facebook',
    canActivateChild: [facebookGuard],
    children: [
      { path: 'ads-related-data', component: AdsRelatedDataComponent },
      { path: 'media', component: FacebookMediaComponent},
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
];
