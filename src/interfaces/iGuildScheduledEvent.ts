import { Snowflake } from "../types/Snowflake";
import { RawUserData } from "./IRawUserData"

export interface GuildScheduledEvent {
    id: Snowflake;
    guild_id: Snowflake;
    channel_id?: Snowflake;
    creator_id?: Snowflake;
    name: string;
    description?: string;
    scheduled_start_time: number;
    scheduled_end_time: number;
    privacy_level: number;
    status: number;
    entity_type: number;
    entity_id?: Snowflake;
    entity_metadata: {
        location?: string;
    };
    creator?: RawUserData;
    user_count?: number;
    image?: string;
};