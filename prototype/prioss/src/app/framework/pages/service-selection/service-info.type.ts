import { WritableSignal } from '@angular/core';
import { Services } from 'src/app/features/feature-toggle/feature-toggle.service';
import { AppType } from './app-type';
import { IndexedDbService } from 'src/app/state/indexed-db.state';

export type ServiceInfo = {
  /**
   * The name of this service.
   */
  name: AppType;

  /**
   * The logo url of this service.
   */
  logoUrl: string;

  /**
   * The url to the sample-data-file.
   */
  sampleFileUrl: string;

  /**
   * The background-color for the service-selection.
   */
  background: string;

  /**
   * The brand-color for the service-selection.
   */
  brandColor: string;

  /**
   * The router-sub-path to the service itself.
   */
  routerSubPath: string;

  /**
   * The service-type of this service.
   */
  serviceType: Services;

  /**
   * Returns the Action which will lead to the upload of the given file.
   * @param file The file, which the user uploaded or selected by the sample-data.
   * @param progressBarPercent The signal for the progressbar.
   * @param requestedAbortDataParsing The signal for the abort-action.
   * @returns Returns the action, which can be processed by the ngxs store.
   */
  parserFunction: (
    file: File,
    progressBarPercent: WritableSignal<number>,
    requestedAbortDataParsing: WritableSignal<boolean>,
    indexedDbService: IndexedDbService
  ) => unknown;
};
