import { TestBed } from '@angular/core/testing';

import { RenterNotificationsServiceService } from './renter-notifications-service.service';

describe('RenterNotificationsServiceService', () => {
  let service: RenterNotificationsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenterNotificationsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
