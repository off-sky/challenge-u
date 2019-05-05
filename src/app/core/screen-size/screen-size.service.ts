import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScreenSizeType } from './interfaces';
import { ScreenSizeComponent } from './screen-size/screen-size.component';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {

  constructor() { }

  public screenSize$(): Observable<ScreenSizeType> {
    return new Observable(observer => {
      const sub = ScreenSizeComponent.screenSizeSubject
        .subscribe(size => observer.next(size));

      return () => sub.unsubscribe();
    });
  }
}
