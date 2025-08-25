import { HttpClient } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  Signal,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import {
  ResourceService,
  Treasure,
} from '../../shared/services/resource.service';
import { ActivatedRoute, Params } from '@angular/router';

// form typing
// see https://stackoverflow.com/questions/72507263/angular-14-strictly-typed-reactive-forms-how-to-type-formgroup-model-using-exi
// userFormGroup: ModelFormGroup<Treasure>;
// userFormGroup: ModelFormGroup<Pick<UserModel, 'email' | 'password' >>;

type Unbox<T> = T extends Array<infer V> ? V : T;
export type ModelFormGroup<T> = FormGroup<{
  [K in keyof T]: T[K] extends Array<any>
    ? FormArray<FormControl<Unbox<T[K]>>>
    : FormControl<T[K]>;
}>;

export type TreasureCreate = Omit<
  Treasure,
  'id' | 'shortDescription' | 'createdAtAgo' | 'isPublished'
>;

@Component({
  selector: 'app-treasure-list',
  standalone: false,
  templateUrl: './treasure-list.component.html',
  styleUrl: './treasure-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class TreasureListComponent implements OnInit {
  private readonly http = inject(HttpClient); // inject ipv constructor!
  private fb = inject(NonNullableFormBuilder);
  private resourceService = inject(ResourceService);
  private activatedRoute = inject(ActivatedRoute);

  userId = this.activatedRoute.snapshot.paramMap.get('user') || '1';
  treasuresFilter = '';

  treasures: Signal<Treasure[]> = this.resourceService.treasures;
  treasuresLoading: Signal<boolean> = this.resourceService.loading;
  treasuresError: Signal<Error | undefined> = this.resourceService.error;

  treasureForm: ModelFormGroup<TreasureCreate> = this.fb.group({
    name: ['Zwaard', { validators: [Validators.required] }],
    description: ['mooi ding', { validators: [Validators.required] }],
    value: [3000, { validators: [Validators.required] }],
    coolFactor: [4, { validators: [Validators.required] }],
    relation: ['/api/users/1', { validators: [Validators.required] }],
  });

  constructor() {
    console.log(this.activatedRoute);
    const snapshot = this.activatedRoute.snapshot;
    console.log({
      url: snapshot.url,
      params: snapshot.params,
      queryParams: snapshot.queryParams, // Query parameters
    });
    console.log('pages', snapshot.paramMap.get('page'));

    // get treasers
    // this.activatedRoute.params.subscribe((params) => this.getTreasures(params));
    this.activatedRoute.queryParams.subscribe((params) => {
      this.setTreasuresFilter(params);
      this.getTreasures(params);
    });
  }

  ngOnInit() {
    // this.resourceService.searchTreasures({ page:1, isPublished: true, relation='1'  });
    // const p = this.activatedRoute.snapshot.params;
    // console.log('page', p);
    // this.resourceService.searchTreasures({
    //   page: 1,
    //   relation: '1',
    // });
  }

  setTreasuresFilter(params: Params) {
    Object.keys(params).forEach((k) => {
      this.treasuresFilter += k + ': ' + params[k] + ' ';
    });
  }

  getTreasures(params: Params) {
    this.resourceService.searchTreasures({
      relation: this.userId,
      page: params['page'] ?? 1,
      isPublished: params['published'] === 'true' ? true : undefined,
    });
  }

  deleteTreasure(id: number) {
    this.resourceService.deleteTreasureById(id);
  }

  addTreasure() {
    // const payload = this.treasureForm.value;
    const payload = this.treasureForm.getRawValue(); // removes undefined values
    this.resourceService.createTreasure(payload);
  }
}
