import { ComponentTypes } from "../types";
import { BasicBuilder } from "./BasicBuilder";
import { ButtonBuilder } from "./ButtonBuilder";
import type { MessageComponentData } from "../types";
import { TextInputBuilder } from "./TextInputBuilder";
import { StringSelectMenuBuilder } from "./StringSelectMenuBuilder";

export class ActionRowBuilder<T extends ButtonBuilder | TextInputBuilder | StringSelectMenuBuilder> extends BasicBuilder<MessageComponentData> {
    components: MessageComponentData['components'] = this.data.components;

    /**
     * @param { { type: ComponentTypes.ActionRow, components: T['data'][] } } data - The data to be set
     * @constructor
     * @see https://discord.com/developers/docs/interactions/message-components#action-rows
     */

    constructor(data?: { type: ComponentTypes.ActionRow; components: T['data'][]; }) {
        super(data);
    };

    /**
     * Set the data components
     * @param {T[]} components - The components to be set
     * @returns {this}
     */

    setComponents(...components: T[]): this {
        this.data.components = components.map(({ data }: T) => data);

        return this;
    };

    /**
     * Add components to the actual components
     * @param {T[]} components - The components do be added
     * @returns {this}
     */

    addComponents(...components: T[]): this {
        const mappedComponents: T['data'][] = components.map(({ data }: T) => data);

        this.data.components ? this.data.components.push(...mappedComponents) : this.data.components = mappedComponents;

        return this;
    };

    /** Maximum number of action rows a message can have */

    static MaxActionRowsPerMessage: number = 5;

    /** Maximum custom ID length */

    static MaxCustomIdLength: number = 100;
};