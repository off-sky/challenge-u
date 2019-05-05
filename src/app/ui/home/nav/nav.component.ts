import { Component, OnInit, Input } from '@angular/core';
import { ScreenSizeService } from 'src/app/core/screen-size/screen-size.service';
import { ScreenSizes } from 'src/app/core/screen-size/interfaces';
import { Observable } from 'rxjs';
import { RouterService } from 'src/app/core/services/router.service';

@Component({
  selector: 'y-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() public opened: boolean;

  public isRouteLoading$: Observable<boolean>;

  constructor(
    private screenSizeService: ScreenSizeService,
    private routerService: RouterService
  ) { }

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
