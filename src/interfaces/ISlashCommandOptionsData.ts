import { ILocalizations } from './ILocalizations';
import { SlashCommandTypes } from '../props/SlashCommandTypes';
import { SlashCommandChoicesData } from './ISlashCommandChoicesData';

export interface SlashCommandOptionsData {
    name: string | undefined;
    description?: string;
    type: SlashCommandTypes;
    options?: SlashCommandOptionsData[];
    autocomplete?: boolean;
    name_localizations?: ILocalizations;
    description_localizations?: ILocalizations;
    required?: boolean;
    choices?: SlashCommandChoicesData[];
    min_value?: number;
    max_value?: number;
    min_length?: number;
    max_length?: number;
};