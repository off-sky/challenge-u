import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListRootComponent } from './users-list-root.component';

describe('UsersListRootComponent', () => {
  let component: UsersListRootComponent;
  let fixture: ComponentFixture<UsersListRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersListRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
