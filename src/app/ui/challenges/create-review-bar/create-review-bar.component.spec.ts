import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReviewBarComponent } from './create-review-bar.component';

describe('CreateReviewBarComponent', () => {
  let component: CreateReviewBarComponent;
  let fixture: ComponentFixture<CreateReviewBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateReviewBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReviewBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
