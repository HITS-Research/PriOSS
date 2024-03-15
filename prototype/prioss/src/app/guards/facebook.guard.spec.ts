import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { facebookGuard } from './facebook.guard';

describe('facebookGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => facebookGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
