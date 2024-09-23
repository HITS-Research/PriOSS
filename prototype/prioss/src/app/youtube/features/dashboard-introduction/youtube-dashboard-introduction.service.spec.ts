import { TestBed } from '@angular/core/testing';

import { YouTubeDashboardIntroductionService } from './youtube-dashboard-introduction.service';

describe('YouTubeDashboardIntroductionService', () => {
  let service: YouTubeDashboardIntroductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YouTubeDashboardIntroductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
