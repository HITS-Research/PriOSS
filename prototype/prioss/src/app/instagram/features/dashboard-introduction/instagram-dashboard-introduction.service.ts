import { Injectable, inject } from '@angular/core';
import { Options } from 'intro.js/src/option';
import { IntrojsService } from 'src/app/features/dashboard-introduction/introjs.service';

/**
 * This service handles the instagram-dashboard-tour (tutorial) for the user.
 */
@Injectable({
  providedIn: 'root'
})
export class InstagramDashboardIntroductionService {

  #IntrojsService = inject(IntrojsService);

  /**
   * The ID of this tour.
   */
  get name(): string {
    return 'instagram-dashboard-tour';
  }

  /**
   * The options for the instagram-dashboard-tour.
   */
  get options(): Partial<Options> {
    return {
      disableInteraction: true,
      steps: [
        {
          element: undefined,
          intro: 'New here? Click <b>Next</b>! <br><br> Already comfortable? <br> <b>Click</b> into the dashboard!'
        },
        {
          element: '#introduction-block',
          intro: 'This is a short introduction what PriOSS-Instagram can do for you.'
        },
        {
          element: '[title="Visualization"]',
          intro: 'Here you can see the visualization of your data collected by Instagram.'
        },
        {
          element: '#personalInformation',
          intro: 'For example this card contains all personal information that Instagram has collected. To see more details click on "More".'
        },
        {
          element: '[title="Rectification"]',
          intro: 'This section shows how you can rectify your data in Instagram.'
        },
        {
          element: '[title="Privacy Recommendations"]',
          intro: 'This section gives you recommendations about your privacy settings.'
        },
        {
          element: '#offlineIndicator',
          intro: 'This indicator displays whether you are <b>Connected/Disconnected</b> to internet.<br/> A <b>Red</b> Wifi icon means you are connected.<br/>A <b>Green</b> wifi icon means you are disconnected.<br/>This is to make sure that you are aware of <b>Secure Offline Application Usage</b>. <br/>You can disconnect from the internet and still use all the functionality, to be sure that your data is not sent anywhere.'
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
