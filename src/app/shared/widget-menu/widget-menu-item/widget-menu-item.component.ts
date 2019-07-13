import { Component, OnInit, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { WidgetMenuTriggerComponent } from '../widget-menu-trigger/widget-menu-trigger.component';
import { startWith, map, switchMap, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'y-widget-menu-item',
  templateUrl: './widget-menu-item.component.html',
  styleUrls: ['./widget-menu-item.component.scss']
})
export class WidgetMenuItemComponent implements AfterContentInit, OnInit {

  public isOpen$: Observable<boolean>;
  private openChangeSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @ContentChildren(WidgetMenuTriggerComponent) private trigger: QueryList<WidgetMenuTriggerComponent>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.isOpen$ = this.trigger.changes
      .pipe(
        startWith(this.trigger),
        map((trigger: QueryList<WidgetMenuTriggerComponent>) => trigger.first),
        switchMap((trigger: WidgetMenuTriggerComponent) => trigger.isOpen()),
        tap(isOpen => this.openChangeSub.next(isOpen)),
        shareReplay(1)
      )
  }


  public openedChanged(): Observable<boolean> {
    return this.openChangeSub.asObservable()
  }


  public close() {
    this.trigger.first.close();
  }

}
