import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFriendsComponent } from './create-friends.component';

describe('CreateFriendsComponent', () => {
  let component: CreateFriendsComponent;
  let fixture: ComponentFixture<CreateFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
