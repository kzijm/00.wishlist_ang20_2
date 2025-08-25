import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, debounce, debounceTime } from 'rxjs/operators';
import { WishItem } from '../../wishes/model/wishItem';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  items: WishItem[] = [
    {
      wishText: 'Learn Angular',
      isComplete: false,
    },
    {
      wishText: 'Get Coffee',
      isComplete: true,
    },
    {
      wishText: 'Find grass that cuts itself',
      isComplete: false,
    },
  ];

  constructor() {}

  getAll(params: Params): Observable<WishItem[]> {
    return of(this.items).pipe(delay(1000));
  }

  create(item: WishItem): Observable<WishItem> {
    this.items.push(item);
    return of(item);
  }
}
