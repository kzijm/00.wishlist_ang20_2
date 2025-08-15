import { Component, EventEmitter, Output } from '@angular/core';
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

    this.wishStateSignalService.addItem(new WishItem(this.newWishText));
    this.wishStateService.addItem(new WishItem(this.newWishText));
    this.newWishText = '';
  }
}
