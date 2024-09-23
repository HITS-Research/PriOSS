import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { FacebookDataFile } from 'src/app/facebook/models/FacebookDataFile.interface';
import { facebookServiceInfo } from 'src/app/facebook/state/facebook.service-info';
import { FeatureToggleService } from 'src/app/features/feature-toggle/feature-toggle.service';
import { OfflineIndicatorComponent } from 'src/app/features/offline-indicator/offline-indicator.component';
import { instagramServiceInfo } from 'src/app/instagram/state/instagram.service-info';
import { SpotifyReset } from 'src/app/spotify/state/spotify.action';
import { spotifyServiceInfo } from 'src/app/spotify/state/spotify.service-info';
import { IndexedDbService } from 'src/app/state/indexed-db.state';
import { ResetFbUserData } from '../../../facebook/state/fb.action';
import { ResetInstaUserData } from '../../../instagram/state/insta.action';
import { AppType } from './app-type';
import { ServiceInfo } from './service-info.type';
import { isZipFile } from './zip-file.helper';
import {youtubeServiceInfo} from "../../../youtube/service/youtube.service.info";
import {ResetYouTubeUserData} from "../../../youtube/state/youtube.action";
import { DatePipe } from '@angular/common';
import { CapitalizePipe } from "../../../features/naming/capitalize.pipe";

/**
 * This component is responsible for offering the user a way to select a service, show the respective download instructions
 * and offer a field where the user can upload the data-download. With uploaded data, the user can press a button to
 * parse the data and go to the dashboard of the respective service
 */
@Component({
  templateUrl: './service-selection.component.html',
  styleUrls: ['./service-selection.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DatePipe,
    NzAlertModule,
    NzButtonModule,
    NzCardModule,
    NzModalModule,
    NzProgressModule,
    OfflineIndicatorComponent,
    RouterModule,
    CapitalizePipe
]
})
export class ServiceSelectionComponent implements AfterViewInit {
  Math = Math;

  #router = inject(Router);

  #http = inject(HttpClient);

  #store = inject(Store);

  #indexedDb = inject(IndexedDbService);

  #featureToggleService = inject(FeatureToggleService);

  appType: typeof AppType = AppType;

  /**
   * All the available services.
   */
  services = signal<ServiceInfo[]>(
    [facebookServiceInfo, instagramServiceInfo, spotifyServiceInfo, youtubeServiceInfo].toSorted(
      (a, b) => a.name.localeCompare(b.name),
    ),
  );

  /**
   * The previous data exports from facebook.
   */
  previousFacebookDataExports = signal<FacebookDataFile[]>([]);
  /**
   * The current selected service by the user.
   */
  selectedService = signal<ServiceInfo | null>(null);

  /**
   * The name of the current selected service by the user.
   */
  selectedServiceName = computed(() => this.selectedService()?.name ?? null);

  /**
   * The readonly instance of the selected files.
   * Can only be created by the input[type="file"] element.
   */
  selectedFileList = signal<FileList | null>(null);

  /**
   * The downloaded sample-data files by the user.
   */
  selectedSampleFiles = signal<File[] | null>(null);

  /**
   * The list of all selected files as an Array.
   */
  selectedFiles = computed(() => {
    const uploadedFiles = Array.from(this.selectedFileList() ?? []);
    const sampleFiles = this.selectedSampleFiles();
    return sampleFiles ?? uploadedFiles ?? [];
  });

  /**
   * The string of all names of all selected files.
   */
  selectedFileNames = computed(() => {
    const files = this.selectedFiles();
    if (!files) return '';
    return files.map(f => f.name).join(', ');
  });

  /**
   * The current selected popup by the user.
   */
  selectedPopup = signal<'' | 'data-select' | 'upload'>('');

  /**
   * The state of the current fileprocessing.
   */
  isProcessingFile = signal<boolean>(false);

  /**
   * The state of the progressbar.
   */
  progressBarPercent = signal<number>(0);

