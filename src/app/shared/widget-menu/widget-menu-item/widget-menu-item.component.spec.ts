import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetMenuItemComponent } from './widget-menu-item.component';

describe('WidgetMenuItemComponent', () => {
  let component: WidgetMenuItemComponent;
  let fixture: ComponentFixture<WidgetMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
