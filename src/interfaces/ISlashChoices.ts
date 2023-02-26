import { ILocalizations } from "./ILocalizations";

export interface ISlashChoices {
    name: string | undefined,
    value: string | undefined,
    name_localizations?: ILocalizations
};