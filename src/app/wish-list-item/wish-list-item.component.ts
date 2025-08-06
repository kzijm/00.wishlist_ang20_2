import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventBusService } from '../shared/services/event-bus.service';

@Component({
  selector: 'app-wish-list-item',
  standalone: false,
  templateUrl: './wish-list-item.component.html',
  styleUrl: './wish-list-item.component.scss',
})
export class WishListItemComponent implements OnInit {
  @Input() wishText!: string;

  @Input() fullfilled!: boolean;
  @Output() fullfilledChange = new EventEmitter<boolean>();

  get cssClasses() {
    //return this.fullfilled ? ['strikeout','text-muted'] : [];
    console.log('getter');
    return { 'text-decoration-line-through text-muted': this.fullfilled };
  }
  constructor(private eventBus: EventBusService) {
    // this.eventBus
    //   .on$<undefined>('randomToast')
    //   .pipe(takeUntilDestroyed())
    //   .subscribe(() => {});
  }

  ngOnInit(): void {}

  removeWish() {
    //events.emit('removeWish', this.wishText);
  }

  toggleFullfilled() {
    this.fullfilled = !this.fullfilled;
    this.fullfilledChange.emit(this.fullfilled);
  }
}
function takeUntilDestroyed(): import('rxjs').OperatorFunction<
  undefined,
  unknown
> {
  throw new Error('Function not implemented.');
}