  /**
   * The upload dialog visibility state.
   */
  uploadDialogVisible = signal<boolean>(false);

  /**
   * The visible state of the progressbar.
   */
  progressBarVisible = signal<boolean>(false);

  /**
   * The signal to abort the file-upload and processing.
   */
  requestedAbortDataParsing = signal<boolean>(false);

  /**
   * The current error message.
   */
  errorMsg = '';

  /**
   * Processes the current selected file for the current selected service.
   */
  async processFile(): Promise<void> {
    const service = this.selectedService();
    if (!service) return;

    const file = this.selectedFiles().at(0);
    if (!file || !isZipFile(file)) {
      this.errorMsg =
        'Please select a valid data-download zip-file first! Read the download instructions for more information';
      this.uploadDialogVisible.set(true);
      this.progressBarVisible.set(false);
      this.isProcessingFile.set(false);
      return;
    }

    this.progressBarPercent.set(0);
    this.progressBarVisible.set(true);
    this.isProcessingFile.set(true);

    this.#indexedDb.setSelectedServiceStore(this.selectedServiceName(), file.name);
    this.#store
      .dispatch(
        await service.parserFunction(
          file,
          this.progressBarPercent,
          this.requestedAbortDataParsing,
          this.#indexedDb
        ),
      )
      .subscribe(() => {
        this.progressBarPercent.set(100);
        this.progressBarVisible.set(false);
        this.isProcessingFile.set(false);

        if (this.requestedAbortDataParsing()) {
          this.requestedAbortDataParsing.set(false);
          return;
        }

        this.#featureToggleService.enableService(service.serviceType);

        this.#router.navigate([service.routerSubPath, 'dashboard']);
      });
  }

  /**
   * Callback when user clicks the button to use sample data instead of their personal data download.
   * Sets the sample data zip file of the provided service to be the selected file and then triggers the normal file parsing workflow.
   */
  processSampleData() {
    const sampleFileUrl = this.selectedService()?.sampleFileUrl;
    if (!sampleFileUrl) return;
    this.#http
      .get(sampleFileUrl, { responseType: 'blob' })
      .subscribe(sampleData => {
        const fileBits = [sampleData];
        const fileName = 'sample_data.zip';
        const options = { type: 'application/zip' };
        const files = [new File(fileBits, fileName, options)];
        this.selectedSampleFiles.set(files);
        this.processFile().then();
      });
  }

  async processPreviousDataExport(service: ServiceInfo | null, fileName: string) {
    if (!service) return;
    console.log('Selected Service: ', service);
    await this.#indexedDb.setSelectedServiceStore(service.name, fileName)
    .then(() => {
      if(service.name === AppType.Facebook){
        this.#indexedDb.getSelectedFacebookDataStore();
      }
    }).finally(() => {
      this.#router.navigate([service.routerSubPath, 'dashboard']);
    });
  }
  async deleteDataExport(service: ServiceInfo | null, fileName: string) {
    if (!service) return;
    await this.#indexedDb.deleteUserDataStore(service.name, fileName)
    .then(() => {
      this.#indexedDb.getAllFacebookUserDataStores().then((data) => {
        if(data){
          this.previousFacebookDataExports.set(data);
        }
      });
    });

  }


  /**
   * Callback called by angular after the view is initialized. Triggers rebuilding of the sql database
   */
  async ngAfterViewInit() {
    await this.#indexedDb.getAllFacebookUserDataStores().then((data) => {
      if(data){
        this.previousFacebookDataExports.set(data);
      }
    });
    this.#store.dispatch([
      new ResetInstaUserData(),
      new ResetFbUserData(),
      new SpotifyReset(),
      new ResetYouTubeUserData()
    ]);
  }

  /**
   * Callback called when pressing the X-button in the progressbar dialog. Stops the reading in process.
   *
   * @author: Simon (scg@mail.upb.de)
   *
   */
  async abortDataParsing() {
    this.progressBarVisible.set(false);
    this.requestedAbortDataParsing.set(true);
  }
}
