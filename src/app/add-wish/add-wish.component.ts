import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-wish',
  standalone: false,
  templateUrl: './add-wish.component.html',
  styleUrl: './add-wish.component.scss',
})
export class AddWishComponent {
  @Output() addWish = new EventEmitter();

  newWishText: string = '';

  addNewWish() {
    this.addWish.emit(this.newWishText);
    this.newWishText = '';
  }
}
