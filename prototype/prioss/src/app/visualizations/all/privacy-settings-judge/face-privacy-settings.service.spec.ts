import { TestBed } from '@angular/core/testing';

import { FacePrivacySettingsService } from './face-privacy-settings.service';

describe('FacePrivacySettingsService', () => {
  let service: FacePrivacySettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacePrivacySettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
