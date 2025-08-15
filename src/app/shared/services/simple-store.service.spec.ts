import { TestBed } from '@angular/core/testing';

import { SimpleStoreService } from './simple-store.service';

describe('SimpleStoreService', () => {
  let service: SimpleStoreService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
