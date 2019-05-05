import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  private routerLoadingSubj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router
  ) {
    this.initRouterSubscription(router);
  }


  public isLoading$(): Observable<boolean> {
    return new Observable(observer => {
      const sub = this.routerLoadingSubj.subscribe(loading => observer.next(loading));

      return () => sub.unsubscribe();
    })
  }


  private initRouterSubscription(r: Router): void {
    r.events
      .subscribe(e => {
        if (e instanceof NavigationStart) {
          this.routerLoadingSubj.next(true);
        }
        if (e instanceof NavigationEnd || e instanceof NavigationError || e instanceof NavigationCancel) {
          this.routerLoadingSubj.next(false);
        }
      })
  }


}
