import { Snowflake } from "../types/Snowflake";

export interface ChannelMention {
    id: Snowflake
    guild_id: Snowflake;
    type: number;
    name: string;
};