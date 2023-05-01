import { RawUserData } from "./IRawUserData";
import { Snowflake } from "../types/Snowflake";
import { ChannelTypes } from "../props/ChannelTypes";

export interface MessageMentionsData {
    mention_everyone: boolean;
    mentions: RawUserData[];
    mention_roles: Snowflake[];
    mention_channels: {
        id: Snowflake;
        guild_id: Snowflake;
        type: ChannelTypes;
        name: string;
    }[];
};