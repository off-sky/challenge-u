import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetManagerRootComponent } from './widget-manager-root.component';

describe('WidgetManagerRootComponent', () => {
  let component: WidgetManagerRootComponent;
  let fixture: ComponentFixture<WidgetManagerRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetManagerRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetManagerRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
