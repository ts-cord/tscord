import { SlashCommandTypes } from "../props/SlashCommandTypes";

export interface InteractionOptions {
    name: string;
    type: SlashCommandTypes;
    value?: string | number | boolean;
    options?: InteractionOptions[];
    focused?: boolean;
};