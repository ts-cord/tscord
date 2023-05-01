import { Role } from "../structures/Role";
import { Snowflake } from "./Snowflake";

export interface RawGuildRole {
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

export type RoleResolvable = Role;

export interface EditRoleOptions extends Omit<RawGuildRole, 'id' | 'position' | 'tags'> {
    reason?: string;
};

export interface CreateRoleOptions extends EditRoleOptions {};

export interface GuildRoleTags {
    bot_id?: Snowflake;
    integration_id?: Snowflake;
    premium_subscriber?: null;
    subscription_listing_id?: Snowflake;
    available_for_purchase?: null;
    guild_connections?: null;
};

export interface RawRole extends RawGuildRole {
    creation_timestamp: number;
    creation_date: Date;
};