import { Routes } from '@angular/router';
import { facebookRoutes } from './facebook/facebook.routes';
import { AboutComponent } from './framework/pages/about/about.component';
import { ContactComponent } from './framework/pages/contact/contact.component';
import { DarkPatternsComponent } from './framework/pages/dark_patterns/dark_patterns.component';
import { DataDownloadInstructionsComponent } from './framework/pages/data-download-instructions/data-download-instructions.component';
import { FaqComponent } from './framework/pages/faq/faq.component';
import { GdprComponent } from './framework/pages/gdpr/gdpr.component';
import { KnownIssuesComponent } from './framework/pages/known-issues/known-issues.component';
import { ServiceSelectionComponent } from './framework/pages/service-selection/service-selection.component';
import { WelcomeMessageComponent } from './framework/pages/welcome/welcome.component';
import { instagramRoutes } from './instagram/instagram.routes';
import { spotifyRoutes } from './spotify/spotify.routes';
import {youtubeRoutes} from "./youtube/youtube.routes";

export const routes: Routes = [
  { path: 'home', component: ServiceSelectionComponent },
  { path: 'dark-patterns', component: DarkPatternsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'known-issues', component: KnownIssuesComponent },
  { path: 'serviceSelection', component: ServiceSelectionComponent },
  {
    path: 'serviceSelection/dataDownload',
    component: DataDownloadInstructionsComponent,
  },
  { path: 'faq', component: FaqComponent },
  { path: 'gdpr', component: GdprComponent },
  { path: 'welcome', component: WelcomeMessageComponent },
  ...spotifyRoutes,
  ...facebookRoutes,
  ...instagramRoutes,
  ...youtubeRoutes,
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
