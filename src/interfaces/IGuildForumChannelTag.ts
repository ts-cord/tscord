import { Snowflake } from "../types/Snowflake";

export interface GuildForumChannelTag {
    id: Snowflake;
    name: string;
    moderated: boolean;
    emoji_id?: Snowflake;
    emoji_name?: string;
};