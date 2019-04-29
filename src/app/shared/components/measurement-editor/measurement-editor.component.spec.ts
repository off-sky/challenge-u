import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementEditorComponent } from './measurement-editor.component';

describe('MeasurementEditorComponent', () => {
  let component: MeasurementEditorComponent;
  let fixture: ComponentFixture<MeasurementEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
