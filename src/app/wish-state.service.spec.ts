import { TestBed } from '@angular/core/testing';

import { WishStateService } from './wish-state.service';

describe('WishStateService', () => {
  let service: WishStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
