import { Snowflake } from "../types/Snowflake";

export interface EmojiBase {
    name: string;
    id?: Snowflake;
    animated?: boolean;
};