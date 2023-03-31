import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOptionComponent } from './my-option.component';

describe('MyOptionComponent', () => {
  let component: MyOptionComponent;
  let fixture: ComponentFixture<MyOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
