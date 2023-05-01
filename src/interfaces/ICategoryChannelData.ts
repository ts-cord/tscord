import { ChannelTypes } from "../props/ChannelTypes";
import { Snowflake } from "../types/Snowflake";

export interface CategoryChannelData {
    id: Snowflake;
    type: ChannelTypes.GuildCategory;
    guild_id: Snowflake;
    position: number;
    name: string;
    parent_id: Snowflake;
    flags: number;
};