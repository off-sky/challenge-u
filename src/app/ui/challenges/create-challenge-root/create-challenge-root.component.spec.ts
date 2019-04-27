import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChallengeRootComponent } from './create-challenge-root.component';

describe('CreateChallengeRootComponent', () => {
  let component: CreateChallengeRootComponent;
  let fixture: ComponentFixture<CreateChallengeRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChallengeRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChallengeRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
