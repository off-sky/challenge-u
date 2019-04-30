import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMeasurementsComponent } from './display-measurements.component';

describe('DisplayMeasurementsComponent', () => {
  let component: DisplayMeasurementsComponent;
  let fixture: ComponentFixture<DisplayMeasurementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayMeasurementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
