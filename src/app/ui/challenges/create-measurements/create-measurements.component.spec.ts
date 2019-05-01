import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMeasurementsComponent } from './create-measurements.component';

describe('CreateMeasurementsComponent', () => {
  let component: CreateMeasurementsComponent;
  let fixture: ComponentFixture<CreateMeasurementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMeasurementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
