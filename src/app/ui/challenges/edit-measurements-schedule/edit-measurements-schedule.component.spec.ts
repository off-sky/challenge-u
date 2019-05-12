import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMeasurementsScheduleComponent } from './edit-measurements-schedule.component';

describe('EditMeasurementsScheduleComponent', () => {
  let component: EditMeasurementsScheduleComponent;
  let fixture: ComponentFixture<EditMeasurementsScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMeasurementsScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMeasurementsScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
