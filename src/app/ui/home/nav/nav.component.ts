import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ScreenSizeService } from 'src/app/core/screen-size/screen-size.service';
import { ScreenSizes } from 'src/app/core/screen-size/interfaces';
import { Observable, fromEvent, Subject } from 'rxjs';
import { RouterService } from 'src/app/core/services/router.service';

@Component({
  selector: 'y-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements AfterViewInit, OnInit {


  private static contentScrolledY$: Subject<number> = new Subject<number>();
  private static scrollContentTo$: Subject<number> = new Subject<number>();
  private static scrollContentToBottom$: Subject<void> = new Subject<void>();
  private static contentCurrentScrollRequest$: Subject<(number) => void> = new Subject<(number) => void>();

  public static contentScrolledY(): Observable<number> {
      return NavComponent.contentScrolledY$.asObservable();
  }

  public static scrollContentToY(y: number): void {
    this.scrollContentTo$.next(y);
  }

  public static scrollContentToBottom(): void {
    this.scrollContentToBottom$.next();
  }

  public static currentContentScrollY(cb: (number) => void): void {
    this.contentCurrentScrollRequest$.next(cb);
  }


  @Input() public opened: boolean;

  public isRouteLoading$: Observable<boolean>;
  @ViewChild('content') private content: ElementRef;

  constructor(
    private screenSizeService: ScreenSizeService,
    private routerService: RouterService
  ) { }

  ngAfterViewInit(): void {
    const el = this.content.nativeElement as HTMLDivElement;
    fromEvent(el, 'scroll')
      .subscribe((ev) => {
        NavComponent.contentScrolledY$.next(el.scrollTop);
      });

    NavComponent.scrollContentTo$
      .subscribe(y => el.scrollTop =y);

    NavComponent.scrollContentToBottom$
      .subscribe(() => el.scrollTop = el.scrollHeight);

    NavComponent.contentCurrentScrollRequest$
      .subscribe(cb => cb(el.scrollTop))
  }

  ngOnInit() {
    this.isRouteLoading$ = this.routerService.isLoading$();
    this.screenSizeService.screenSize$()
      .subscribe(size => {
        console.log({ size })
        if (size === ScreenSizes.DESKTOP) {
          this.opened = true;
        }
        if (size === ScreenSizes.MOBILE) {
          this.opened = false;
        }
      })
  }

}
