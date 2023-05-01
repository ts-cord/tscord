import { ILocalizations } from "./ILocalizations";

export interface SlashCommandChoicesData {
    name: string | undefined;
    value: string | undefined;
    name_localizations?: ILocalizations;
};