import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveConfirmPopupComponent } from './leave-confirm-popup.component';

describe('LeaveConfirmPopupComponent', () => {
  let component: LeaveConfirmPopupComponent;
  let fixture: ComponentFixture<LeaveConfirmPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveConfirmPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveConfirmPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
