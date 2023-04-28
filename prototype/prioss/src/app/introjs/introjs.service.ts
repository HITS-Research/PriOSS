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
  introJSF: any = null;
  introJSI: any = null;
  spotifyTourCompleted: boolean = false;
  facebookTourCompleted: boolean = false;
  instagramTourCompleted: boolean = false;

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
          element: 'step0',
          intro: 'New here? Click <b>Next</b> for a quick tour of this dashboard! <br><br> Already comfortable? <br> <b>Click</b> somewhere else on the dashboard!'
        },
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

  /**
   * This method configures introJSF.
   * @author: Deepa (dbelvi@mail.upb.de)
   */
  facebookDashboardTour() {
    this.introJSF = introJs();
    this.introJSF.setOptions({
      steps: [
        {
          element: 'step0',
          intro: 'New here? Click <b>Next</b>! <br><br> Already comfortable? <br> <b>Click</b> into the dashboard!'
        },
        {
          element: '#fStep10',
          intro: 'Your Personal Data'
        },
        {
          element: '#fStep20',
          intro: 'Click to see more about your Ads related Data. See how Facebook tracks your activity to show you fitting Ads while you surf through Facebook'
        },
        {
          element: '#fStep21',
          intro: 'Click to see Facebook inferences based on your activity. Be it posts you liked, videos you watched, Ads you have clicked!'
        },
        {
          element: '#fStep22',
          intro: 'Click to see a gist of your Friends, Followers, and more!'
        },
        {
          element: '#fStep30',
          intro: 'This section shows how you can rectify your data in Facebook'
        },
        {
          element: '#fStep40',
          intro: 'This section explains the instructions to exercise your GDPR rights. Click to know more!'
        },
        {
          element: '#fStep50',
          intro: 'Want to know why Facebook collects data about all your actions and activities? Click here!'
        },
        {
          element: '#fStep60',
          intro: 'You have more questions about this application? Click to see answers.'
        },
        // more steps here...
      ]
    }).start();
  }

  /**
   * Simple setter.
   * @param completed.
   * 
   * @author: Deepa (dbelvi@mail.upb.de)
   */
  setFacebookTourCompleted(completed: boolean) {
    this.facebookTourCompleted = completed;
  }

   /**
   * Simple getter. 
   * @returns facebookTourCompleted value. 
   * 
   * @author: Deepa (dbelvi@mail.upb.de)
   */
  isFacebookTourCompleted(): boolean {
    return this.facebookTourCompleted;
  }

   /**
   * This method configures introJSI.
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
   instagramDashboardTour() {
    this.introJSI = introJs();
    this.introJSI.setOptions({
      steps: [
        {
          element: '#welcome',
          intro: 'Welcome to our tour for the Instagram dashboard.'
        },
        {
          element: '#introduction',
          intro: 'This is a short introduction what PriOSS-Instagram can do for you.'
        },
        {
          element: '#visualization',
          intro: 'Here you can see the visualization of your data collected by Instagram.'
        },
        {
          element: '#personalInformation',
          intro: 'For example this card contains all personal information that Instagram has collected. To see more details click on "More".'
        },
        {
          element: '#rectification',
          intro: 'This section shows how you can rectify your data in Instagram.'
        },
        {
          element: '#gdpr',
          intro: 'This section explains the instructions to exercise your GDPR rights.'
        },
        {
          element: '#purpose',
          intro: 'Want to know why Instagram collects data about all your actions and activities? Look here!'
        },
        {
          element: '#faq',
          intro: 'You have more questions about this application? Click to see answers.'
        },
        // more steps here...
      ]
    }).start();
  }

  /**
   * Simple setter.
   * @param completed.
   * 
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  setInstagramTourCompleted(completed: boolean) {
    this.instagramTourCompleted = completed;
  }

   /**
   * Simple getter. 
   * @returns finstagramTourCompleted value. 
   * 
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  isInstagramTourCompleted(): boolean {
    return this.instagramTourCompleted;
  }
}
