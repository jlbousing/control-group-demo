import { TestBed } from '@angular/core/testing';

import { AssignamentService } from './assignament.service';

describe('AssignamentService', () => {
  let service: AssignamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
