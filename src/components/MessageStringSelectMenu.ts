import { ISelectMenu } from "../interfaces/ISelectMenu";
import { ISelectMenuOptions } from "../interfaces/ISelectMenuOptions";

export class MessageStringSelectMenu {
    data: ISelectMenu = { custom_id: undefined, type: 3 };

    constructor(){};

    setCustomId(customId: string): MessageStringSelectMenu {
        this.data.custom_id = customId;

        return this;
    };
    addOptions(...options: ISelectMenuOptions[]): MessageStringSelectMenu {
        this.data.options ? this.data.options.push(...options) : this.data.options = options;

        return this;
    };
    setOptions(...options: ISelectMenuOptions[]): MessageStringSelectMenu {
        this.data.options = options;

        return this;
    };
    setPlaceholder(placeholder: string): MessageStringSelectMenu {
        this.data.placeholder = placeholder;

        return this;
    };
    setMinValues(min: number): MessageStringSelectMenu {
        this.data.min_values = min;

        return this;
    };
    setMaxValues(max: number): MessageStringSelectMenu {
        this.data.max_values = max;

        return this;
    };
    setDisabled(disabled: boolean): MessageStringSelectMenu {
        this.data.disabled = disabled;

        return this;
    };
    JSON(): ISelectMenu {
        return this.data;
    };
    setDataFrom(d: ISelectMenu): MessageStringSelectMenu {
        this.data = d;

        return this;
    };
};