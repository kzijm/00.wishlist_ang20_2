import { TestBed } from '@angular/core/testing';

import { SimpleSignalStoreService } from './simple-signal-store.service';

describe('SimpleSignalStoreService', () => {
  let service: SimpleSignalStoreService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleSignalStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
