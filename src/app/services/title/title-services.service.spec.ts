import { TestBed } from '@angular/core/testing';

import { TitleServicesService } from './title-services.service';

describe('TitleServicesService', () => {
  let service: TitleServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
