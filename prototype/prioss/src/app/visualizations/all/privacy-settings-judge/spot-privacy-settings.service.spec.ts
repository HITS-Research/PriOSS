import { TestBed } from '@angular/core/testing';

import { SpotPrivacySettingsService } from './spot-privacy-settings.service';

describe('SpotPrivacySettingsService', () => {
  let service: SpotPrivacySettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotPrivacySettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
