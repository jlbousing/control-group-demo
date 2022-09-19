import { TestBed } from '@angular/core/testing';

import { DispachtService } from './dispacht.service';

describe('DispachtService', () => {
  let service: DispachtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DispachtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
