import { TestBed } from '@angular/core/testing';

import { FreightLoadService } from './freight-load.service';

describe('FreightLoadService', () => {
  let service: FreightLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreightLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
