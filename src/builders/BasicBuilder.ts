import type { GenericBuilderTypes } from "../types/misc";

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
    };

    /**
     * Returns compatible JSON for the type
     * @returns {T}
     */

    JSON(): T {
        return this.data;
    };

    /**
     * Create new data from JSON data
     * @param {T} JSONData - The JSON data
     * @returns {this}
     */

    setDataFrom(JSONData: T): this {
        this.data = JSONData;

        return this;
    };
};