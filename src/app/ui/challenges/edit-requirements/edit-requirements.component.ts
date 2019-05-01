import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { clgu } from 'src/types';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent } from '@angular/material';

import * as moment from 'moment';
import { Observable, combineLatest } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'y-edit-requirements',
  templateUrl: './edit-requirements.component.html',
  styleUrls: ['./edit-requirements.component.scss']
})
export class EditRequirementsComponent implements OnInit {

  public formGroup: FormGroup;
  public datesControl: FormControl;
  public requirementsControl: FormArray;
  public allowedDates: moment.Moment[];

  public presetInputControl: FormControl;
  public presetOptionsFiltered$: Observable<clgu.challenges.RequirementPresetOption[]>;
  public isPresetOptions$: Observable<boolean>;


  constructor(
    public dialogRef: MatDialogRef<EditRequirementsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: clgu.challenges.Activity[],
    private store: Store<AppState>
  ) { }

  ngOnInit() {
   this.initPresets();

   this.allowedDates = this.data.map(a => moment(parseInt(a.id, 10)));
   this.datesControl = new FormControl([], [Validators.required]);
   this.requirementsControl = new FormArray([
      this.getRequirementFormGroup()
    ]);
   this.formGroup = new FormGroup({
      dates: this.datesControl,
      requirements: this.requirementsControl
    });
  }

  private getRequirementFormGroup(reqObj?: clgu.challenges.db.RequirementObj): FormGroup {
      if (reqObj) {
        return new FormGroup({
          display_name: new FormControl(reqObj.display_name, [ Validators.required ]),
          category: new FormControl(reqObj.category)
        });
      } else {
        return new FormGroup({
          display_name: new FormControl(null, [ Validators.required ]),
          category: new FormControl()
        });
      }
  }

  public onAddClicked(): void {
    this.requirementsControl.push(this.getRequirementFormGroup());
  }

  public onInputCleared(): void {
    this.presetInputControl.setValue('');
  }

  public onPresetSelected(o: MatAutocompleteSelectedEvent): void {
    const p = o.option.value;

    if (!!p && !!p.requirements) {
      const dbRequirements = Object.keys(p.requirements)
        .map(reqId => p.requirements[reqId]);

     
      this.requirementsControl = new FormArray(
        dbRequirements.map(dbReq => this.getRequirementFormGroup(dbReq))
      );

      this.formGroup.setControl('requirements', this.requirementsControl);
    }
  }

  public onRemoveClicked(ind: number): void {
    this.requirementsControl.removeAt(ind);
  }

  public onSubmit(): void {
    console.log(this.formGroup.errors);
    if (this.formGroup.valid) {
      this.dialogRef.close(this.getRequirementRequest());
    }
  }

  public presetDisplayFn(p: clgu.challenges.RequirementPresetOption): string {
    if (!p) {
      return null;
    }
    return p.displayName;
  }


  private initPresets(): void {
    this.presetInputControl = new FormControl();
    const inputValChanges$ = this.presetInputControl.valueChanges
      .pipe(
        filter(val => !!val && !!val.toLowerCase),
        startWith(this.presetInputControl.value)
      );

    this.isPresetOptions$ = this.store.select(state => !!state.challenges.requirementPresets)

    const presetOptions$ = this.store.select(state => state.challenges.requirementPresets)
      .pipe(
        filter(p => !!p),
        map(presetObj => {
          return Object.keys(presetObj)
            .map(key => new clgu.challenges.RequirementPresetOption(presetObj[key]));
        })
      );

    this.presetOptionsFiltered$ = combineLatest(inputValChanges$, presetOptions$)
      .pipe(
        map(vals => {
          const inputVal = vals[0];
          const presets = vals[1];
          if (!inputVal) {
            return presets;
          }
          return presets.filter(p => p.displayName.toLowerCase().includes(inputVal.toLowerCase()))
        })
      );
  }


  private getRequirementRequest(): clgu.challenges.AddRequirementsRequest {
    const value = this.formGroup.value;
    const requirements = {} as clgu.challenges.db.Requirements;
    value.requirements.forEach((r, ind)=> {
      requirements[`requirement_${ind}`] = {
        display_name: r.display_name,
        category: r.category,
        completed: false
      };
    });
    return {
      dates: value.dates.map(d => d.getTime()),
      requirements
    } as clgu.challenges.AddRequirementsRequest;
  }

}
