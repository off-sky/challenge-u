import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Observable, combineLatest } from 'rxjs';
import { clgu } from 'src/types';
import { map, startWith, filter } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'y-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss']
})
export class UserSelectComponent implements OnInit {

  @Input() public control: FormControl;
  public inputControl: FormControl;
  public filteredUsers$: Observable<clgu.users.User[]>;
  public selectedUsers: clgu.users.User[] = [];

  @Output() public selectedChanged: EventEmitter<clgu.users.User[]> = new EventEmitter<clgu.users.User[]>();

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.inputControl = new FormControl();
    const inputValChanges$ = this.inputControl.valueChanges
      .pipe(
        filter(val => !!val && !!val.toLowerCase),
        startWith(this.inputControl.value)
      )
    const users$ = this.store.select(state => state.users.users.items);

    this.filteredUsers$ = combineLatest(users$, inputValChanges$)
      .pipe(
        map((vals: [clgu.users.User[], string]) => {
          const users = vals[0];
          const inputVal = vals[1];
          if (!inputVal) {
            return [];
          }
          return users.filter(u => {
            const alreadySelected = this.selectedUsers.some(sel => sel.id === u.id);
            return !alreadySelected && u.displayName.toLowerCase().includes(inputVal.toLowerCase());
          });
        })
      );
   
  }

  public displayFn(): null {
    return null;
  }

  public onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const user = event.option.value;
    this.selectedUsers.push(user);
    this.selectedChanged.emit(this.selectedUsers);
    if (this.control) {
      this.control.setValue(this.selectedUsers);
    }
  }

  public onUserDeselect(userId: string): void {
      this.selectedUsers = this.selectedUsers.filter(u => u.id !== userId);
      this.selectedChanged.emit(this.selectedUsers);
      if (this.control) {
        this.control.setValue(this.selectedUsers);
      }
  }



}
