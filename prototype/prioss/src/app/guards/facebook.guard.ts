import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { FeatureToggleService, Services } from '../features/feature-toggle/feature-toggle.service';
import { map } from 'rxjs';

export const facebookGuard: CanActivateFn = () => {
  const router = inject(Router)
  return inject(FeatureToggleService).enabledServices.pipe(
    map(s => (s & Services.Facebook) === Services.Facebook),
    map(isActive => isActive || router.createUrlTree(['/serviceSelection']))
  );
};
