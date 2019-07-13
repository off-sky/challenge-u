import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetMenuTriggerComponent } from './widget-menu-trigger.component';

describe('WidgetMenuTriggerComponent', () => {
  let component: WidgetMenuTriggerComponent;
  let fixture: ComponentFixture<WidgetMenuTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetMenuTriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetMenuTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
