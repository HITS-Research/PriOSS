import { TestBed } from '@angular/core/testing';

import { SaveAsImageService } from './save-as-image.service';

describe('SaveAsImageService', () => {
  let service: SaveAsImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveAsImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
