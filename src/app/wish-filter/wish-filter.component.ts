import { Component, Output, EventEmitter, input } from '@angular/core';
import { ListFilter } from '../shared/filters';

@Component({
  selector: 'app-wish-filter',
  standalone: false,
  templateUrl: './wish-filter.component.html',
  styleUrl: './wish-filter.component.scss',
})
export class WishFilterComponent {
  @Output() changeFilter = new EventEmitter();

  filters = Object.values(ListFilter);

  listFilter = input.required<ListFilter>();

  filterChanged(value: ListFilter) {
    this.changeFilter.emit(value);
  }
}
