import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenSizeComponent } from './screen-size.component';

describe('ScreenSizeComponent', () => {
  let component: ScreenSizeComponent;
  let fixture: ComponentFixture<ScreenSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
