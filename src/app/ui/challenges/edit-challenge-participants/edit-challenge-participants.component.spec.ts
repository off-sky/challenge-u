import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChallengeParticipantsComponent } from './edit-challenge-participants.component';

describe('EditChallengeParticipantsComponent', () => {
  let component: EditChallengeParticipantsComponent;
  let fixture: ComponentFixture<EditChallengeParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditChallengeParticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChallengeParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
