import { ButtonData } from "./IButtonData";
import { TextInputData } from "./ITextInputData";
import { SelectMenuData } from "./ISelectMenuData";

export interface ActionRowData {
    type: number,
    components: (ButtonData | TextInputData | SelectMenuData)[]
};