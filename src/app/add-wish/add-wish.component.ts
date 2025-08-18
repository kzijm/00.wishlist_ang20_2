import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WishStateService } from '../wish-state.service';
import { WishStateSignalService } from '../wish-state-signal.service';
import { WishItem } from '../shared/models/wishItem';

@Component({
  selector: 'app-add-wish',
  standalone: false,
  templateUrl: './add-wish.component.html',
  styleUrl: './add-wish.component.scss',
})
export class AddWishComponent {
  @Input() type: 'signal' | 'observable' = 'signal';
  @Output() addWish = new EventEmitter();

  newWishText: string = '';

  constructor(
    private wishStateService: WishStateService,
    private wishStateSignalService: WishStateSignalService
  ) {}

  addNewWish() {
    if (!this.newWishText.trim()) {
      return; // Prevent adding empty wishes
    }

    if (this.type === 'signal') {
      this.wishStateSignalService.addItem(new WishItem(this.newWishText));
    } else {
      this.wishStateService.addItem(new WishItem(this.newWishText));
    }
    this.newWishText = '';
  }
}
