import { TestBed } from '@angular/core/testing';

import { NotaryService } from './notary.service';

describe('NotaryService', () => {
  let service: NotaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
