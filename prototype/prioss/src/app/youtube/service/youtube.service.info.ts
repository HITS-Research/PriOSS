import {ServiceInfo} from "../../framework/pages/service-selection/service-info.type";
import {AppType} from "../../framework/pages/service-selection/app-type";
import {Services} from "../../features/feature-toggle/feature-toggle.service";
import {isZipFile} from "../../framework/pages/service-selection/zip-file.helper";
import JSZip from "jszip";
import {parseYoutubeFile} from "./youtube-file-process";

export const youtubeServiceInfo: ServiceInfo = {
  name: AppType.Youtube,
  logoUrl: 'assets/images/brand/youtube/yt_logo_rgb_dark.png',
  sampleFileUrl: 'assets/sample-data/youtube-sample-data.zip',
  background: 'linear-gradient(-90deg, #FF0000 30%, #FFFFFF)',
  brandColor: 'linear-gradient(-90deg, #FF0000 30%, #FFFFFF)',
  routerSubPath: 'youtube',
  serviceType: Services.YouTube,
  parserFunction: async (
    file,
    progressBarPercent,
    requestedAbortDataParsing,
  ) => {
    if (!file || !isZipFile(file)) return null;
    const zip = new JSZip();
    return await parseYoutubeFile(
      zip.loadAsync(file),
      progressBarPercent,
      requestedAbortDataParsing,
    );
  },
}
