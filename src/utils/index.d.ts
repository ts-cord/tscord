import * as errors from '../constants/errors.json';

declare class TypeCordError<T extends boolean = true> extends Error {
    constructor(message: T extends true ? keyof typeof errors : string, cause?: ErrorOptions);

    toString(): string;
    toJSON(): { name: string; message: string; stack?: string; cause?: unknown; };
    log(): void;
};

declare class TypeCordRangeError extends RangeError {
    constructor(message: string, cause?: ErrorOptions);

    toString(): string
    toJSON(): { name: string; message: string; stack?: string; cause?: unknown };
    log(): void;
};

declare class Group<K, V> extends Map<K, V> {
    public find(func: (value: V, index: number, obj: V[]) => unknown): V | undefined;
    public map(func: (value: [K, V], index: number, array: [K, V][]) => unknown): unknown[];
    public filter(func: (value: V, index: number, array: V[]) => value is V): V[];
    public every(func: (value: V, index: number, array: V[]) => value is V): this is V[];
    public some(func: (value: V, index: number, array: V[]) => unknown): boolean;
    public everyKey(func: (value: K, index: number, array: K[]) => value is K,): this is K[];
    public everyValue(func: (value: V, index: number, array: V[]) => value is V): this is V[];
    public toArray<T extends boolean = true>(groupKeyAndValue?: T): T extends true ? [K, V][] : V[];
    public toJSON(): { [k: string]: V };
    public at(index: number): V | undefined;
    public reduce(callbackfn: (previousValue: V, currentValue: V, currentIndex: number, array: V[]) => V): V;
    public hasAllOf(...keys: K[]): boolean;
    public hasAnyOf(...keys: K[]): boolean;
    public first(amount: number = 1): { [key: string]: V };
    public last(amount: number = this.size): { [key: string]: V };
    public mapValues<U>(callbackfn: (value: V, index: number, array: V[]) => U): U[];
    public mapKeys<U>(callbackfn: (value: K, index: number, array: K[]) => U): U[];
    public merge(group: Group<K, V> | Map<K, V>): this;
    public random(): V;
    public empty(): boolean;
    public findIndex(predicate: (value: V, index: number, obj: V[]) => unknown): V;
    public reduceRight(callbackfn: (previousValue: V, currentValue: V, currentIndex: number, array: V[]) => V): V;
    public indexOf(searchElement: K, fromIndex?: number): number;
};