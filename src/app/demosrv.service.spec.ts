import { TestBed, inject } from '@angular/core/testing';

import { DemosrvService } from './demosrv.service';

describe('DemosrvService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemosrvService]
    });
  });

  it('should be created', inject([DemosrvService], (service: DemosrvService) => {
    expect(service).toBeTruthy();
  }));
});
