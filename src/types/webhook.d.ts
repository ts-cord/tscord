import { Snowflake } from "./Snowflake";
import type { AttachmentData, BasicFetchOptions, BasicMessageOptions, GuildChannelResolvable, MessageFlags, RawDiscordAPIChannelData, RawDiscordAPIUserData, RawGuild } from "./index";

export interface RawDiscordAPIWebhookData {
    id: Snowflake;
    type: WebhookTypes;
    guild_id?: Snowflake;
    channel_id?: Snowflake;
    user?: RawDiscordAPIUserData;
    name?: string;
    avatar?: string;
    token?: string;
    application_id?: Snowflake;
    source_guild?: Partial<RawGuild>;
    source_channel?: Partial<RawDiscordAPIChannelData>;
    url?: string;
};

export interface WebhookEditOptions {
    name: string;
    avatar?: string;
    channel_id: Snowflake;
    reason?: string;
};

export interface RawWebhook extends RawDiscordAPIWebhookData {
    creation_timestamp: number;
    creation_date: Date;
};

export enum WebhookTypes {
    Incoming = 1,
    ChannelFollower,
    Application
};

export interface WebhookMessageEditOptions extends BasicMessageOptions {
    attachments?: Array<Partial<AttachmentData>>;
    thread_id?: Snowflake;
};

export interface WebhookMessageSlackCreateOptions {
    thread_id: Snowflake;
    wait?: boolean;
};

export interface WebhookMessageCreateOptions extends BasicMessageOptions {
    username?: string;
    avatar_url?: string;
    tts?: boolean;
    attachments?: Array<Partial<AttachmentData>>;
    flags?: MessageFlags;
    thread_name?: string;
    thread_id?: Snowflake;
    wait?: boolean;
};

export interface WebhookCreateOptions {
    name: string;
    avatar?: string;
    reason?: string;
    channel: GuildChannelResolvable;
};