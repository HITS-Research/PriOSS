import { Injectable } from '@angular/core';
import introJs from 'intro.js';


/**
 * This service is used to avoid redundant intro.js code. A tour can be specified like seen in @method spotifyDashboardTour.
 * The method can then be called in a component, e.g., the @component spot-dashboard.
 * 
 * @author: Sven (svenf@mail.upb.de)
 */
@Injectable({
  providedIn: 'root'
})
export class IntrojsService {

  introJS: any = null;
  spotifyTourCompleted: boolean = false;

  /**
   * This method configures introJs. It sets the text for the steps of the tour.
   * element is the id of the html element which will highlighted by introJs.
   * This method also starts the tour.
   * 
   * @author: Sven (svenf@mail.upb.de)
   */
  spotifyDashboardTour() {
    this.introJS = introJs();
    this.introJS.setOptions({
      steps: [
        {
          element: '#step1',
          intro: 'This is the first step!'
        },
        {
          element: '#step2',
          intro: 'This is the second step!'
        },
        // more steps here...
      ]
    }).start();
  }

  /**
   * Simple setter.
   * @param completed.
   * 
   * @author: Sven (svenf@mail.upb.de)
   */
  setSpotifyTourCompleted(completed: boolean) {
    this.spotifyTourCompleted = completed;
  }

   /**
   * Simple getter. 
   * @returns spotifyTourCompleted value. 
   * 
   * @author: Sven (svenf@mail.upb.de)
   */
  isSpotifyTourCompleted(): boolean {
    return this.spotifyTourCompleted;
  }
}
