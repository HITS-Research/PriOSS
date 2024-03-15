import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { FeatureToggleService, Services } from '../features/feature-toggle/feature-toggle.service';
import { map } from 'rxjs';

export const spotifyGuard: CanActivateFn = () => {
  const router = inject(Router)
  return inject(FeatureToggleService).enabledServices.pipe(
    map(s => (s & Services.Spotify) === Services.Spotify),
    map(isActive => isActive || router.createUrlTree(['/serviceSelection']))
  );
};
