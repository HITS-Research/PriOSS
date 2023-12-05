import { TestBed } from '@angular/core/testing';

import { FacebookDashboardIntroductionService } from './facebook-dashboard-introduction.service';

describe('FacebookDashboardIntroductionService', () => {
  let service: FacebookDashboardIntroductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacebookDashboardIntroductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
