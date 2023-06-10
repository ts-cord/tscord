import type { GenericBuilderTypes } from "../types";

export class BasicBuilder<T extends GenericBuilderTypes> {
    data: T;

    /**
     * Represents a basic builder for all builders
     * @param {T | undefined} data - Data in JSON format
     * @constructor
     * @example ```ts
     * import { BasicBuilder, ButtonData, ButtonStyles, ComponentTypes } from 'typecord';
     * 
     * new BasicBuilder<ButtonData>({ label: '123', style: ButtonStyles.Primary, type: ComponentTypes.Button });
     * ```
     */

    constructor(data?: T) {
        this.data = data ?? {} as T;
    }

    /**
     * Returns compatible JSON for the type
     * @returns {T}
     */

    JSON(): T {
        return this.data;
    }

    /**
     * Create new data from a JSON data
     * @param {T} data - The JSON data
     * @returns {BasicBuilder<T>}
     */

    static from<T extends GenericBuilderTypes>(data: T): BasicBuilder<T> {
        return new BasicBuilder<T>(data);
    }
}