import {
  ChangeDetectionStrategy,
  Component,
  signal,
  Signal,
} from '@angular/core';
import { WishItem } from './shared/models/wishItem';
import { ListFilter } from './shared/filters';
import { WishStateService } from './wish-state.service';
import { WishStateSignalService } from './wish-state-signal.service';
import { WishService } from './shared/services/wish.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WishStateService, WishStateSignalService, WishService], // init here
})
export class AppComponent {
  title = 'wishlist';

  storeItems!: Signal<WishItem[]>;

  listFilter = signal<ListFilter>(ListFilter.All);
  constructor(
    private wishStateService: WishStateService,
    private wishStateSignalService: WishStateSignalService
  ) {}

  testState() {
    // overwrite state
    this.wishStateSignalService.set('items', [
      new WishItem('Get Coffee', true),
      new WishItem('Find grass that cuts itself'),
    ]);
    // add / set / toggle partials
    this.wishStateSignalService.addItem(new WishItem('new item'));
    this.wishStateSignalService.setFilter(ListFilter.UnfulFilled);

    this.storeItems = this.wishStateSignalService.select('items');
    this.wishStateSignalService.toggleItem(this.storeItems()[1]);

    console.log(this.storeItems());
    console.log(this.wishStateSignalService.getState()());

    // other tests
    // const clicks$ = fromEvent(document, 'click');
    // clicks$.subscribe((event) => {
    //   console.log('Clicked');
    // });

    //   fromEvent(document, 'click')
    //     .pipe(
    //       // restart counter on every click
    //       switchMap(() => interval(1000))
    //     )
    //     .subscribe(console.log);
  }
}
