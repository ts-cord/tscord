import { Snowflake } from "../types/Snowflake";

export interface GuildRoleTags {
    bot_id?: Snowflake;
    integration_id?: Snowflake;
    premium_subscriber?: boolean;
    subscription_listing_id?: Snowflake;
    available_for_purchase?: boolean;
    guild_connections?: boolean;
};