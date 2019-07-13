import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'y-widget-menu-trigger',
  templateUrl: './widget-menu-trigger.component.html',
  styleUrls: ['./widget-menu-trigger.component.scss']
})
export class WidgetMenuTriggerComponent implements OnInit {

  private openSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  ngOnInit() {
  }

  public isOpen(): Observable<boolean> {
    return this.openSub.asObservable();
  }

  public toggle(): void {
    this.openSub.next(!this.openSub.value);
  }

  public open(): void {
    this.openSub.next(true);
  }

  public close(): void {
    this.openSub.next(false);
  }

}
