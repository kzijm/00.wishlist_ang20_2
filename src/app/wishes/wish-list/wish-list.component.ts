import { Component, computed, Input, OnInit, Signal } from '@angular/core';
import { WishItem } from '../model/wishItem';
import { ListFilter } from '../../shared/filters';
import { WishStateSignalService } from '../services/wish-state-signal.service';
import { WishStateService } from '../services/wish-state.service';
import { map, Observable, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-wish-list',
  standalone: false,
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
})
export class WishListComponent implements OnInit {
  @Input() type!: 'signal' | 'observable';

  visibleSignalItems!: Signal<WishItem[]>;
  visibleItems!: WishItem[];

  constructor(
    private wishStateService: WishStateService,
    private wishStateSignalService: WishStateSignalService,
  ) {
    // computed from signals
    this.visibleSignalItems = computed<WishItem[]>(() => {
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

    // subscribed from observables
    this.wishStateService
      .getVisibleItems()
      .pipe(
        takeUntilDestroyed(),
        tap((items) => console.log('visible items', items)),
      )
      .subscribe((items) => (this.visibleItems = items));
  }

  ngOnInit(): void {
    console.log('type', this.type);
    // this.visibleItems from observables
    // this.wishStateService
    //   .getVisibleItems()
    //   .pipe(
    //     takeUntilDestroyed(),
    //     tap((items) => console.log('visible items', items))
    //   )
    //   .subscribe((items) => (this.visibleItems = items));
  }
}
