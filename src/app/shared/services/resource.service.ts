import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';
import { map, firstValueFrom, tap, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { SimpleSignalStoreService } from './simple-signal-store.service';

export type Cat = {
  age: number;
  breed: string;
  color: string;
  name: string;
  id: string;
};

export type Treasure = {
  id?: number;
  name: string;
  description: string;
  value: number;
  coolFactor: number;
  relation: string;
  shortDescription?: string;
  createdAtAgo?: string;
  isPublished?: boolean;
};

export interface TreasureStore {
  items: Treasure[];
}
// ?page=1&isPublished=false

export type User = {
  id?: number;
  email: string;
  roles?: Array<any>;
  password?: string;
  username: string;
};

// export type TreasuresParams = Omit<Treasure, 'id'>;
export type TreasuresParams = Treasure & { page?: number };

@Injectable({
  providedIn: 'root',
})
export class ResourceService extends SimpleSignalStoreService<TreasureStore> {
  private readonly http = inject(HttpClient); // inject ipv constructor!

  private user: User = {
    username: 'ClumsyClaws1',
    email: 'mertz.deshawn@yahoo.com',
  };

  private readonly apiTreasures = 'https://127.0.0.1:8000/api/dragon_treasures';

  private readonly treasuresParams = signal<Params>({});

  private readonly treasureResource = rxResource({
    params: () => this.treasuresParams(),
    defaultValue: [],
    stream: ({ params }) => this.getDragonTreasures$(params),
  });

  constructor() {
    super();
    // this.searchTreasures({});
    // this.getAllTreasures();
    // const treasures = this.treasureResource.value();
    // this.set('items', this.treasures());
  }

  private getDragonTreasures$(params: Params): Observable<Treasure[]> {
    return this.http
      .get<Treasure[]>(`${this.apiTreasures}.json`, { params })
      .pipe(
        // do we need this? map((treasure) => treasure.map((c) => this.transformTreasure(c))),
        // set result in store
        tap((c: Treasure[]) => this.set('items', c)),
        tap((c: Treasure[]) => console.log(c)),
      );
  }

  private postTreasure$(payload: TreasuresParams) {
    return this.http.post<Treasure>(this.apiTreasures, payload);
    //.pipe(map((treasure) => this.transformTreasure(treasure)));
  }

  // private putCat$(payload: Partial<treasuresParams>) {
  //   return this.http
  //     .put<Cat>(this.apiCats, payload)
  //     .pipe(map((cat) => this.transformCat(cat)));
  // }

  private deleteTreasure(id: number) {
    return this.http.delete(`${this.apiTreasures}/${id}`);
  }

  private transformTreasure(treasure: Treasure) {
    return { ...treasure };
  }

  private sanitizeParams(params: Partial<TreasuresParams>): Params {
    const p: Params = {};
    for (const k in params) {
      const v = params[k as keyof TreasuresParams];
      if (v !== undefined && v !== null && v !== '') {
        p[k] = v;
      }
    }
    console.log('params', p);
    return p;
  }

  // public api of the service

  // asReadonly prevents assigning to the cats value
  // without using the service interface

  readonly treasures = this.treasureResource.value.asReadonly();

  readonly loading = this.treasureResource.isLoading;

  readonly error = this.treasureResource.error;

  searchTreasures(params: Partial<TreasuresParams>) {
    const p = this.sanitizeParams(params);
    this.treasuresParams.set(p);
  }

  //create treasure
  async createTreasure(payload: TreasuresParams) {
    const n = await firstValueFrom(this.postTreasure$(payload));
    this.treasureResource.reload();
    return n;
  }

  // async updateCat(payload: Partial<TreasuresParams>) {
  //   const u = await firstValueFrom(this.putCat$(payload));
  //   this.catResource.reload();
  //   return u;
  // }

  async deleteTreasureById(id: number) {
    await firstValueFrom(this.deleteTreasure(id));
    this.treasureResource.reload();
  }
}
