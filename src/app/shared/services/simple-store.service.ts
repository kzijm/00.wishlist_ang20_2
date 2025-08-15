import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

/**
 * Plain Store Service.
 * This is intended to be used to enable communication between components
 * and it should be just in cases where there are not too many states shared between them.
 */

// No need for injectable decorator here, as it is used as a parent of a child instance
// @Injectable({
//   providedIn: 'root',
// })
export class SimpleStoreService<T> {
  protected state!: BehaviorSubject<T>;

  constructor() {}

  /**
   * Initializes the state of the store.
   * This is used to set the initial state of the store.
   * The Child classes should call this method in their constructor
   *
   * @param initialState - the initial state of the store
   */
  public initState(initialState: T): void {
    this.state = new BehaviorSubject<T>(initialState);
  }

  /**
   * Returns an observable for a property on the store.
   * This is used when the consumer needs the stream of changes
   * for the property observed.
   *
   * @param key - the key of the property to be retrieved
   */
  public select<K extends keyof T>(key: K): Observable<T[K]> {
    return this.state.asObservable().pipe(map((keys) => keys[key]));
  }

  /**
   * Gets the current state of a property.
   * This is used when the consumer needs just the current state
   *
   * @param key - the key of the property to be retrieved
   */
  public selectSnapshot<K extends keyof T>(key: K): T[K] {
    return this.state.getValue()[key];
  }

  /**
   * This is used to set a new value for a property
   *
   * @param key - the key of the property to be retrieved
   * @param data - the new data to be saved
   */
  public set<K extends keyof T>(key: K, data: T[K]) {
    this.state.next({ ...this.state.value, [key]: data });
  }

  /**
   * Sets values for multiple properties on the store
   * This is used when there is a need to update multiple properties in the store
   *
   * @param partialState - the partial state that includes the new values to be saved
   */
  public setState(partialState: Partial<T>): void {
    const currentState = this.state.getValue();
    const nextState = Object.assign({}, currentState, partialState);

    this.state.next(nextState);
  }
}
