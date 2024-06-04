import JSZip from 'jszip';
import { Services } from 'src/app/features/feature-toggle/feature-toggle.service';
import { AppType } from 'src/app/framework/pages/service-selection/app-type';
import { ServiceInfo } from 'src/app/framework/pages/service-selection/service-info.type';
import { isZipFile } from 'src/app/framework/pages/service-selection/zip-file.helper';
import { SpotifyReadFromZip } from './spotify.action';

export const spotifyServiceInfo: ServiceInfo = {
  name: AppType.Spotify,
  logoUrl: 'assets/images/brand/spotify/Spotify_Logo_RGB_White.png',
  sampleFileUrl: 'assets/sample-data/spot_sampledata.zip',
  background: '#1ed760',
  brandColor: '#1ed760',
  routerSubPath: 'spot',
  serviceType: Services.Spotify,
  parserFunction: async (
    file,
    progressBarPercent,
    requestedAbortDataParsing,
  ) => {
    if (!file || !isZipFile(file)) return null;
    const zip = new JSZip();
    return new SpotifyReadFromZip(
      await zip.loadAsync(file),
      progressBarPercent,
      requestedAbortDataParsing,
    );
  },
}
