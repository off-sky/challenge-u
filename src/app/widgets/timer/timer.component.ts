import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, timer, Subject } from 'rxjs';
import { startWith, switchMap, map, tap, shareReplay, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { AbstractWidgetComponent } from 'src/types/widgets/models/abstract-widget';

interface TimerInterval {
  name: string;
  hours: string;
  minutes: string;
  seconds: string;
}

@Component({
  selector: 'y-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent extends AbstractWidgetComponent implements OnInit {

  @Input() public challengeId: string;
  @Input() public userId: string;
  @Input() public widgetId: string;

  public fg: FormGroup;
  public hoursControl: FormControl;
  public minutesControl: FormControl;
  public secondsControl: FormControl;
  public timerNameControl: FormControl;
  
  public currentHours: Observable<string>;
  public currentMinutes: Observable<string>;
  public currentSeconds: Observable<string>;

  public isRunning: boolean = false;
  public isPaused: boolean = false;
  public saveMode: boolean = false;

  public intervals$: Observable<TimerInterval[]>;

  private currentRunSubj: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private completeSubject: Subject<void> = new Subject<void>();
  private audio = new Audio('/assets/widgets/timer/timer-end.mp3');


  constructor(
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit() {
    this.initForm();

    this.intervals$ = this.dataArrived$
      .pipe(
        map(data => {
          if (!data || !data.intervals) {
            return [];
          }
          return Object.keys(data.intervals)
            .map(key => {
              const dbInterval = data.intervals[key];
              return {
                name: dbInterval.name,
                hours: this.getHoursFromMillis(dbInterval.time),
                minutes: this.getMinutesFromMillis(dbInterval.time),
                seconds: this.getSecondsFromMillis(dbInterval.time)
              }
            })
        })
      )
  }


  public onToggleRunStop(): void {
    this.isRunning = !this.isRunning;

    if (this.isRunning) {
        const tick$ = this.currentRunSubj
          .pipe(
            switchMap(currRunVal => {
              let tickedVal = currRunVal;
              return timer(0, 1000)
                .pipe(
                  map(tickNum => {
                    if (!this.isPaused) {
                      tickedVal -= 1000;
                    }
                    return tickedVal
                  }),
                  takeUntil(this.completeSubject),
                  tap(tickedVal => {
                    if (tickedVal <= 0) {
                      this.onTimerComplete();
                    }
                  }),
                  shareReplay(1)
                )
            })
          )

      this.currentHours = tick$
            .pipe(map(tick => this.getHoursFromMillis(tick)));

      this.currentMinutes = tick$
            .pipe(map(tick => this.getMinutesFromMillis(tick)));

      this.currentSeconds = tick$
            .pipe(map(tick => this.getSecondsFromMillis(tick)));
    } else {
      this.onTimerReset();
    }
  }

  public toggleSaveMode(): void {
    this.saveMode = !this.saveMode;
    if (this.saveMode) {
      this.timerNameControl = new FormControl();
    }
  }


  public onIntervalClick(int: TimerInterval): void {
    this.hoursControl.setValue(parseInt(int.hours, 10));
    this.minutesControl.setValue(parseInt(int.minutes, 10));
    this.secondsControl.setValue(parseInt(int.seconds, 10));
  }


  public onSaveClick(): void {
    const time = this.currentRunSubj.value;
    const name = this.timerNameControl.value;
    const id = '' + new Date().getTime();
    const data = this.dataArrived$.value || {
      intervals: {}
    };

    data['intervals'][id] = {
      time,
      name
    }

    this.dataSaved$.next(data);
    this.saveMode = false;
  }


  public onTogglePause(): void {
    this.isPaused = !this.isPaused;
  }


  private initForm(): void {
    this.hoursControl = new FormControl(0);
    this.minutesControl = new FormControl(0);
    this.secondsControl = new FormControl(0);
    this.fg = new FormGroup({
      hours: this.hoursControl,
      minutes: this.minutesControl,
      seconds: this.secondsControl
    })

    this.fg.valueChanges
      .pipe(
        startWith(this.fg.value)
      )
      .subscribe(inputVal => {
        this.currentRunSubj.next(this.getMillisFromTimeInputs(inputVal))
      })
  }

  private getHoursFromMillis(millis: number): string {
      const numericVal = Math.floor(millis / (3600 * 1000));
      return `${numericVal < 10 ? '0' : ''}${numericVal}`;
  }

  private getMinutesFromMillis(millis: number): string {
    const minuteVal = Math.floor(millis / (60 * 1000));
    const numericVal = minuteVal % 60;
    return `${numericVal < 10 ? '0' : ''}${numericVal}`;
  }

  private getSecondsFromMillis(millis: number): string {
    const secondVal = Math.floor(millis / (1000));
    const numericVal = secondVal % 60;
    return `${numericVal < 10 ? '0' : ''}${numericVal}`;
  }

  private onTimerReset(): void {
    this.isRunning = false;
    this.isPaused = false;
    this.completeSubject.next();
  }

  private onTimerComplete(): void {
    this.isRunning = false;
    this.isPaused = false;
    this.completeSubject.next();
    this.audio.play();
  }


  private getMillisFromTimeInputs(inputVal: { hours: number, minutes: number, seconds: number}): number {
    return inputVal.seconds * 1000 + inputVal.minutes * 60 * 1000 + inputVal.hours * 3600 * 1000;
  }




}
