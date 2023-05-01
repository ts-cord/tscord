import { RawUserData } from "./IRawUserData";
import { GuildMemberData } from "./IGuildMemberData";
import { Snowflake } from "../types/Snowflake";

export interface RawMessageInteractionData {
    id: Snowflake;
    type: number;
    name: string;
    user: RawUserData;
    member?: GuildMemberData
};