import { Injectable } from '@angular/core';
import introJs, { Options } from 'intro.js';


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

  /**
   *
   * @param name The unique name of the tour.
   * @param options The specific options of the product for the tour.
   */
  startTour(name: string, restart: boolean, options: Options): void {
    if (!restart && this.#isTourDone(name)) return;

    document.body.style.overflow = 'hidden';
    introJs()
      .setOptions(options)
      .onexit(() => this.#stopTour())
      .start();

    this.#setTourDone(name);
  }

  /**
   * The execution of the cleaning-process after the tour.
   */
  #stopTour(): void {
    document.body.style.removeProperty('overflow');
  }

  /**
   * Checks whether the user already completed the tour of a specific product.
   * @param name The unique name of the tour.
   * @returns A boolean value of the completed-state of one specific tour.
   */
  #isTourDone(name: string): boolean {
    return localStorage.getItem(name) === '1';
  }

  /**
   * Sets the completed-state of one specific product.
   * @param name The unique name of the tour.
   */
  #setTourDone(name: string): void {
    localStorage.setItem(name, '1');
  }

}
