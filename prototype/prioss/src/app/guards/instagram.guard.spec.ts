import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { instagramGuard } from './instagram.guard';

describe('instagramGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => instagramGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
