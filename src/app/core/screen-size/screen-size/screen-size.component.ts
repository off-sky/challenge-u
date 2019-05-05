import { Component, OnInit, Input, OnChanges, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScreenSizeType, ScreenSizes } from '../interfaces';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'y-screen-size',
  templateUrl: './screen-size.component.html',
  styleUrls: ['./screen-size.component.scss']
})
export class ScreenSizeComponent implements OnChanges, OnInit {

  public static screenSizeSubject: BehaviorSubject<ScreenSizeType> = new BehaviorSubject<ScreenSizeType>(ScreenSizes.MOBILE);

  @ViewChildren('sizing') private sizing: QueryList<ElementRef>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.sizing.changes
      .pipe(
        startWith(this.sizing),
      )
      .subscribe((els: QueryList<ElementRef>) => {
        els.forEach(el => {
          const display = window.getComputedStyle(el.nativeElement).display;
          if (display === 'block') {
            ScreenSizeComponent.screenSizeSubject.next(this.getSizefromEl(el));
          }
        })
      })
  }

  ngOnChanges() {
  }


  private getSizefromEl(el: ElementRef): ScreenSizeType {
    return el.nativeElement.dataset.size
  }

}
