import { Snowflake } from "../types/Snowflake";

export interface MessageActivity {
    type: number;
    party_id?: Snowflake;
};