import JSZip from 'jszip';
import { Services } from 'src/app/features/feature-toggle/feature-toggle.service';
import { AppType } from 'src/app/framework/pages/service-selection/app-type';
import { ServiceInfo } from 'src/app/framework/pages/service-selection/service-info.type';
import { isZipFile } from 'src/app/framework/pages/service-selection/zip-file.helper';
import { parseFacebookFile } from './file-process';

/**
 * The facebook service info.
 */
export const facebookServiceInfo: ServiceInfo = {
  name: AppType.Facebook,
  logoUrl: 'assets/images/brand/facebook/Facebook_Logo_Secondary.png',
  sampleFileUrl: 'assets/sample-data/facebook_data_marcia_2023_12_20.zip',
  background: '#1877F2',
  brandColor: '#1877F2',
  routerSubPath: 'face',
  serviceType: Services.Facebook,
  parserFunction: async (
    file,
    progressBarPercent,
    requestedAbortDataParsing,
    indexedDbService
  ) => {
    if (!file || !isZipFile(file)) return null;
    const zip = new JSZip();
    return await parseFacebookFile(
      zip.loadAsync(file),
      progressBarPercent,
      requestedAbortDataParsing,
      indexedDbService,
      file.name,
      file.size
    );
  },
};
