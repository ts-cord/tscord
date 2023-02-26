import { SlashCommandGlobalMethods } from "./SlashCommandGlobalMethods"
import { ISlashChoices } from "../../interfaces/ISlashChoices"

export interface SlashCommandStringOptionMethods extends SlashCommandGlobalMethods {
    setAutoComplete: (autocomplete: boolean) => this,
    setMinLength: (length: number) => this,
    setMaxLength: (length: number) => this,
    setRequired: (required: boolean) => this,
    setName: (name: string) => this,
    addChoices: (...values: ISlashChoices[]) => this
};