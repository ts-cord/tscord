import { ILocalizations } from './ILocalizations';
import { ISlashCommandOptions } from './ISlashCommandOptions';

export interface ISlashCommand {
    name: string | undefined,
    description: string | undefined,
    type: number | undefined,
    options?: ISlashCommandOptions[],
    dm_permission?: boolean,
    default_member_permissions?: number,
    name_localizations?: ILocalizations,
    description_localizations?: ILocalizations,
    nsfw?: boolean
};