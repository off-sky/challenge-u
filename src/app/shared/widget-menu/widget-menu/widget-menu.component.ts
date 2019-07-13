import { Component, OnInit, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { WidgetMenuItemComponent } from '../widget-menu-item/widget-menu-item.component';
import { startWith, switchMap, filter, map, tap, flatMap } from 'rxjs/operators';
import { merge } from 'rxjs';


@Component({
  selector: 'y-widget-menu',
  templateUrl: './widget-menu.component.html',
  styleUrls: ['./widget-menu.component.scss']
})
export class WidgetMenuComponent implements AfterContentInit, OnInit {

  @ContentChildren(WidgetMenuItemComponent) private menuItems: QueryList<WidgetMenuItemComponent>;


  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {

    // close other menu items, if one becomes opened
    this.menuItems.changes
      .pipe(
        startWith(this.menuItems),
        switchMap((items: QueryList<WidgetMenuItemComponent>) => {
          const obss = items.map((item, index) => {
            return item.openedChanged()
              .pipe(
                filter(isOpen => isOpen),
                map(() => index)
              );
          });
          return merge(obss);
        }),
        flatMap(source => source)
      )
      .subscribe(openInd => {
        this.closeAllItemsExceptInd(openInd);
      });
  }


  private closeAllItemsExceptInd(ind: number) {
    this.menuItems.forEach((item, index) => {
      if (index !== ind) {
        item.close();
      }
    })
  }

}
