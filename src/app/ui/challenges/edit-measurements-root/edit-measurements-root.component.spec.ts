import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMeasurementsRootComponent } from './edit-measurements-root.component';

describe('EditMeasurementsRootComponent', () => {
  let component: EditMeasurementsRootComponent;
  let fixture: ComponentFixture<EditMeasurementsRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMeasurementsRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMeasurementsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
