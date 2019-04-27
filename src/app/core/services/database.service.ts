import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { clgu } from '../../../types';
import { take } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import 'firebase/database';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private configService: ConfigService) {
      this.configService.configs()
        .pipe(
          take(1)
        )
        .subscribe(env => this.initializeApp(env))
  }


  /**
   * 
   * @param path 
   * @param value
   * @returns object uid 
   */
  public push(path: string, value: any): Observable<string> {
      const key = new Promise<string>((resolve, reject) => {
        const ref = firebase.database().ref(path).push(value, (err) => {
          if (err) {
            reject(err);
          }
          resolve(ref.key)
        });
      });
      

      return from(key);
  }



  public set(path: string, value: any): Observable<void> {
    const promise = new Promise<void>((resolve, reject) => {
      const ref = firebase.database().ref(path).set(value, (err) => {
        if (err) {
          reject(err);
        }
        resolve(promise);
      });
    });

    return from(promise);
  }


  public readOnce(path: string,
                  orderByChild?: string,
                  startAt?: string | number,
                  endAt?: string | number,
                  limitFirst?: number,
                  limitLast?: number): Observable<any> {

    const promise = new Promise<any>((resolve, reject) => {
      
      const ref = this.getRef(path, orderByChild, startAt, endAt, limitFirst, limitLast);

      ref.once('value')
        .then(res => resolve(res.val()))
        .catch(err => reject(err))
    });

    return from(promise);
  }


  /**
   * 
   * @param path 
   * @param orderByChild 
   * @param startAt 
   * @param endAt 
   * @param limitFirst 
   * @param limitLast 
   */
  public exists(path: string,
                orderByChild?: string,
                startAt?: string | number,
                endAt?: string | number,
                limitFirst?: number,
                limitLast?: number): Observable<boolean> {
      const promise = new Promise<any>((resolve, reject) => {

        const ref = this.getRef(path, orderByChild, startAt, endAt, limitFirst, limitLast);
  
        ref.once('value')
          .then(res => resolve(res.exists()))
          .catch(err => reject(err))
      });
  
      return from(promise);     
  }


  private getRef( path: string,
                  orderByChild?: string,
                  startAt?: string | number,
                  endAt?: string | number,
                  limitFirst?: number,
                  limitLast?: number): firebase.database.Reference {
    const ref = firebase.database().ref(path);
    if (orderByChild) {
      ref.orderByChild(orderByChild);
    }
    if (startAt) {
      ref.startAt(startAt);
    }
    if (endAt) {
      ref.endAt(endAt);
    }
    if (limitFirst) {
      ref.limitToFirst(limitFirst);
    }
    if (limitLast) {
      ref.limitToLast(limitLast);
    }
    return ref;
  }



  private initializeApp(env: clgu.common.Environment): void {
    const config = {
      apiKey: env.apiKey,
      authDomain: env.authDomain,
      databaseURL: env.databaseURL,
      projectId: env.projectId,
      storageBucket: env.storageBucket,
      messagingSenderId: env.messagingSenderId
    };

    try {
      firebase.app();
    } catch (err) {
      console.log('Initializing firebase...')
      firebase.initializeApp(config);
    }

  
  }
}
