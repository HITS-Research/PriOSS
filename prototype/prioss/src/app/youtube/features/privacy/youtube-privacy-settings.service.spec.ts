import { TestBed } from '@angular/core/testing';

import { YoutubePrivacySettingsService } from './youtube-privacy-settings.service';

describe('YoutubePrivacySettingsService', () => {
  let service: YoutubePrivacySettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoutubePrivacySettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
