import { Component, computed } from '@angular/core';
import { WishItem } from '../shared/models/wishItem';
import { ListFilter } from '../shared/filters';
import { WishStateSignalService } from '../wish-state-signal.service';
import { WishStateService } from '../wish-state.service';
import { map, Observable, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-wish-list',
  standalone: false,
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
})
export class WishListComponent {
  // computed from signals
  visibleSignalItems = computed<WishItem[]>(() => {
    console.log('computed visible');
    const listFilter = this.wishStateSignalService.select('listFilter');
    const items = this.wishStateSignalService.select('items');
    if (listFilter() === ListFilter.All) {
      return items();
    } else if (listFilter() === ListFilter.UnfulFilled) {
      return items().filter((item) => !item.isComplete);
    } else {
      return items().filter((item) => item.isComplete);
    }
  });

  visibleItems!: WishItem[];
  constructor(
    private wishStateService: WishStateService,
    private wishStateSignalService: WishStateSignalService
  ) {
    // this.visibleItems from observables
    this.wishStateService
      .getVisibleItems()
      .pipe(
        takeUntilDestroyed(),
        tap((items) => console.log('visible items', items))
      )
      .subscribe((items) => (this.visibleItems = items));
  }

  // removeWish(item: WishItem) {
  //   console.log('remove wish', item.wishText);
  //   this.wishStateSignalService.removeItem(item);
  //   this.wishStateService.removeItem(item);
  // }
  toggleFullfilled(item: WishItem) {
    this.wishStateSignalService.toggleItem(item);
    this.wishStateService.toggleItem(item);
  }
}
