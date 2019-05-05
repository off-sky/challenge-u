import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChallengeRootComponent } from './edit-challenge-root.component';

describe('EditChallengeRootComponent', () => {
  let component: EditChallengeRootComponent;
  let fixture: ComponentFixture<EditChallengeRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditChallengeRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChallengeRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
