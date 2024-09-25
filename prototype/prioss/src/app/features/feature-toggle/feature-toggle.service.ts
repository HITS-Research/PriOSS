import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * @enum {number}
 * @description Enumeration of available services using bitwise flags.
 */
export enum Services {
  None = 0,
  Instagram = 1 << 0,  // 1
  Facebook = 1 << 1,   // 2
  Spotify = 1 << 2,    // 4
  YouTube = 1 << 3,    // 8
  All = ~(~0 << 4)     // 15
}

/**
 * @description
 * FeatureToggleService is responsible for managing the state of enabled services.
 * It uses bitwise operations to efficiently store and manipulate the state of multiple services.
 */
@Injectable()
export class FeatureToggleService {
  /**
   * @description
   * A BehaviorSubject that holds the current state of enabled services.
   * Initialized with Services.None (0).
   */
  enabledServices = new BehaviorSubject<Services>(Services.None);

  /**
   * @description
   * Initializes the service by retrieving the enabled services from localStorage.
   * If no value is found in localStorage, it defaults to 0 (no services enabled).
   */
  constructor() {
    const stringValue: string | null = localStorage.getItem('enabledServices');
    const intValue: number = parseInt(stringValue ?? '0', 0);
    this.enabledServices.next(intValue);
  }

  /**
   * @description
   * Enables a specific service if it's not already enabled.
   * Updates the enabledServices BehaviorSubject and persists the change to localStorage.
   * @param {Services} service - The service to enable.
   */
  enableService(service: Services): void {
    if ((this.enabledServices.getValue() & service) !== service) {
      this.enabledServices.next(this.enabledServices.getValue() | service);
      localStorage.setItem('enabledServices', this.enabledServices.getValue().toString());
    }
  }

  /**
   * @description
   * Disables a specific service if it's currently enabled.
   * Updates the enabledServices BehaviorSubject and persists the change to localStorage.
   * @param {Services} service - The service to disable.
   */
  disableService(service: Services): void {
    if ((this.enabledServices.getValue() & service) === service) {
      this.enabledServices.next(this.enabledServices.getValue() | service);
      localStorage.setItem('enabledServices', this.enabledServices.getValue().toString());
    }
  }
}