import { EmojiBase } from "./IEmojiBase";
import { ButtonStyles } from "../props/ButtonStyles";
import { ComponentTypes } from "../props/ComponentTypes";

export interface ButtonData {
    type: ComponentTypes.Button | undefined;
    style: ButtonStyles | undefined;
    label?: string;
    emoji?: EmojiBase;
    custom_id?: string;
    url?: string;
    disabled?: boolean;
};