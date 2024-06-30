import { Injectable, inject } from '@angular/core';
import { IntrojsService } from 'src/app/features/dashboard-introduction/introjs.service';

/**
 * This service handles the spotify-dashboard-tour (tutorial) for the user.
 */
@Injectable({
  providedIn: 'root'
})
export class SpotifyDashboardIntroductionService {

  #IntrojsService = inject(IntrojsService);

  /**
   * The ID of this tour.
   */
  get name(): string {
    return 'spotify-dashboard-tour';
  }

  /**
   * The options for the spotify-dashboard-tour.
   */
  get options(): introJs.Options {
    return {
      disableInteraction: true,
      steps: [
        {
          element: 'introduction-intro',
          intro: 'New here? Click <b>Next</b> for a quick tour of this dashboard! <br><br> Already comfortable? <br> <b>Click</b> somewhere else on the dashboard!'
        },
        {
          element: '#step1',
          intro: 'This card contains all personal information that Spotify has collected. To see more details on such cards, hover over the (?)-icon and click on the card (this doesn\'t work during this tour).'
        },
        {
          element: '#step3',
          intro: 'Here you can see the visualization of your listening time.'
        },
        {
          element: '#step4',
          intro: 'Click this card to see your favorite artists and songs!'
        },
        {
          element: '#step-inferences',
          intro: 'This card shows all inferences Spotify has made about you. You can correct them here by sending Spotify an email with the selected inferences!'
        },
        {
          element: '#step6',
          intro: 'Want to know why Spotify collects data about all your actions and activities? Look here!'
        },
        // more steps here...
      ]
    };
  }

  /**
   * Starts the tour on the dashboard.
   * @param restart Ignores the completed-state of the tour.
   */
  start(restart: boolean = false): void {
    this.#IntrojsService.startTour(this.name, restart, this.options);
  }


}
