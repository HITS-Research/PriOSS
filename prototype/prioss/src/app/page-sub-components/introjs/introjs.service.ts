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
  spotifyTourCompleted = false;
  facebookTourCompleted = false;
  instagramTourCompleted = false;

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
      disableInteraction: true,
      steps: [
        {
          element: 'step0',
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
          element: '#gdpr',
          intro: 'This section explains your rights about data collection backed by the GDPR.'
        },
        {
          element: '#step6',
          intro: 'Want to know why Spotify collects data about all your actions and activities? Look here!'
        },
        {
          element: '#faq',
          intro: 'You have more questions about this application? Stay right here.'
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
      disableInteraction: true,
      steps: [
        {
          element: 'step0',
          intro: 'New here? Click <b>Next</b>! <br><br> Already comfortable? <br> <b>Click</b> anywhere into the dashboard!'
        },
        {
          element: '#yourInfo',
          intro: 'This section shows your personal data that Facebook has collected. Click <b>More</b> to see details.'
        },
        {
          element: '#visualization',
          intro: 'This section visualizes your data in more understandable way. This helps make you aware of what data Facebook has about you, and allows you to analyze it for its correctness. Being aware enables you to take best Privacy decisions!.'

        },
        // {
        //   element: '#fStep20',
        //   intro: 'This tile gives you more information about Ads-related data. Click <b>More</b> to see what information Facebook has been tracking related to your interaction with Ads.'
        // },
        // {
        //   element: '#fStep21',
        //   intro: 'This tile lists the inferences made by Facebook based on your profile activity - be it posts you liked, videos you watched, Ads you have clicked!'
        // },
        // {
        //   element: '#fStep22',
        //   intro: 'This tile gives a gist of your Facebook connections. Click <b>More</b> to see year-wise details.'
        // },
        {
          element: '#rectification',
          intro: 'This section shows instructions to change your personal data to manage your personalized Ads. Follow the instructions to manage your data.'
        },
        // {
        //   element: '#fStep23',
        //   intro: 'This tile gives information about guidelines to turn OFF Off-Site Interactions(Off-Facebook Activity).'
        // },
        // {
        //   element: '#fStep24',
        //   intro: 'This tile gives information about guidelines to hide ads.'
        // },
        // {
        //   element: '#fStep70',
        //   intro: 'This tile illustrates the steps to object the use of your personal information to show personalized ads.'
        // },
        {
          element: '#privacyRecommendations',
          intro: 'This section gives you step-by-step instructions to excercise your privacy rights on Facebook website. Choose an action of your interest and follow the instructions to ensure your data privacy.'
        },
        {
          element: '#gdpr',
          intro: 'This section explains what is <b>G</b>eneral <b>D</b>ata <b>P</b>rotection <b>R</b>egulation (GDPR) and explains your GDPR privacy rights. Click to know more!'
        },
        {
          element: '#purpose',
          intro: 'This section explains the purpose of collecting your data while tracking all your activities on Facebook.'
        },
        {
          element: '#faq',
          intro: 'You have more questions about this application? Click to see answers.'
        }
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
      disableInteraction: true,
      steps: [
        {
          element: '#welcome',
          intro: 'New here? Click <b>Next</b>! <br><br> Already comfortable? <br> <b>Click</b> into the dashboard!'
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
          element:'#recommendation',
          intro: 'This section gives you recommendations about your privacy settings.'
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
        }
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
