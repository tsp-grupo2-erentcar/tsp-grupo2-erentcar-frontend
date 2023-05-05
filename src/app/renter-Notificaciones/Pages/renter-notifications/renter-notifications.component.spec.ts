import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterNotificationsComponent } from './renter-notifications.component';

describe('RenterNotificationsComponent', () => {
  let component: RenterNotificationsComponent;
  let fixture: ComponentFixture<RenterNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenterNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenterNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
