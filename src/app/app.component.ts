import {
  ChangeDetectionStrategy,
  Component,
  signal,
  computed,
} from '@angular/core';
import { WishItem } from './shared/models/wishItem';
import { ListFilter } from './shared/filters';
import { WishStateService } from './wish-state.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WishStateService],
})
export class AppComponent {
  title = 'wishlist';

  items = signal<WishItem[]>([
    new WishItem('Learn Angular'),
    new WishItem('Get Coffee', true),
    new WishItem('Find grass that cuts itself'),
  ]);

  listFilter = signal<ListFilter>(ListFilter.All);
  constructor(private wishStateService: WishStateService) {
    const items = this.wishStateService
      .select('items')
      .pipe(takeUntilDestroyed())
      .subscribe((items) => console.log(items));

    // name = this.wishStateService.select('wishText');
    //const item = this.wishStateService.state.asReadonly();
  }

  addNewWish(wish: string) {
    this.items.update((items) => [...items, new WishItem(wish)]);
  }

  filterChanged(value: ListFilter) {
    console.log('filter', value);
    this.listFilter.set(value);
  }

  toggleItem(t_item: WishItem) {
    console.log('togglr', t_item);
    this.items.update((items) => {
      // items.map((item) => {
      //   item === t_item
      //     ? <WishItem>{ ...item, isComplete: !item.isComplete }
      //     : item;
      // });
      items.forEach((item) => {
        if (item === t_item) {
          item.isComplete = !item.isComplete;
        }
      });
      return [...items];
    });
  }

  // signal sample
  // counter = signal(0);
  // multiplier: number = 0;
  // arr = signal([1, 2, 3]);

  // derivedCounter = computed(() => {
  //   if (this.counter() == 0) {
  //     return 0;
  //   } else {
  //     return this.counter() * this.multiplier;
  //   }
  // });

  // derivedArr = computed(() => {
  //   if (this.arr().length === 0) {
  //     return [];
  //   } else {
  //     return this.arr().filter((item) => item < 4);
  //   }
  // });

  // increment() {
  //   this.counter.set(this.counter() + 1);
  //   console.log(`Updating counter...`, this.counter());
  //   console.log(`Updating derived...`, this.derivedCounter());
  // }
  // addItem() {
  //   this.arr.set([...this.arr(), this.arr().length + 1]);
  //   console.log(`Updating counter...`, this.arr());
  //   console.log(`Updating derived...`, this.derivedArr());
  // }

  // foo = signal('foo value');
  // bar = signal('bar value');

  // baz = computed(() => `${this.foo()}-${this.bar()}`);

  // setFoo() {
  //   this.foo.set('edited foo value');
  // }
}
