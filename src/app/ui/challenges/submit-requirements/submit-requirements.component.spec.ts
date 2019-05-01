import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitRequirementsComponent } from './submit-requirements.component';

describe('SubmitRequirementsComponent', () => {
  let component: SubmitRequirementsComponent;
  let fixture: ComponentFixture<SubmitRequirementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitRequirementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
