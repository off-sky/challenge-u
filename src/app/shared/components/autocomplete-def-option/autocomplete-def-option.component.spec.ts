import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteDefOptionComponent } from './autocomplete-def-option.component';

describe('AutocompleteDefOptionComponent', () => {
  let component: AutocompleteDefOptionComponent;
  let fixture: ComponentFixture<AutocompleteDefOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteDefOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteDefOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
