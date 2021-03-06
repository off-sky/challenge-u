import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, combineLatest, BehaviorSubject, Subscription } from 'rxjs';
import { map, startWith, tap, switchMap, debounceTime, filter } from 'rxjs/operators';
import { clgu } from 'src/types';
import { DragulaService } from 'ng2-dragula';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { ChallengesActions } from 'src/app/state/challenges/_challenges.actions';

@Component({
  selector: 'y-measurement-editor',
  templateUrl: './measurement-editor.component.html',
  styleUrls: ['./measurement-editor.component.scss']
})
export class MeasurementEditorComponent implements OnDestroy, OnInit {

  @Input() public challengeId: string;
  @Input() public control: FormArray;
  @Input() public isCombinedSelected$: Observable<boolean>;
  public presetControl = new FormControl();

  public presetOptions$: Observable<clgu.common.Option[]>;

  public categoryOptions$: Observable<clgu.common.Option[]>;

  public measurementTypeOptions = [
    {
      value: 'number',
      displayValue: 'Number'
    },
    {
      value: 'string',
      displayValue: 'Text'
    },
    {
      value: 'boolean',
      displayValue: 'Yes/No'
    },
    {
      value: 'combine',
      displayValue: 'Combine'
    }
  ];

  private standardCombineOptions: clgu.common.Option[] = [
    {
      displayLong: 'Plus',
      value: '+',
      display: '+',
    },
    {
      displayLong: 'Minus',
      value: '-',
      display: '-',
    },
    {
      displayLong: 'Division',
      value: '/',
      display: '/',
    },
    {
      displayLong: 'Multiplication',
      value: '*',
      display: '*',
    },
    {
      displayLong: 'Left bracket',
      value: '(',
      display: '(',
    },
    {
      displayLong: 'Right bracket',
      value: ')',
      display: ')',
    },
    {
      displayLong: 'Number',
      value: '',
      display: ''
    }
  ];

  private totalCombineOptions: clgu.common.Option[] = [...this.standardCombineOptions ];
  private controls$: BehaviorSubject<FormGroup[]> = new BehaviorSubject<FormGroup[]>([]);

  private updateOptionSub: Subscription;

  constructor(
    private cd: ChangeDetectorRef,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this.store.dispatch(new ChallengesActions.ReloadCategories(this.challengeId));
    this.store.dispatch(new ChallengesActions.FetchMeasurementsPresets({ challengeId: this.challengeId}))

    this.categoryOptions$ = this.store.select(state => state.challenges.challengesCategories[this.challengeId])
      .pipe(
        filter(c => !!c && !!c.data),
        map(catObj => {
          return Object.keys(catObj.data)
            .map(catId => {
              const category = catObj.data[catId];
              return {
                display: category,
                value: category,
                displayLong: category
              }
            })
        })
      )
    
    this.updateOptionSub = this.controls$
      .pipe(
        switchMap(cc => {
          console.log('New controls arrived');
          const typeObs = cc.map(fg => fg.get('type').valueChanges.pipe(startWith(fg.get('type').value)));
          return combineLatest(typeObs)
        })
      )
      .subscribe(() => {
        this.updateTotalCombineOptions();
        this.cd.detectChanges();
      });


     

    this.isCombinedSelected$ = this.controls$
      .pipe(
        switchMap(() => {
          const obs = this.control.controls
            .map(c => c.get('type'))
            .map(c => c.valueChanges.pipe(startWith(c.value)));

          return combineLatest(obs)
            .pipe(
              map(vals => !!vals && vals.some(v => v === 'combine')),
              tap(isCombineSelected => console.log({ isCombineSelected }))
            )
        })
      );

    this.presetOptions$ = this.store.select(state => state.challenges.challengesMeasurementsPresets[this.challengeId])
      .pipe(
          filter(obj => !!obj),
          map(obj => obj.data),
          filter(d => !!d),
          map(presetObj => {
            return Object.keys(presetObj)
              .map(key => presetObj[key])
              .map((preset: clgu.challenges.db.MeasurementPreset) => ({
                display: preset.name,
                value: preset.measurements
              }));
          })
      );

    this.presetControl.valueChanges
      .subscribe(val => this.onPresetSelect(val))

  }


  ngOnDestroy() {
    if (this.updateOptionSub) {
      this.updateOptionSub.unsubscribe();
    }
  }


  public getOptions(id: string): clgu.common.Option[] {
    return this.totalCombineOptions.filter(o => o.value !== id);
  }


  public onPresetSelect(event: clgu.common.Option[]): void {
    if (event && event.length > 0) {
      const option = event[0];
      const val = option.value;
      const dbMeasurements = Object.keys(val)
        .map(key => val[key]);

      dbMeasurements.sort((a, b) => a.order_no - b.order_no);

      dbMeasurements.forEach((m, i) => {
        const fc =  new FormGroup({
          id: new FormControl(m.id),
          category: new FormControl([{ display: m.category, value: m.category }]),
          displayName: new FormControl(m.display_name, [ Validators.required ]),
          type: new FormControl(m.type),
          formula: new FormControl(clgu.utils.cloneDeep(m.formula)),
          orderNo: new FormControl(i),
        });
        this.control.push(fc);
      });

      this.updateInputControls();
    }

  }


  public add(): void {
    this.control.push(new FormGroup({
      id: new FormControl(clgu.utils.getRandomStr(11)),
      category: new FormControl([]),
      displayName: new FormControl(null, [ Validators.required ]),
      type: new FormControl('number'),
      formula: new FormControl(''),
      orderNo: new FormControl(),
    }));

    this.updateInputControls();
  }

  public onAddCategory(name: string, control: FormControl): void {
    this.store.dispatch(new ChallengesActions.AddCategory({ id: this.challengeId, data: name }));
    control.setValue([name]);
  }


  public remove(ind: number): void {
    this.control.removeAt(ind);
    this.updateInputControls();
  }

  private updateInputControls(): void {
    this.control.controls.forEach((fg, ind) => {
      const orderNo = ind + 1;
      fg.get('orderNo').setValue(orderNo);
    });

    this.controls$.next(this.control.controls as FormGroup[]);
  }


  private updateTotalCombineOptions(): void {
    this.totalCombineOptions = [ ...this.standardCombineOptions ];
    this.control.controls.forEach((fg, ind) => {
      if (fg.get('type').value === 'combine' || fg.get('type').value === 'number') {
        const orderNo = fg.get('orderNo').value;
        this.totalCombineOptions.push({ display: `M_${orderNo}`, metadata: 'measurement', value: fg.get('id').value});
      }
    });
  }

}
