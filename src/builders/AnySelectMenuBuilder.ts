import { BasicSelectMenuBuilder } from "./BasicSelectMenuBuilder";
import { ChannelTypes, SelectMenuData, SelectMenuOptionsData } from "../types";

export class AnySelectMenuBuilder extends BasicSelectMenuBuilder {
    data: Partial<SelectMenuData>;
    options: SelectMenuOptionsData[] | undefined;

    constructor(data: Partial<SelectMenuData>) {
        super(data);

        this.data = data;
        this.options = this.data.options;
    };

    /**
     * Sets channel types to this select menu channel types
     * @param {ChannelTypes[]} types - The channel types do set
     * @returns {this}
     */

    setChannelTypes(types: ChannelTypes[]): this {
        this.data.channel_types = types;

        return this;
    };

    /**
     * Add channel types to this select menu channel types
     * @param {ChannelTypes[]} types - The channel types to add
     * @returns {this}
     */

    addChannelTypes(types: ChannelTypes[]): this {
        this.data.channel_types ? this.data.channel_types.push(...types) : this.data.channel_types = types;

        return this;
    };

    /**
     * Sets the options to this select menu options
     * @param {SelectMenuOptionsData[]} options - The options to set
     * @returns {this}
     */

    setOptions(...options: SelectMenuOptionsData[]): this {
        this.options = options;
        this.data.options = options;

        return this;
    };

    /**
     * Add options to this select menu options
     * @param {SelectMenuOptionsData[]} options - The options to add
     * @returns {this}
     */

    addOptions(...options: SelectMenuOptionsData[]): this {
        this.data.options ? this.data.options.push(...options) : this.data.options = options;
        this.options = this.data.options;

        return this;
    };
};