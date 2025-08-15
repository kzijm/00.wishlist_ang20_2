import { Component, Signal } from '@angular/core';
import { ListFilter } from '../shared/filters';
import { WishStateSignalService } from '../wish-state-signal.service';
import { WishStateService } from '../wish-state.service';

@Component({
  selector: 'app-wish-filter',
  standalone: false,
  templateUrl: './wish-filter.component.html',
  styleUrl: './wish-filter.component.scss',
})
export class WishFilterComponent {
  filters = Object.values(ListFilter);
  listFilter: Signal<ListFilter>;

  constructor(
    private wishStateService: WishStateService,
    private wishStateSignalService: WishStateSignalService
  ) {
    this.wishStateSignalService.setFilter(ListFilter.All);
    this.listFilter = this.wishStateSignalService.select('listFilter');
  }

  filterChanged(value: ListFilter) {
    this.wishStateSignalService.set('listFilter', value);
    this.wishStateService.set('listFilter', value);
  }
}
