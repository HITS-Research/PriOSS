import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacebookFriendsGeneralInfoComponent } from './pages/friend-and-followers/features/friends-statistics/features/facebook-friends-general-info/facebook-friends-general-info.component';
import { FacebookFriendsAndFollowersModule } from './pages/friend-and-followers/friends-and-followers.module';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FacebookFriendsGeneralInfoComponent,
    FacebookFriendsAndFollowersModule,

  ]
})
export class FacebookModule { }
