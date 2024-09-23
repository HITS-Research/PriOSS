import { registerLocaleData } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import localeEnExtra from '@angular/common/locales/extra/en';
import { ApplicationConfig, isDevMode, LOCALE_ID } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideStore } from '@ngxs/store';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { provideEcharts } from 'ngx-echarts';
import { routes } from './app-routing.module';
import { FacebookState } from './facebook/state/fb.state';
import { FeatureToggleService } from './features/feature-toggle/feature-toggle.service';
import { InstaState } from './instagram/state/insta.state';
import { SpotifyState } from './spotify/state/spotify.state';
import { provideSpotifyStates } from './spotify/state/spotify.statesProvider';
import { AppState } from './state/app.state';
import {YouTubeState} from "./youtube/state/youtube.state";

registerLocaleData(localeEn, 'en-US', localeEnExtra);

export const appConfig: ApplicationConfig = {
  providers: [
    FeatureToggleService,
    provideAnimations(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideEcharts(),
    provideStore([AppState, FacebookState, InstaState, SpotifyState, YouTubeState]),
    provideSpotifyStates(),
    { provide: NZ_I18N, useValue: en_US },
    { provide: LOCALE_ID, useValue: 'en-US' },
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
    ),
  ],
};
