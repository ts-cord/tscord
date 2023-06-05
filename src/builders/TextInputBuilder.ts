import { BasicBuilder } from "./BasicBuilder";
import type { TextInputData } from "../types";
import { ComponentTypes, TextInputStyles } from "../types";

export class TextInputBuilder extends BasicBuilder<TextInputData> {
    /**
     * Set the text input data
     * @param {TextInputData | undefined} data - The text input data
     * @see https://discord.com/developers/docs/interactions/message-components#text-inputs
     */

    constructor(data?: TextInputData) {
        super(data);

        this.data.type = ComponentTypes.TextInput;
    }

    /**
     * Set the text input label
     * @param {string} label - The label content 
     * @returns {this}
     */

    setLabel(label: string): this {
        this.data.label = label;

        return this;
    }

    /**
     * Set the text input custom ID
     * @param {string} customId - The custom ID
     * @returns {this}
     */

    setCustomId(customId: string): this {
        this.data.custom_id = customId;

        return this;
    }

    /**
     * Set the text input style
     * @param {TextInputStyles} style - The style
     * @returns {this}
     */

    setStyle(style: TextInputStyles): this {
        this.data.style = style;

        return this;
    }

    /**
     * Set the text input min length
     * @param {number} length - The length
     * @returns {this}
     */

    setMinLength(length: number): this {
        this.data.min_length = length;

        return this;
    }

    /**
     * Set the text input max length
     * @param {number} length - The length
     * @returns {this}
     */

    setMaxLength(length: number): this {
        this.data.max_length = length;

        return this;
    }

    /**
     * Set the text input required
     * @param {boolean} required - If required
     * @returns {this}
     */

    setRequired(required: boolean): this {
        this.data.required = required;

        return this;
    }

    /**
     * Set the text input value
     * @param {string} value - The value
     * @returns {this}
     */

    setValue(value: string): this {
        this.data.value = value;

        return this;
    }

    /**
     * Set the text input placeholder
     * @param {string} placeholder - The placeholder
     * @returns {this}
     */

    setPlaceholder(placeholder: string): this {
        this.data.placeholder = placeholder;

        return this;
    }
}