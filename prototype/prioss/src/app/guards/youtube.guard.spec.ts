import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { youtubeGuard } from './youtube.guard';

describe('youtubeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => youtubeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
