import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombineEditorComponent } from './combine-editor.component';

describe('CombineEditorComponent', () => {
  let component: CombineEditorComponent;
  let fixture: ComponentFixture<CombineEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombineEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombineEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
