import { ILocalizations } from "../../interfaces/ILocalizations";

export interface SlashCommandGlobalMethods {
    setName: (name: string) => void,
    setDescription: (description: string) => void,
    setNameLocalizations: (localizations: ILocalizations) => void,
    setDescriptionLocalizations: (localizations: ILocalizations) => void,
    setRequired: (required: boolean) => void,
};