import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WishStateSignalService } from '../wish-state-signal.service';
import { WishItem } from '../shared/models/wishItem';
import { WishStateService } from '../wish-state.service';

@Component({
  selector: 'app-wish-list-item',
  standalone: false,
  templateUrl: './wish-list-item.component.html',
  styleUrl: './wish-list-item.component.scss',
})
export class WishListItemComponent implements OnInit {
  @Input() item!: WishItem;

  get cssClasses() {
    // console.log('getter');
    return { 'text-decoration-line-through text-muted': this.item.isComplete };
  }
  constructor(
    private wishStateService: WishStateService,
    private wishStateSignalService: WishStateSignalService
  ) {}

  ngOnInit(): void {}

  removeWish() {
    console.log('remove wish', this.item.wishText);
    const wishText = this.item.wishText;
    //this.remove.emit(this.item);
    this.wishStateSignalService.removeItem(wishText);
    this.wishStateService.removeItem(wishText);
  }

  // See removeWish() when handling 2 or more  stores.
  toggleFullfilled() {
    const wishText = this.item.wishText;
    this.wishStateSignalService.toggleItem(this.item);
    this.wishStateService.toggleItem(this.item);
  }
}
