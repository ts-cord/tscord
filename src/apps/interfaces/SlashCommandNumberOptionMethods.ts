import { SlashCommandGlobalMethods } from "./SlashCommandGlobalMethods";

export interface SlashCommandNumberOptionMethods extends SlashCommandGlobalMethods {
    setMinValue: (value: number) => SlashCommandNumberOptionMethods,
    setMaxValue: (value: number) => SlashCommandNumberOptionMethods
};