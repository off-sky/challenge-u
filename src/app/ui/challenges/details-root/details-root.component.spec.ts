import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRootComponent } from './details-root.component';

describe('DetailsRootComponent', () => {
  let component: DetailsRootComponent;
  let fixture: ComponentFixture<DetailsRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
