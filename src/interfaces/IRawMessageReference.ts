import { Snowflake } from "../types/Snowflake";

export interface RawMessageReference {
    message_id?: Snowflake;
    channel_id?: Snowflake;
    guild_id?: Snowflake;
    fail_if_not_exists?: boolean;
};