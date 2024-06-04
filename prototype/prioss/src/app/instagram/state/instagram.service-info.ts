import JSZip from 'jszip';
import { Services } from 'src/app/features/feature-toggle/feature-toggle.service';
import { AppType } from 'src/app/framework/pages/service-selection/app-type';
import { ServiceInfo } from 'src/app/framework/pages/service-selection/service-info.type';
import { isZipFile } from 'src/app/framework/pages/service-selection/zip-file.helper';
import { parseInstagramFile } from './file-process';

export const instagramServiceInfo: ServiceInfo = {
  name: AppType.Instagram,
  logoUrl: 'assets/images/brand/instagram/Instagram_Glyph_White.svg',
  sampleFileUrl: 'assets/sample-data/insta_sampledata.zip',
  background: 'linear-gradient(-90deg, #B900B3 27%, #F50000)',
  brandColor: 'linear-gradient(-90deg, #B900B3 27%, #F50000)',
  routerSubPath: 'insta',
  serviceType: Services.Instagram,
  parserFunction: async (
    file,
    progressBarPercent,
    requestedAbortDataParsing,
  ) => {
    if (!file || !isZipFile(file)) return null;
    const zip = new JSZip();
    return await parseInstagramFile(
      zip.loadAsync(file),
      progressBarPercent,
      requestedAbortDataParsing,
    );
  },
};
