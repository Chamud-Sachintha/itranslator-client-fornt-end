import { TestBed } from '@angular/core/testing';

import { CsService } from './cs.service';

describe('CsService', () => {
  let service: CsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
