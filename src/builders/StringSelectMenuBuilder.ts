import { BasicSelectMenuBuilder } from "./BasicSelectMenuBuilder";
import { SelectMenuOptionsData, SelectMenuTypes, StringSelectMenuData } from "../types";

export class StringSelectMenuBuilder extends BasicSelectMenuBuilder {
    data: Partial<StringSelectMenuData>;
    options: SelectMenuOptionsData[];

    constructor(data: Partial<StringSelectMenuData>) {
        super(data);

        this.options = [];
        this.data = { ...data, type: SelectMenuTypes.StringSelect };
    }

    /**
     * Sets the options to this select menu options
     * @param {SelectMenuOptionsData[]} options - The options to set
     * @returns {this}
     */

    setOptions(...options: SelectMenuOptionsData[]): this {
        this.options = options;
        this.data.options = options;

        return this;
    }

    /**
     * Add options to this select menu options
     * @param {SelectMenuOptionsData[]} options - The options to add
     * @returns {this}
     */

    addOptions(...options: SelectMenuOptionsData[]): this {
        this.data.options ? this.data.options.push(...options) : this.data.options = options;
        this.options = this.data.options;

        return this;
    }
}