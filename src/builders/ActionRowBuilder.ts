import { BasicBuilder } from "./BasicBuilder";
import { ButtonBuilder } from "./ButtonBuilder";
import { TextInputBuilder } from "./TextInputBuilder";
import { SelectMenuBuilder } from "./SelectMenuBuilder";
import { ComponentTypes } from "../props/ComponentTypes";
import { ActionRowData } from "../interfaces/IActionRowData";

export class ActionRowBuilder<T extends ButtonBuilder | TextInputBuilder | SelectMenuBuilder> extends BasicBuilder<ActionRowData> {
    components: ActionRowData['components'] = this.data.components;

    /**
     * @param { { type: ComponentTypes.ActionRow, components: T['data'][] } } data - The data to be set
     * @constructor
     */
    
    constructor(data?: { type: ComponentTypes.ActionRow, components: Array<T['data']> }) {
        super(data);
    };

    /**
     * Set the data components
     * @param {Array<T>} components - The components to be set
     * @returns {this}
     */

    setComponents(...components: Array<T>): this {
        this.data.components = components.map((component: T) => component.data);

        return this;
    };

    /**
     * Add components to the actual components
     * @param {Array<T>} components - The components do be added
     * @returns {this}
     */

    addComponents(...components: Array<T>): this {
        const mappedComponents: Array<T['data']> = components.map((component: T) => component.data);

        this.data.components ? this.data.components.push(...mappedComponents) : this.data.components = mappedComponents;

        return this;
    };

    static MaxActionRowsPerMessage: number = 5;
};