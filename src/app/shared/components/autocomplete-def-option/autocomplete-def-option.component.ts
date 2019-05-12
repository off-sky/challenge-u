import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { filter, startWith, map, tap, take, switchMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { clgu } from 'src/types';

interface Option {
  name: string;
  value: any;
}

@Component({
  selector: 'y-autocomplete',
  templateUrl: './autocomplete-def-option.component.html',
  styleUrls: ['./autocomplete-def-option.component.scss']
})
export class AutocompleteDefOptionComponent implements OnChanges, OnInit {

  @Input() public options: clgu.common.Option[] = [];
  @Input() public placeholder: string = 'Start typing';
  @Input() public control: FormControl;
  @Input() public defaultStr: string = 'Create';
  @Input() public multi: boolean = false;
  @Input() public defOption: boolean = true;
  public showDefultOption$: Observable<boolean>;
  public inputControl: FormControl;
  private control$: BehaviorSubject<FormControl> = new BehaviorSubject<FormControl>(null);

  public filteredOptions$: Observable<clgu.common.Option[]>;
  public selectedOptions$: Observable<clgu.common.Option[]>;

  private options$: BehaviorSubject<clgu.common.Option[]> = new BehaviorSubject<clgu.common.Option[]>(this.options);

  private selectedOptions: {
    [userId: string]: string;
  } = {}

  @Output() public selectedChanged: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() public defOptionSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.control) {
      this.control$.next(this.control);
    }
    if (changes.options) {
      this.options$.next(this.options || []);
    }
  }

  ngOnInit() {
    this.inputControl = new FormControl();
    const inputValChanges$ = this.inputControl.valueChanges
      .pipe(
        filter(val => !!val && !!val.toLowerCase),
        startWith(this.inputControl.value)
      )
    const options$ = this.options$.asObservable();

    this.filteredOptions$ = combineLatest(options$, inputValChanges$)
      .pipe(
        map((vals: [clgu.common.Option[], string]) => {
          const users = vals[0];
          const inputVal = vals[1];
          if (!inputVal) {
            return [];
          }
          return users.filter(u => {
            const alreadySelected = this.selectedOptions[u.display];
            return !alreadySelected && u.display.toLowerCase().includes(inputVal.toLowerCase());
          });
        })
      );

    this.selectedOptions$ = this.control$
        .pipe(
          filter(c => !!c),
          switchMap(c => c.valueChanges.pipe(startWith(c.value))),
          tap(users => {
            this.selectedOptions = {};
            users.forEach(u => {
              this.selectedOptions[u.name] = u.name;
            })
          })
        );
   
    this.showDefultOption$ = this.filteredOptions$
          .pipe(
            tap(ops => console.log(ops)),
            map(opts => this.defOption && (!!opts || opts.length === 0))
          )
  }

  public displayFn(opt): string | null {
    console.log('Display fn:');
    console.log(opt);
    if (this.multi) {
      return null;
    } else {
      if (typeof opt === 'string') {
        return opt;
      }
      return !!opt && opt.display ? opt.display : null
    }
  }

  public onDefaultOptionClicked(input: string, event: MouseEvent): void {
    this.defOptionSelected.emit(input);
    event.stopPropagation();
  }

  public onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const user = event.option.value as clgu.common.Option;
    if (this.multi) {
      const users = this.control.value;
      users.push(user);
      if (this.control) {
        this.control.setValue(users);
        this.control.markAsTouched({ onlySelf: true });
      }
    } else {
      if (this.control) {
        this.control.setValue([user]);
        this.control.markAsTouched({ onlySelf: true });
      }
    }
   
  }

  public onOptionDeselect(name: string): void {
    this.selectedOptions$
        .pipe(
          take(1)
        ).subscribe(users => {
          let f = users.filter(u => u.display !== name);
          if (this.control) {
            this.control.setValue(f);
            this.control.markAsTouched({ onlySelf: true });
          }
        });
  }


}
