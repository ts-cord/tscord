import { ITextInput } from "../interfaces/ITextInput";
import { ITextInputComponents } from "../interfaces/ITextInputComponents";

export class TextInputConstructor {
    data: ITextInput = { title: undefined, custom_id: undefined, components: [{ type: 1, components: [] }] };

    setTitle(title: string) {
        this.data.title = title;

        return this;
    };
    setCustomId(customId: string) {
        this.data.custom_id = customId;

        return this;
    };
    setComponents(...components: ITextInputComponents[]) {
        this.data.components![0].components = components;

        return this;
    };
    addComponents(...components: ITextInputComponents[]) {
        this.data.components![0].components.push(...components);

        return this;
    };
    JSON() {
        return this.data;
    };
    setDataFrom(JSONData: ITextInput) {
        this.data = JSONData;

        return this;
    };
};