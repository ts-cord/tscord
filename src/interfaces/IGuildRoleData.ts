import { GuildRoleTags } from "./IGuildRoleTags";
import { Snowflake } from "../types/Snowflake";

export interface GuildRoleData {
    id: Snowflake;
    name: string;
    color: number;
    hoist: boolean;
    icon?: string;
    unicode_emoji?: string;
    position: number;
    permissions: string;
    managed: boolean;
    mentionable: boolean;
    tags?: GuildRoleTags;
};