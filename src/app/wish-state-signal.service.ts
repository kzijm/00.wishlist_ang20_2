import { computed, Injectable, signal } from '@angular/core';
import { WishItem } from './shared/models/wishItem';
import { SimpleSignalStoreService } from './shared/services/simple-signal-store.service';
import { ListFilter } from './shared/filters';

export interface WishStateSignal {
  items: WishItem[];
  listFilter: ListFilter;
}

// @Injectable({
//   providedIn: 'root',
// })
// inject in the app.component!
@Injectable()
export class WishStateSignalService extends SimpleSignalStoreService<WishStateSignal> {
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

    // signal service
    this.setState(initialState);
  }

  addItem(item: WishItem) {
    console.log('signal add');
    this.set('items', [...this.select('items')(), item]);
  }

  removeItem(wishText: string) {
    console.log('signal remove');
    this.set('items', [
      ...this.select('items')().filter((i) => i.wishText != wishText),
    ]);
  }

  setFilter(filter: ListFilter) {
    this.set('listFilter', filter);
  }

  toggleItem(t_item: WishItem) {
    console.log('toggle', t_item.wishText);
    const curItems = this.select('items')();
    const newItems = curItems.map((item) => {
      return item === t_item
        ? <WishItem>{ ...item, isComplete: !item.isComplete }
        : item;
    });
    this.set('items', newItems);
  }
}
