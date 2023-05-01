import { Snowflake } from "../types/Snowflake";
import { ILocalizations } from "./ILocalizations";
import { SlashCommandOptionsData } from "./ISlashCommandOptionsData";
import { ApplicationCommandTypes } from "../props/ApplicationCommandTypes";

export interface RawApplicationCommandData {
    id: Snowflake;
    type?: ApplicationCommandTypes;
    application_id: Snowflake;
    guild_id?: Snowflake;
    name: string;
    name_localizations?: ILocalizations;
    description: string;
    description_localizations?: ILocalizations;
    options?: Array<SlashCommandOptionsData>;
    default_member_permissions?: string;
    dm_permission?: boolean;
    default_permission?: boolean;
    nsfw?: boolean;
    version: Snowflake;
};