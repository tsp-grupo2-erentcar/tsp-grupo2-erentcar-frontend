import { TestBed } from '@angular/core/testing';

import { PlansService } from './plans.service';

describe('SubscriptionService', () => {
  let service: PlansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
