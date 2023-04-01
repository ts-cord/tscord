import { IButton } from "./IButton";
import { ITextInput } from "./ITextInput";
import { ISelectMenu } from "./ISelectMenu";

export interface IActionRow {
    type: number,
    components: (IButton | ITextInput | ISelectMenu)[]
};