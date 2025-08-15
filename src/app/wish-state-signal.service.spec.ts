import { TestBed } from '@angular/core/testing';

import { WishStateSignalService } from './wish-state-signal.service';

describe('WishStateSignalService', () => {
  let service: WishStateSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishStateSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
