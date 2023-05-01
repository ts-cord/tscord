import { SlashCommandTypes } from '../props/SlashCommandTypes';
import { ILocalizations } from './ILocalizations';
import { SlashCommandOptionsData } from './ISlashCommandOptionsData';

export interface SlashCommandData {
    name: string | undefined;
    description: string | undefined;
    type?: SlashCommandTypes;
    options?: SlashCommandOptionsData[];
    dm_permission?: boolean;
    default_member_permissions?: number;
    name_localizations?: ILocalizations;
    description_localizations?: ILocalizations;
    nsfw?: boolean;
};