import { TestBed } from '@angular/core/testing';

import { SpotifyDashboardIntroductionService } from './spotify-dashboard-introduction.service';

describe('SpotifyDashboardIntroductionService', () => {
  let service: SpotifyDashboardIntroductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyDashboardIntroductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
