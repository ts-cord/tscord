import { TextInputComponentsData } from "./ITextInputComponentsData";

export interface TextInputData {
    title: string | undefined;
    custom_id: string | undefined;
    components?: [{ type: number, components: TextInputComponentsData[] }];
};