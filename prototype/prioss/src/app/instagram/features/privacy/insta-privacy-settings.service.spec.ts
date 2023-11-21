import { TestBed } from '@angular/core/testing';

import { InstaPrivacySettingsService } from './insta-privacy-settings.service';

describe('InstaPrivacySettingsService', () => {
  let service: InstaPrivacySettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstaPrivacySettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
