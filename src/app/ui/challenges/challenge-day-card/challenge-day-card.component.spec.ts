import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeDayCardComponent } from './challenge-day-card.component';

describe('ChallengeDayCardComponent', () => {
  let component: ChallengeDayCardComponent;
  let fixture: ComponentFixture<ChallengeDayCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeDayCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeDayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
