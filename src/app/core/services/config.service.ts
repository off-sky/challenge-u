import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { clgu } from '../../../types';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }


  public configs(): Observable<clgu.common.Environment> {
    return of(environment);
  }
}
