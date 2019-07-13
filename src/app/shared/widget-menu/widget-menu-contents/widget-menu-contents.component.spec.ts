import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetMenuContentsComponent } from './widget-menu-contents.component';

describe('WidgetMenuContentsComponent', () => {
  let component: WidgetMenuContentsComponent;
  let fixture: ComponentFixture<WidgetMenuContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetMenuContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetMenuContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
