import { ISlashChoices } from './ISlashChoices';
import { ILocalizations } from './ILocalizations';

export interface ISlashCommandOptions {
    name: string | undefined,
    description: string | undefined,
    type: number | undefined,
    options?: ISlashCommandOptions[],
    autocomplete?: boolean,
    name_localizations?: ILocalizations,
    description_localizations?: ILocalizations,
    required?: boolean,
    choices?: ISlashChoices[],
    min_value?: number,
    max_value?: number,
    min_length?: number,
    max_length?: number
};