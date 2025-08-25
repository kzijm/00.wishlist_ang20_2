import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WishStateSignalService } from '../services/wish-state-signal.service';
import { WishItem } from '../model/wishItem';
import { WishStateService } from '../services/wish-state.service';

@Component({
  selector: 'app-wish-list-item',
  standalone: false,
  templateUrl: './wish-list-item.component.html',
  styleUrl: './wish-list-item.component.scss',
})
export class WishListItemComponent implements OnInit {
  @Input() item!: WishItem;
  @Input() type!: 'signal' | 'observable';

  get cssClasses() {
    // console.log('getter');
    return { 'text-decoration-line-through text-muted': this.item.isComplete };
  }
  constructor(
    private wishStateService: WishStateService,
    private wishStateSignalService: WishStateSignalService,
  ) {}

  ngOnInit(): void {
    //console.log('type', this.type);
  }

  removeWish() {
    console.log('remove wish', this.item.wishText, this.type);
    const wishText = this.item.wishText;
    //this.remove.emit(this.item);
    if (this.type === 'signal') {
      this.wishStateSignalService.removeItem(wishText);
    } else {
      this.wishStateService.removeItem(wishText);
    }
  }

  toggleFullfilled() {
    const wishText = this.item.wishText;
    if (this.type === 'signal') {
      this.wishStateSignalService.toggleItem(this.item);
    } else {
      this.wishStateService.toggleItem(this.item);
    }
  }
}
