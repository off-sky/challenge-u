import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Observable, combineLatest } from 'rxjs';
import { clgu } from 'src/types';
import { map, startWith, filter, take, tap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { UsersSelectors } from 'src/app/state/users/_users.selectors';

@Component({
  selector: 'y-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss']
})
export class UserSelectComponent implements OnInit {

  @Input() public control: FormControl;
  public inputControl: FormControl;
  public filteredUsers$: Observable<clgu.users.User[]>;
  public selectedUsers$: Observable<clgu.users.User[]>;
  private selectedUserIds: {
    [userId: string]: string;
  } = {}

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
    const users$ = UsersSelectors.userProfiles$(this.store)
              .pipe(
                map(usersDb => {
                  return usersDb.map(udb => new clgu.users.models.User(udb))
                })
              );

    this.filteredUsers$ = combineLatest(users$, inputValChanges$)
      .pipe(
        map((vals: [clgu.users.User[], string]) => {
          const users = vals[0];
          const inputVal = vals[1];
          if (!inputVal) {
            return [];
          }
          return users.filter(u => {
            const alreadySelected = this.selectedUserIds[u.id];
            return !alreadySelected && u.displayName.toLowerCase().includes(inputVal.toLowerCase());
          });
        })
      );

      this.selectedUsers$ = this.control.valueChanges
        .pipe(
          startWith(this.control.value),
          tap(users => {
            this.selectedUserIds = {};
            users.forEach(u => {
              this.selectedUserIds[u.id] = u.id;
            })
          })
        );
   
  }

  public displayFn(): null {
    return null;
  }

  public onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const user = event.option.value;
    this.selectedUsers$
      .pipe(
        take(1)
      ).subscribe(users => {
        users.push(user);
        if (this.control) {
          this.control.setValue(users);
          this.control.markAsTouched({ onlySelf: true });
        }
      });
   
  }

  public onUserDeselect(userId: string): void {
    this.selectedUsers$
        .pipe(
          take(1)
        ).subscribe(users => {
          let f = users.filter(u => u.id !== userId);
          if (this.control) {
            this.control.setValue(f);
            this.control.markAsTouched({ onlySelf: true });
          }
        });
  }



}
