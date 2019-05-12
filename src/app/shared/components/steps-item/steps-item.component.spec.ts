import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsItemComponent } from './steps-item.component';

describe('StepsItemComponent', () => {
  let component: StepsItemComponent;
  let fixture: ComponentFixture<StepsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
