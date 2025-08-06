import {
  Component,
  computed,
  Output,
  EventEmitter,
  input,
} from '@angular/core';
import { WishItem } from '../shared/models/wishItem';
import { ListFilter } from '../shared/filters';

@Component({
  selector: 'app-wish-list',
  standalone: false,
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
})
export class WishListComponent {
  @Output() toggleCheckbox = new EventEmitter<WishItem>();

  // converted to signals
  items = input<WishItem[]>([]);
  filter = input.required<string>();

  // computed from signals
  visibleItems = computed<WishItem[]>(() => {
    const listFilter = this.filter();
    if (listFilter === ListFilter.All) {
      return this.items();
    } else if (listFilter === ListFilter.UnfulFilled) {
      return this.items().filter((item) => !item.isComplete);
    } else {
      return this.items().filter((item) => item.isComplete);
    }
  });

  toggleItem(item: WishItem) {
    this.toggleCheckbox.emit(item);
  }
}
