import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMeasurementsComponent } from './edit-measurements.component';

describe('EditMeasurementsComponent', () => {
  let component: EditMeasurementsComponent;
  let fixture: ComponentFixture<EditMeasurementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMeasurementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
