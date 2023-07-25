import { TestBed } from '@angular/core/testing';

import { StoreBookDataService } from './store-book-data.service';

describe('StoreBookDataService', () => {
  let service: StoreBookDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreBookDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
