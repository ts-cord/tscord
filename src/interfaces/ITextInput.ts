import { ITextInputComponents } from "./ITextInputComponents";

export interface ITextInput {
    title: string | undefined,
    custom_id: string | undefined,
    components?: [{ type: number, components: ITextInputComponents[] }]
};