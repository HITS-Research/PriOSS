import { TestBed } from '@angular/core/testing';

import { AppComponentMsgService } from './app-component-msg.service';

describe('AppComponentMsgService', () => {
  let service: AppComponentMsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppComponentMsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
