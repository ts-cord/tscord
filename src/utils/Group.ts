export class Group<K, V> extends Map<K, V> {
  /**
   * Returns the value of the first element in the array where predicate is true, and undefined otherwise.
   * @param func
   * find calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found, find immediately returns that element value. Otherwise, find returns undefined.
   * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/find
   */

  find(func: (value: V, index: number, obj: V[]) => unknown): V | undefined {
    return [...this.values()].find(func);
  };

  /**
   * Calls a defined callback function on each element of an array, and returns an array that contains the results.
   * @param func — A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
   * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map
   */

  map(func: (value: [K, V], index: number, array: [K, V][]) => unknown): unknown[] {
    return [...this.entries()].map(func);
  };

  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param func — A function that accepts up to three arguments. The filter method calls the predicate function one,  time for each element in the array.
   * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
   */

  filter(func: (value: V, index: number, array: V[]) => value is V): V[] {
    return [...this.values()].filter(func);
  };

  /**
   * Determines whether all the members of an array satisfy the specified test.
   * @param func
   * A function that accepts up to three arguments. The every method calls the predicate function for each element in the array until the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
   * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/every
   */

  every(func: (value: V, index: number, array: V[]) => value is V): this is V[] {
    return [...this.values()].every(func);
  };

  /**
  * Determines whether the specified callback function returns true for any element of an array.
  * @param func 
  * A function that accepts up to three arguments. The some method calls the predicate function for each element in the array until the predicate returns a value which is coercible to the Boolean value true, or until the end of the array.
  * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/some
  */

  some(func: (value: V, index: number, array: V[]) => unknown): boolean {
    return [...this.values()].some(func);
  };

  /**
   * Returns the Group values.
   * @returns {V[]}
   */

  toArray(): V[] {
    return Array.from(this.values());
  };

  /**
   * Returns the Group in JSON format.
   * @returns { { [k: string]: V } }
   */

  toJSON(): { [k: string]: V } {
    return Object.fromEntries(this.entries());
  };

  /**
   * Get a item by an index.
   * @param {number} index - Index to get the value.
   * @returns {V | undefined}
   * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/at
   */

  at(index: number): V | undefined {
    return [...this.values()].at(index);
  };

  /**
   * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function
   * @param callbackfn - A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array
   * @returns {V}
   * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
   */

  reduce(callbackfn: (previousValue: V, currentValue: V, currentIndex: number, array: V[]) => V): V {
    return [...this.values()].reduce(callbackfn);
  };

  /**
   * Returns true if all keys is in this group keys.
   * @param {K[]} keys - Keys to be checked.
   * @returns {boolean}
   */

  hasAll(...keys: K[]): boolean {
    return keys.every((key: K) => super.has(key));
  };

  /**
   * Returns true if any keys is in this group keys.
   * @param {K[]} keys - Keys to be checked .
   * @returns {boolean}
   */

  hasAny(...keys: K[]): boolean {
    return keys.some((key: K) => super.has(key));
  };

  /**
   * Get the first x entries of this group.
   * @param {number} amount - The amount of items to return.
   * @returns { { [key: string]: V } }
   */

  first<T extends number | undefined>(amount?: T): T extends undefined ? V : { [key: string]: V } {
    return amount ? Object.fromEntries([...this.entries()].slice(0, amount)) : [...this.entries()].at(0);
  };

  /**
   * Get the last x entries of this group.
   * @param {number} amount - The amount of items to return.
   * @returns { { [key: string]: V } }
   */

  last(amount: number = this.size): { [key: string]: V } {
    return Object.fromEntries([...this.entries()].slice(-amount));
  };

  /**
   * Combines the elements of two groups into a new group. If a key already exists in the current group, its value will be updated with the value from the other group.
   * @param group - The other group to merge with the current group.
   * @returns {this} - The merged group.
   */

  merge(group: Group<K, V> | Map<K, V>): this {
    group.forEach((value: V, key: K) => this.set(key, value));

    return this;
  };

  /**
   * Pick a random element in the Group, if the Group is empty, so returns undefined.
   * @returns {V}
   */

  get random(): V {
    const values: V[] = [...this.values()];

    return values[Math.random() * values.length];
  };

  /**
   * Check if the Group is empty.
   * @returns {boolean}
   */

  get empty(): boolean {
    return this.size === 0;
  };

  /**
   * Returns the index of the first element in the array where predicate is true, and -1 otherwise.
   * @param predicate find calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found, findIndex immediately returns that element index. Otherwise, findIndex returns -1.
   * @returns {number}
   * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
   */

  findIndex(predicate: (value: V, index: number, obj: V[]) => unknown): number {
    return this.toArray().findIndex(predicate);
  };

  /**
   * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
   * @returns {V}
   * @see https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight
   */

  reduceRight(callbackfn: (previousValue: V, currentValue: V, currentIndex: number, array: V[]) => V): V {
    return this.toArray().reduceRight(callbackfn);
  };
};