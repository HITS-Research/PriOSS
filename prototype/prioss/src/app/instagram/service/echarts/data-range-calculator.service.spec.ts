import { TestBed } from '@angular/core/testing';

import { DataRangeCalculatorService } from './data-range-calculator.service';

describe('DataRangeCalculatorService', () => {
  let service: DataRangeCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRangeCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
