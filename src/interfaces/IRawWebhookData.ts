import { RawUserData } from "./IRawUserData";
import { RawGuildData } from "./IRawGuildData";
import { GuildChannelData } from "./IGuildChannelData";
import { Snowflake } from "../types/Snowflake";
import { WebhookTypes } from "../props/WebhookTypes";

export interface RawWebhookData {
    id: Snowflake;
    type: WebhookTypes;
    guild_id?: Snowflake;
    channel_id?: Snowflake;
    user?: RawUserData;
    name?: string;
    avatar?: string;
    token?: string;
    application_id?: Snowflake;
    source_guild?: RawGuildData;
    source_channel?: GuildChannelData;
    url?: string;
};