import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WishItem } from './model/wishItem';
import { ListFilter } from '../shared/filters';
import { WishStateService } from './services/wish-state.service';
import { WishStateSignalService } from './services/wish-state-signal.service';
import { WishService } from './services/wish.service';

// form typing
// see https://stackoverflow.com/questions/72507263/angular-14-strictly-typed-reactive-forms-how-to-type-formgroup-model-using-exi
type Unbox<T> = T extends Array<infer V> ? V : T;
export type ModelFormGroup<T> = FormGroup<{
  [K in keyof T]: T[K] extends Array<any>
    ? FormArray<FormControl<Unbox<T[K]>>>
    : FormControl<T[K]>;
}>;

// userFormGroup: ModelFormGroup<Treasure>;
// userFormGroup: ModelFormGroup<Pick<UserModel, 'email' | 'password' >>;

@Component({
  selector: 'app-wishes',
  standalone: false,
  templateUrl: './wishes.component.html',
  styleUrl: './wishes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WishStateSignalService, WishService], // init here
})
export class WishesComponent {
  title = 'wishlist';

  wishes$: Signal<WishItem[]>;
  wishesLoading: Signal<boolean>;
  wishesError!: Signal<Error | undefined>;

  constructor(private wishService: WishService) {
    // wishservice
    this.wishes$ = this.wishService.wishes;
    this.wishesLoading = this.wishService.loading;
    this.wishesError = this.wishService.error;
  }

  ngOnInit(): void {}
}
