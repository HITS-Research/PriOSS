import { Injectable, inject } from '@angular/core';
import { IntrojsService } from 'src/app/features/dashboard-introduction/introjs.service';
import {Options} from "intro.js/src/option";

/**
 * This service handles the youtube-dashboard-tour (tutorial) for the user.
 */
@Injectable({
  providedIn: 'root',
})
export class YouTubeDashboardIntroductionService {
  #IntrojsService = inject(IntrojsService);

  /**
   * The ID of this tour.
   */
  get name(): string {
    return 'youtube-dashboard-tour';
  }

  /**
   * The options for the youtube-dashboard-tour.
   */
  get options(): Partial<Options> {
    return {
      disableInteraction: true,
      steps: [
        {
          element: undefined,
          intro:
            'New here? Click <b>Next</b>! <br><br> Already comfortable? <br> <b>Click</b> anywhere into the dashboard!',
        },
        {
          element: '#step1',
          intro:
            'This section shows your personal data that YouTube has collected. Click <b>Explore</b> to see details.',
        },
        {
          element: '[title="Visualization"]',
          intro:
            'This section visualizes your data in more understandable way. This helps make you aware of what data YouTube collects about you, and allows you to analyze it for its correctness. Being aware enables you to take best Privacy decisions!.',
        },
        {
          element: '[title="Rectification"]',
          intro:
            'This section outlines how to contact YouTube support for account or channel issues.',
        },
        {
          element: '[title="Privacy Recommendations"]',
          intro:
            'This section gives you step-by-step instructions to excercise your privacy rights on YouTube. Choose an action of your interest and follow the instructions to ensure your data privacy.',
        },
        {
          element: 'app-youtube-purposes',
          intro:
            'This section explains the purpose of collecting your data while tracking all your activities on YouTube.',
        },
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
