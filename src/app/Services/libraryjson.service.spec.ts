import { TestBed } from '@angular/core/testing';

import { LibraryjsonService } from './libraryjson.service';

describe('LibraryjsonService', () => {
  let service: LibraryjsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryjsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
