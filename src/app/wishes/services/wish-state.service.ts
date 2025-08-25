import { Injectable } from '@angular/core';
import { WishItem } from '../model/wishItem';
import { SimpleStoreService } from '../../shared/services/simple-store.service';
import { map, Observable, switchMap, tap } from 'rxjs';
import { WishService } from './wish.service';

import { ListFilter } from '../../shared/filters';

export interface WishState {
  items: WishItem[];
  listFilter: ListFilter;
}

@Injectable({
  providedIn: 'root',
})
// inject in the app.component
// @Injectable()
export class WishStateService extends SimpleStoreService<WishState> {
  constructor() {
    super();

    const initialState = {
      items: [
        new WishItem('Learn Angular'),
        new WishItem('Get Coffee', true),
        new WishItem('Find grass that cuts itself'),
      ],
      listFilter: ListFilter.All,
    };

    this.initState(initialState);
  }

  getVisibleItems(): Observable<WishItem[]> {
    return this.select('listFilter').pipe(
      tap((filter) => console.log('listFilter', filter)),
      switchMap((listFilter) => {
        return this.select('items').pipe(
          map((items) => {
            if (listFilter === ListFilter.All) {
              return items;
            } else if (listFilter === ListFilter.UnfulFilled) {
              return items.filter((item) => !item.isComplete);
            } else {
              return items.filter((item) => item.isComplete);
            }
          }),
        );
      }),
    );
  }

  addItem(item: WishItem) {
    //console.log(this.state.getValue());
    console.log('subject add');
    this.set('items', [...this.selectSnapshot('items'), item]);
  }

  removeItem(wishText: string) {
    console.log('signal remove');
    this.set('items', [
      ...this.selectSnapshot('items').filter((i) => i.wishText !== wishText),
    ]);
  }

  setFilter(filter: ListFilter) {
    this.set('listFilter', filter);
  }

  toggleItem(t_item: WishItem) {
    console.log('toggle', t_item.wishText);
    const curItems = this.selectSnapshot('items');
    const newItems = curItems.map((item) => {
      // toggle the item
      return item === t_item
        ? <WishItem>{ ...item, isComplete: !item.isComplete }
        : item;
    });
    this.set('items', newItems);
  }

  // READ
  // loadWishes() {
  //   this.wishService.getWishes$({}).subscribe((wishes: WishItem[]) => {
  //     this.set('items', wishes);
  //   });
  //   (error: any) => {
  //     console.error('Error loading wishes:', error);
  //     // Handle the error appropriately, e.g., show a notification
  //   };
  // }
}
