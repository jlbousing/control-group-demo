import { TestBed } from '@angular/core/testing';

import { ConciliationService } from './conciliation.service';

describe('ConciliationService', () => {
  let service: ConciliationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConciliationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
