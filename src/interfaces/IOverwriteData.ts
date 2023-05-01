import { Snowflake } from "../types/Snowflake";

export interface OverwriteData {
    id: Snowflake;
    type: number;
    allow: string;
    deny: string;
};