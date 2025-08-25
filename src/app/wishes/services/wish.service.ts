import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { WishItem } from '../model/wishItem';
import { ApiService } from '../../shared/services/api.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';

export type WishParams = {};

@Injectable()
export class WishService {
  private user = {
    username: 'ClumsyClaws1',
    email: 'mertz.deshawn@yahoo.co',
  };
  private readonly wishParams = signal<Params>({});
  private readonly wishResource = rxResource({
    // request changed to 'params' in v20
    params: () => this.wishParams(),
    defaultValue: [],
    stream: ({ params }) => this.getWishes$(params),
  });

  readonly wishes = this.wishResource.value.asReadonly();
  readonly loading = this.wishResource.isLoading;
  readonly error = this.wishResource.error;

  constructor(
    private http: HttpClient,
    private api: ApiService,
  ) {}

  private getStandardOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  private getWishes$(params: Params): Observable<WishItem[]> {
    const options = this.getStandardOptions();
    return this.api.getAll(params); // Use the ApiService to fetch wishes
    //return this.http.get('/assets/wishes.json', options);
  }

  private sanitizeParams(params: Partial<WishParams>): Params {
    const p: Params = {};
    for (const k in params) {
      const v = params[k as keyof WishParams];
      if (v !== undefined && v !== null && v !== '') {
        p[k] = v;
      }
    }
    console.log('wish params', p);
    return p;
  }

  // private postTreasure$(payload: treasuresParams) {
  //   return this.http
  //     .post<Treasure>(this.apiCats, payload)
  //     .pipe(map((cat) => this.transformCat(cat)));
  // }

  // public methods

  searchWishes(params: Partial<WishParams>) {
    const p = this.sanitizeParams(params);
    this.wishParams.set(p);
  }

  // async addWish(payload: WishItem): Observable<WishItem> {
  //   const n = await firstValueFrom(this.postCat$(payload));
  // }

  // async createTreasure(payload: TreasuresParams) {
  //   const n = await firstValueFrom(this.postCat$(payload));
  //   this.catResource.reload();
  //   return n;
  // }
  // addWish(item: WishItem): Observable<WishItem> {
  //   return this.http.post<WishItem>(
  //     '/assets/wishes.json',
  //     item,
  //     this.getStandardOptions(),
  //   );
  // }

  // updateWish(item: WishItem): Observable<WishItem> {
  //   return this.http.put<WishItem>(
  //     `/assets/wishes.json/${item.id}`,
  //     item,
  //     this.getStandardOptions()
  //   );
  // }

  // deleteWish(id: string): Observable<void> {
  //   return this.http.delete<void>(
  //     `/assets/wishes.json/${id}`,
  //     this.getStandardOptions()
  //   );
  // }
}
