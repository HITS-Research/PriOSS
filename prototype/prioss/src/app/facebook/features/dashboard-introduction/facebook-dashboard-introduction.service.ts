import { Injectable, inject } from '@angular/core';
import { IntrojsService } from 'src/app/features/dashboard-introduction/introjs.service';

/**
 * This service handles the facebook-dashboard-tour (tutorial) for the user.
 */
@Injectable({
  providedIn: 'root',
})
export class FacebookDashboardIntroductionService {
  #IntrojsService = inject(IntrojsService);

  /**
   * The ID of this tour.
   */
  get name(): string {
    return 'facebook-dashboard-tour';
  }

  /**
   * The options for the facebook-dashboard-tour.
   */
  get options(): introJs.Options {
    return {
      disableInteraction: true,
      steps: [
        {
          element: 'step0',
          intro:
            'New here? Click <b>Next</b>! <br><br> Already comfortable? <br> <b>Click</b> anywhere into the dashboard!',
        },
        {
          element: '#yourInfo',
          intro:
            'This section shows your personal data that Facebook has collected. Click <b>More</b> to see details.',
        },
        {
          element: '#visualization',
          intro:
            'This section visualizes your data in more understandable way. This helps make you aware of what data Facebook has about you, and allows you to analyze it for its correctness. Being aware enables you to take best Privacy decisions!.',
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
          intro:
            'This section shows instructions to change your personal data to manage your personalized Ads. Follow the instructions to manage your data.',
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
          intro:
            'This section gives you step-by-step instructions to excercise your privacy rights on Facebook website. Choose an action of your interest and follow the instructions to ensure your data privacy.',
        },
        {
          element: '#gdpr',
          intro:
            'This section explains what is <b>G</b>eneral <b>D</b>ata <b>P</b>rotection <b>R</b>egulation (GDPR) and explains your GDPR privacy rights. Click to know more!',
        },
        {
          element: '#purpose',
          intro:
            'This section explains the purpose of collecting your data while tracking all your activities on Facebook.',
        },
        {
          element: '#faq',
          intro:
            'You have more questions about this application? Click to see answers.',
        },
        // more steps here...
      ],
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
