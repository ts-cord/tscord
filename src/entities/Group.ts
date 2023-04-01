export class Group<K, V> extends Map<K, V> {
  constructor() {
    super();
  };

  /**
   * Returns the value of the first element in the array where predicate is true, and undefined otherwise.
   * @param func
   * find calls predicate once for each element of the array, in ascending order, until it finds one where predicate returns true. If such an element is found, find immediately returns that element value. Otherwise, find returns undefined.
   * @param thisArg
   * If provided, it will be used as the this value for each invocation of predicate. If it is not provided, undefined is used instead.
   */

  public find(func: (value: V, index: number, obj: V[]) => unknown, thisArg?: any): V | undefined {
    return [...this.values()].find(func)
  };
  
  /**
   * Calls a defined callback function on each element of an array, and returns an array that contains the results.
   * @param func — A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
   * @param thisArg — An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   */
  
  public map(func: (value: [K, V], index: number, array: [K, V][]) => unknown, thisArg?: any): unknown[] {
    return [...this.entries()].map(func) 
  };

  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param func — A function that accepts up to three arguments. The filter method calls the predicate function one,  time for each element in the array.
   * @param thisArg — An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
   */

  public filter(func: (value: V, index: number, array: V[]) => value is V, thisArg?: any): V[] {
    return [...this.values()].filter(func)
  };

  /**
   * Determines whether all the members of an array satisfy the specified test.
   * @param func
   * A function that accepts up to three arguments. The every method calls the predicate function for each element in the array until the predicate returns a value which is coercible to the Boolean value false, or until the end of the array.
   * @param thisArg
   * An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
   */

  public every(func: (value: V, index: number, array: V[]) => value is V, thisArg?: any): this is V[] {
    return [...this.values()].every(func)
  };
  
  /**
  * Determines whether the specified callback function returns true for any element of an array.
  * @param func 
  * A function that accepts up to three arguments. The some method calls the predicate function for each element in the array until the predicate returns a value which is coercible to the Boolean value true, or until the end of the array.
  * @param thisArg
  * An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the  this value.
  */
  
  public some(func: (value: V, index: number, array: V[]) => unknown, thisArg?: any): boolean {
    return [...this.values()].some(func)
  };
};