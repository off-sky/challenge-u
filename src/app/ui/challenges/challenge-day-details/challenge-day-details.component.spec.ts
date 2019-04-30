import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeDayDetailsComponent } from './challenge-day-details.component';

describe('ChallengeDayDetailsComponent', () => {
  let component: ChallengeDayDetailsComponent;
  let fixture: ComponentFixture<ChallengeDayDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeDayDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeDayDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
