import { TestBed } from '@angular/core/testing';

import { ApiMapService } from './api-map.service';

describe('ApiMapService', () => {
  let service: ApiMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
