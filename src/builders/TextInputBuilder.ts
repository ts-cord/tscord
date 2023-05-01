import { BasicBuilder } from "./BasicBuilder";
import { TextInputData } from "../interfaces/ITextInputData";
import { TextInputComponentsData } from "../interfaces/ITextInputComponentsData";

export class TextInputBuilder extends BasicBuilder<TextInputData> {
    constructor(data?: TextInputData) {
        super(data);
    };

    /**
     * Set the select menu title
     * @param {string} title - The title content 
     * @returns {this}
     */

    setTitle(title: string): this {
        this.data.title = title;

        return this;
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
     * Set the text input components
     * @param {Array<TextInputComponentsData>} components - The components to be set
     * @returns {this}
     */

    setComponents(...components: Array<TextInputComponentsData>): this {
        this.data.components![0].components = components;

        return this;
    };

    /**
     * Add components to the text input components
     * @param {Array<TextInputComponentsData>} components - The components to be added
     * @returns {this}
     */

    addComponents(...components: Array<TextInputComponentsData>): this {
        this.data.components![0].components.push(...components);

        return this;
    };

    /**
     * The max custom id length for a text input
     */

    static readonly MaxCustomIdLength: number = 100;
};