import { Snowflake } from "../types/Snowflake";

export interface RawWelcomeScreenChannelData {
    channel_id: Snowflake;
    description: string;
    emoji_id?: Snowflake;
    emoji_name?: string;
};