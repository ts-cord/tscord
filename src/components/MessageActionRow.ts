import { MessageButton } from "./MessageButton";
import { IButton } from "../interfaces/IButton";
import { IActionRow } from "../interfaces/IActionRow";
import { ITextInput } from "../interfaces/ITextInputComponents";
import { ISelectMenu } from "../interfaces/ISelectMenu";
import { MessageStringSelectMenu } from "./MessageStringSelectMenu";

export class MessageActionRow {
    data: IActionRow = { type: 1, components: [] };

    constructor(){};

    addComponents(...components: IButton[] | ITextInput[] | ISelectMenu[] | MessageButton[] | MessageStringSelectMenu[]): MessageActionRow {
        this.data.components.push(...components.map(a => 'JSON' in a ? a.JSON() : a));

        return this;
    };
    setComponents(...components: IButton[] | ITextInput[] | ISelectMenu[] | MessageButton[] | MessageStringSelectMenu[]): MessageActionRow {
        this.data.components = components.map(a => 'JSON' in a ? a.JSON() : a);

        return this;
    };
    JSON(): IActionRow {
        return this.data;
    };
    setComponentsFrom(JSONData: IActionRow): MessageActionRow {
        this.data = JSONData;

        return this;
    };

    static MaxActionRowPerMessage: number = 5;
    static MaxButtonsPerActionRow: number = 5;
    static MaxCustomIdLength: number = 100;
};