import { ButtonStyles } from "../props/ButtonStyles";
import { ComponentTypes } from "../props/ComponentTypes";

export interface RawMessageButton {
    type?: ComponentTypes.Button;
    style: ButtonStyles | undefined;
    label: string | undefined;
    emoji?: string;
    custom_id: string | undefined;
    url?: string;
    disabled?: boolean;
};