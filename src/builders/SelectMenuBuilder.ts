import { BasicBuilder } from "./BasicBuilder";
import { ChannelTypes } from "../props/ChannelTypes";
import { SelectMenuTypes } from "../props/SelectMenuTypes";
import { SelectMenuData } from "../interfaces/ISelectMenuData";
import { SelectMenuOptionsData } from "../interfaces/ISelectMenuOptionsData";

export class SelectMenuBuilder extends BasicBuilder<SelectMenuData> {
    constructor(data?: SelectMenuData) {
        super(data);
    };

    /**
     * Set the select menu custom id
     * @param {string} customId - The custom id. Must be unique
     * @returns {this}
     */

    setCustomId(customId: string): this {
        this.data.custom_id = customId;

        return this;
    };

    /**
     * Set the select menu type
     * @param {SelectMenuTypes} type - The type
     * @returns {this}
     */

    setType(type: SelectMenuTypes): this {
        this.data.type = type;

        return this;
    };

    /**
     * Set the select menu channel types
     * @param {Array<ChannelTypes>} channelTypes - The channel types
     * @returns {this}
     * @see https://discord.com/developers/docs/interactions/message-components#select-menus
     */

    setChannelTypes(channelTypes: Array<ChannelTypes>): this {
        this.data.channel_types = channelTypes;

        return this;
    };

    /**
     * Set the select menu placeholder
     * @param {string} placeholder - The content of the placeholder
     * @returns {this}
     */

    setPlaceholder(placeholder: string): this {
        this.data.placeholder = placeholder;

        return this;
    };

    /**
     * Set the min values for the select menu
     * @param {number} minValues - The min value
     * @returns {this}
     */

    setMinValues(minValues: number): this {
        this.data.min_values = minValues;

        return this;
    };

    /**
     * Set the max values for the select menu
     * @param {number} maxValues - The max value
     * @returns {this}
     */

    setMaxValues(maxValues: number): this {
        this.data.max_values = maxValues;

        return this;
    };

    /**
     * Set the select menu disabled
     * @param {boolean} disabled - Pass true value if you want disabled
     * @returns {this}
     */

    setDisabled(disabled: boolean): this {
        this.data.disabled = disabled;

        return this;
    };

    /**
     * Add options to the select menu options
     * @param {Array<SelectMenuOptionsData>} options - The options to be added 
     * @returns {this}
     */

    addOptions(...options: Array<SelectMenuOptionsData>): this {
        this.data.options ? this.data.options.push(...options) : this.data.options = options;

        return this;
    };

    /**
     * Set the options to the select menu
     * @param {Array<SelectMenuOptionsData>} options - The options to be set
     * @returns {this}
     */

    setOptions(...options: Array<SelectMenuOptionsData>): this {
        this.data.options = options;

        return this;
    };

    /**
     * The max custom id length for a select menu
     */

    static readonly MaxCustomIdLength: number = 100;
};