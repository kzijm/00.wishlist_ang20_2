import { Component, Input, Signal } from '@angular/core';
import { ListFilter } from '../../shared/filters';
import { WishStateSignalService } from '../services/wish-state-signal.service';
import { WishStateService } from '../services/wish-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wish-filter',
  standalone: false,
  templateUrl: './wish-filter.component.html',
  styleUrl: './wish-filter.component.scss',
})
export class WishFilterComponent {
  @Input() type: 'signal' | 'observable' = 'signal';

  filters = Object.values(ListFilter);
  listFilterSignal: Signal<ListFilter>;
  listFilter$: Observable<ListFilter>;

  constructor(
    private wishStateService: WishStateService,
    private wishStateSignalService: WishStateSignalService,
  ) {
    this.wishStateSignalService.setFilter(ListFilter.All);
    this.wishStateService.setFilter(ListFilter.All);
    this.listFilterSignal = this.wishStateSignalService.select('listFilter');
    this.listFilter$ = this.wishStateService.select('listFilter');
  }

  // filterSignalChanged(value: ListFilter) {
  //   this.wishStateSignalService.set('listFilter', value);
  // }
  filterChanged(value: ListFilter) {
    if (this.type === 'signal') {
      this.wishStateSignalService.set('listFilter', value);
    } else {
      this.wishStateService.set('listFilter', value);
    }
  }
}
