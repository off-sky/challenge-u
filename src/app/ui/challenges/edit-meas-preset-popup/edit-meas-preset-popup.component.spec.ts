import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMeasPresetPopupComponent } from './edit-meas-preset-popup.component';

describe('EditMeasPresetPopupComponent', () => {
  let component: EditMeasPresetPopupComponent;
  let fixture: ComponentFixture<EditMeasPresetPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMeasPresetPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMeasPresetPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
