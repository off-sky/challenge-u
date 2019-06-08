import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NavComponent } from 'src/app/ui/home/nav/nav.component';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor() {

  }

  public contentScrolledY(): Observable<number> {
    return NavComponent.contentScrolledY()
  }

  public currentContentScroll(): Promise<number> {
    return new Promise((resolve, reject) => {
        const cb = (n: number) => resolve(n);  
        NavComponent.currentContentScrollY(cb);
    });
  }

  public scrollContentY(y: number): void {
    NavComponent.scrollContentToY(y);
  }

  public scrollContentToBottom(): void {
    NavComponent.scrollContentToBottom();
  }
}
