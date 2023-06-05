import { BasicBuilder } from "./BasicBuilder";
import { SelectMenuData, SelectMenuTypes } from "../types";

export class BasicSelectMenuBuilder extends BasicBuilder<Partial<SelectMenuData>> {
    constructor(data: Partial<SelectMenuData>) {
        super({ ...data, type: SelectMenuTypes.StringSelect });
    }

    /**
     * Sets the custom ID for this select menu
     * @param {string} customId - The custom ID
     * @returns {this}
     */

    setCustomId(customId: string): this {
        this.data.custom_id = customId;

        return this;
    }

    /**
     * Sets if this select menu must be disabled
     * @param {boolean} disabled - Pass true if want disabled, otherwise false
     * @returns {this}
     */

    setDisabled(disabled: boolean): this {
        this.data.disabled = disabled;

        return this;
    }

    /**
     * Sets the placeholder for this select menu
     * @param {string} placeholder - The placeholder
     * @returns {this}
     */

    setPlaceholder(placeholder: string): this {
        this.data.placeholder = placeholder;

        return this;
    }

    /**
     * Sets the min values for this select menu
     * @param {number} value - The minimum value
     * @returns {this}
     */

    setMinValues(value: number): this {
        this.data.min_values = value;

        return this;
    }

    /**
     * Sets the max values for this select menu
     * @param {number} value - The maximum value
     * @returns {this}
     */

    setMaxValues(value: number): this {
        this.data.max_values = value;

        return this;
    }
}