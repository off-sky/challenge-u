import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ElementRef, Renderer2, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { WidgetMenuItemComponent } from '../widget-menu-item/widget-menu-item.component';
import { startWith, switchMap, filter, map, tap, flatMap, shareReplay, take } from 'rxjs/operators';
import { merge, Observable, combineLatest } from 'rxjs';
import { WidgetMenuContentsComponent } from '../widget-menu-contents/widget-menu-contents.component';
import { ScreenSizeType, ScreenSizes } from 'src/app/core/screen-size/interfaces';
import { ScreenSizeService } from 'src/app/core/screen-size/screen-size.service';


@Component({
  selector: 'y-widget-menu',
  templateUrl: './widget-menu.component.html',
  styleUrls: ['./widget-menu.component.scss']
})
export class WidgetMenuComponent implements AfterContentInit, OnInit {

  public template: Observable<TemplateRef<any>>;
  public isOpen$: Observable<boolean>;
  public screenSize$: Observable<ScreenSizeType>;
  public ScreenSizes = ScreenSizes;

  private items: Observable<QueryList<WidgetMenuItemComponent>>;

  @ContentChildren(WidgetMenuItemComponent) private menuItems: QueryList<WidgetMenuItemComponent>;
  @ViewChild('container') private containerRef: ElementRef;


  constructor(
    private cd: ChangeDetectorRef,
    private renderer: Renderer2,
    private screenSizeService: ScreenSizeService
  ) { }

  ngOnInit() {
  }

  ngAfterContentInit() {

    this.screenSize$ = this.screenSizeService.screenSize$();

    // close other menu items, if one becomes opened
    this.items =  this.menuItems.changes
          .pipe(
            startWith(this.menuItems),
            shareReplay(1)
          );

    
    this.items
      .pipe(
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

    this.template = this.items
        .pipe(
          switchMap((items: QueryList<WidgetMenuItemComponent>) => {
            const obss = items.map((item, index) => {
              return item.showMyContents()
            });
            return merge(obss);
          }),
          flatMap(source => source),
        )

    this.isOpen$ = this.items
        .pipe(
          switchMap((items: QueryList<WidgetMenuItemComponent>) => {
            const obss = items.map((item, index) => {
              return item.openedChanged()
            });
            return combineLatest(obss);
          }),
          map(openArr => {
            return openArr.some(open => open);
          })
        )
    
  }


  public closeAll(): void {
    this.items
      .pipe(
        take(1)
      )
      .subscribe(items => {
        items.forEach(i => i.close())
      })
  }


  private closeAllItemsExceptInd(ind: number) {
    this.menuItems.forEach((item, index) => {
      if (index !== ind) {
        item.close();
      }
    })
  }


  private createContent(contentCmp: ElementRef): void {
    console.log('Creating contents:');
    console.log(contentCmp.nativeElement);
    console.log('Parent:');
    console.log(this.containerRef.nativeElement);
    const el = contentCmp.nativeElement as HTMLElement;
    this.renderer.appendChild(this.containerRef.nativeElement, el.children[0]);
    this.cd.detectChanges();
  }

}
