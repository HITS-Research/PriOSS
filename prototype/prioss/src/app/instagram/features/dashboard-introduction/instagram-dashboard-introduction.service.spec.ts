import { TestBed } from '@angular/core/testing';

import { InstagramDashboardIntroductionService } from './instagram-dashboard-introduction.service';

describe('InstagramDashboardIntroductionService', () => {
  let service: InstagramDashboardIntroductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstagramDashboardIntroductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
