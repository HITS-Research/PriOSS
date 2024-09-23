import {Routes} from "@angular/router";
import {youtubeGuard} from "../guards/youtube.guard";
import {YoutubeDashboardComponent} from "./pages/youtube-dashboard/youtube-dashboard.component";
import {YoutubeProfileComponent} from "./pages/youtube-profile/youtube-profile.component";
import {YoutubeChannelVideoComponent} from "./pages/youtube-channel-video/youtube-channel-video.component";
import {YoutubeSubscriptionComponent} from "./pages/youtube-subscription/youtube-subscription.component";
import {YoutubeCommentComponent} from "./pages/youtube-comment/youtube-comment.component";
import {YoutubeChatComponent} from "./pages/youtube-chat/youtube-chat.component";
import {YoutubePlaylistComponent} from "./pages/youtube-playlist/youtube-playlist.component";
import {YoutubeHistoryComponent} from "./pages/youtube-history/youtube-history.component";

export const youtubeRoutes : Routes = [
  {
    path: 'youtube',
    canActivateChild: [youtubeGuard],
    children: [
      { path: 'dashboard', component: YoutubeDashboardComponent },
      { path: 'profile', component: YoutubeProfileComponent },
      { path: 'channel&videos', component: YoutubeChannelVideoComponent },
      { path: 'subscription', component: YoutubeSubscriptionComponent },
      { path: 'comments', component: YoutubeCommentComponent },
      { path: 'messages', component: YoutubeChatComponent },
      { path: 'playlists', component: YoutubePlaylistComponent },
      { path: 'search&watch', component: YoutubeHistoryComponent },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
]
