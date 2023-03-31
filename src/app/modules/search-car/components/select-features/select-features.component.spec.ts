import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFeaturesComponent } from './select-features.component';

describe('SelectFeaturesComponent', () => {
  let component: SelectFeaturesComponent;
  let fixture: ComponentFixture<SelectFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
