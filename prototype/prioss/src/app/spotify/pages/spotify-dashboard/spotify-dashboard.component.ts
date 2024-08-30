import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { SpotifyDashboardIntroductionService } from '../../features/dashboard-introduction/spotify-dashboard-introduction.service';
import { WelcomeMessageComponent } from 'src/app/framework/pages/welcome/welcome.component';
import { AccordionComponent } from 'src/app/features/accordion/accordion.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { DashCardComponent } from 'src/app/features/dash-card/dash-card.component';
import { SpotifyUserDataComponent } from '../spotify-user-data/spotify-user-data.component';
import { ListeningTimeComponent } from '../listening-time/listening-time.component';
import { SpotifyTopSongArtistsComponent } from '../spotif-top-song-artists/spotify-top-song-artists.component';
import { TopSongsComponent } from '../top-songs/top-songs.component';
import { SpotifyTopPodcastsComponent } from '../spotify-top-podcasts/spotify-top-podcasts.component';
import { MoodComponent } from '../mood/mood.component';
import { SpotifySearchHistoryComponent } from '../spotify-search-history/spotify-search-history.component';
import { InferencesComponent } from '../inferences/inferences.component';
import { SettingsFormComponent } from 'src/app/features/settings-form/settings-form.component';
import { HelpButtonComponent } from 'src/app/features/help-button/help-button.component';
import { OfflineIndicatorComponent } from 'src/app/features/offline-indicator/offline-indicator.component';
import { PurposesComponent } from '../../features/purposes/purposes.component';

/**
 * This component is the root component for spotify's dashboard page.
 * This page is shown once a user has successfully uploaded their spotify data-download.
 */
@Component({
  selector: 'prioss-spotify-dashboard',
  templateUrl: './spotify-dashboard.component.html',
  styleUrls: ['./spotify-dashboard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AccordionComponent,
    DashCardComponent,
    HelpButtonComponent,
    InferencesComponent,
    ListeningTimeComponent,
    MoodComponent,
    NzGridModule,
    OfflineIndicatorComponent,
    PurposesComponent,
    SettingsFormComponent,
    SpotifySearchHistoryComponent,
    SpotifyTopPodcastsComponent,
    SpotifyTopSongArtistsComponent,
    SpotifyUserDataComponent,
    TopSongsComponent,
    WelcomeMessageComponent,
  ],
})
export class SpotifyDashboardComponent implements AfterViewInit {
  /**
   * Tour of Dashboard
   */
  #introductionService = inject(SpotifyDashboardIntroductionService);

  /**
   * It starts the tour and sets param tourCompleted in the service introjs to true.
   * The boolean is set so not every time the page is navigated to, the tour starts again.
   */
  ngAfterViewInit(): void {
    this.#introductionService.start();
  }

  /**
   * This method is called on button click and starts the tour.
   */
  startTour() {
    this.#introductionService.start(true);
  }
}
