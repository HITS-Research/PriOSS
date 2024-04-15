import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { SpotifyDashboardIntroductionService } from '../../features/dashboard-introduction/spotify-dashboard-introduction.service';

/**
 * This component is the root component for spotify's dashboard page.
 * This page is shown once a user has successfully uploaded their spotify data-download.
 */
@Component({
  selector: 'prioss-spotify-dashboard',
  templateUrl: './spotify-dashboard.component.html',
  styleUrls: ['./spotify-dashboard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
