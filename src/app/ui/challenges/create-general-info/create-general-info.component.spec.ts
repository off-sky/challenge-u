import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGeneralInfoComponent } from './create-general-info.component';

describe('CreateGeneralInfoComponent', () => {
  let component: CreateGeneralInfoComponent;
  let fixture: ComponentFixture<CreateGeneralInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGeneralInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
