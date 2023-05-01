import { TextInputStyles } from "../props/TextInputStyles";

export interface TextInputComponentsData {
    type: number | undefined;
    custom_id: string | undefined;
    style: TextInputStyles | undefined;
    label: string | undefined;
    min_length?: number;
    max_length?: number;
    required?: boolean;
    value?: string;
    placeholder?: string;
};