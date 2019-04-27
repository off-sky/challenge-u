import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeListRootComponent } from './challenge-list-root.component';

describe('ChallengeListRootComponent', () => {
  let component: ChallengeListRootComponent;
  let fixture: ComponentFixture<ChallengeListRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeListRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeListRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
