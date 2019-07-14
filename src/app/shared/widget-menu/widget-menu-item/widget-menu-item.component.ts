import { Component, OnInit, AfterContentInit, ContentChildren, QueryList, ElementRef } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { WidgetMenuTriggerComponent } from '../widget-menu-trigger/widget-menu-trigger.component';
import { startWith, map, switchMap, shareReplay, tap, filter, take } from 'rxjs/operators';
import { WidgetMenuContentsComponent } from '../widget-menu-contents/widget-menu-contents.component';

@Component({
  selector: 'y-widget-menu-item',
  templateUrl: './widget-menu-item.component.html',
  styleUrls: ['./widget-menu-item.component.scss']
})
export class WidgetMenuItemComponent implements AfterContentInit, OnInit {

  public isOpen$: Observable<boolean>;
  private openChangeSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @ContentChildren(WidgetMenuTriggerComponent) private trigger: QueryList<WidgetMenuTriggerComponent>;
  @ContentChildren(WidgetMenuContentsComponent) private contents: QueryList<ElementRef>;

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

  public showMyContents(): Observable<any> {
    return this.openedChanged()
      .pipe(
        filter(open => open),
        switchMap(() => {
          console.log('About to emit component')
          return this.contents.changes
            .pipe(
              startWith(this.contents),
              filter(contents => !!contents),
              switchMap((contents: QueryList<WidgetMenuContentsComponent>) => contents.first.templateSub),
              filter(t => !!t),
              take(1)
            )
        })
      )
  }


  public close() {
    this.trigger.first.close();
  }

}
