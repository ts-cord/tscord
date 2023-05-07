import { User } from "./User";
import { Basic } from "./Basic";
import { Guild } from "./Guild";
import { Webhook } from "./Webhook";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import { ChannelMessage, Webhook as WebhookRoute } from "../utils/Routes";
import type { AttachmentData, ChannelMentionData, EmbedData, EmojiResolvable, MessageActivity, MessageComponentData, MessageFlags, MessageInteractionData, MessageReferenceOptions, MessageTypes, RawApplication, RawDiscordAPIChannelData, RawDiscordAPIMessageData, RawDiscordAPIUserData, RawDiscordAPIWebhookData, RawSticker, ReactionData, RoleSubscriptionData, StartThreadOptions, StickerItemData } from "../types";

export class Message extends Basic {
    public id: Snowflake;
    public channel_id: Snowflake;
    public author: User;
    public content: string | undefined;
    public timestamp: number;
    public edited_timestmap: number | undefined;
    public tts: boolean;
    public mention_everyone: boolean;
    public mentions: RawDiscordAPIUserData[];
    public mention_roles: Snowflake[];
    public mention_channels: ChannelMentionData[] | undefined;
    public attachments: AttachmentData[];
    public embeds: EmbedData[];
    public reactions: ReactionData[] | undefined;
    public nonce: string | number | undefined;
    public pinned: boolean;
    public webhook_id: string | undefined;
    public type: MessageTypes;
    public activity: MessageActivity | undefined;
    public application: Partial<RawApplication> | undefined;
    public application_id: string | undefined;
    public message_reference: MessageReferenceOptions | undefined;
    public flags?: MessageFlags | undefined;
    public referenced_message: RawDiscordAPIMessageData | undefined;
    public interaction: MessageInteractionData | undefined;
    public thread: RawDiscordAPIChannelData | undefined;
    public components: MessageComponentData[] | undefined;
    public sticker_items: StickerItemData[] | undefined;
    public stickers: RawSticker[] | undefined;
    public position: number | undefined;
    public role_subscription_data: RoleSubscriptionData | undefined;
    public guild: Guild | undefined;
    public creation_date: Date;
    public creation_timestamp: number;
    private readonly auth: { headers: { Authorization: `Bot ${string}` } };
    private readonly url: string;

    constructor(data: RawDiscordAPIMessageData, client: Client, guild?: Guild) {
        super(client);

        this.id = data.id;
        this.channel_id = data.channel_id;
        this.author = new User(data.author, this.client);
        this.content = data.content;
        this.timestamp = new Date(data.timestamp).getTime();
        this.edited_timestmap = data.edited_timestmap ? new Date(data.edited_timestmap).getTime() : data.edited_timestmap;
        this.tts = data.tts;
        this.mention_everyone = data.mention_everyone;
        this.mentions = data.mentions;
        this.mention_channels = data.mention_channels;
        this.mention_roles = data.mention_roles;
        this.attachments = data.attachments;
        this.embeds = data.embeds;
        this.reactions = data.reactions;
        this.nonce = data.nonce;
        this.pinned = data.pinned;
        this.webhook_id = data.webhook_id;
        this.type = data.type;
        this.activity = data.activity;
        this.application = data.application;
        this.application_id = data.application_id;
        this.message_reference = data.message_reference;
        this.flags = data.flags;
        this.referenced_message = data.referenced_message;
        this.interaction = data.interaction;
        this.thread = data.thread;
        this.components = data.components;
        this.sticker_items = data.sticker_items;
        this.stickers = data.stickers;
        this.position = data.position;
        this.role_subscription_data = data.role_subscription_data;
        this.guild = guild;
        this.auth = { headers: { Authorization: `Bot ${this.client.token}` } };
        this.url = ChannelMessage(this.channel_id, this.id);
        this.creation_date = new Date((+this.id / 4194304) + 1420070400000);
        this.creation_timestamp = this.creation_date.getTime();

        Object.assign(this, data);
    };

    /**
     * Publishes the message in an announcement channel to all channels following it
     * @returns {Promise<Message>}
     */

    async crosspost(): Promise<Message> {
        const { data }: { data: RawDiscordAPIMessageData } = await rest.post(this.url + '/crosspost', null, this.auth);

        return new Message(data, this.client, this.guild);
    };

    /**
     * Delete the Message
     * @param {string} reason - Reason for delete the message
     * @returns {Promise<Message>}
     */

    async delete(reason?: string): Promise<Message> {
        await rest.delete(this.url, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return this;
    };

    /**
     * Fetch the Message
     * @returns {Promise<Message>}
     */

    async fetch(): Promise<Message> {
        const { data }: { data: RawDiscordAPIMessageData } = await rest.get(this.url, this.auth);

        return new Message(data, this.client, this.guild);
    };

    /**
     * Fetches the Message this crosspost/reply/pin-add references
     * @returns {Promise<Message>}
     */

    async fetchMessageReference(): Promise<Message> {
        const { data }: { data: RawDiscordAPIMessageData } = await rest.get(ChannelMessage(this.channel_id, this.referenced_message!.id), this.auth);

        return new Message(data, this.client, this.guild);
    };

    /**
     * Fetches the Webhook used to create the Message
     * @returns {Promise<Webhook>}
     */

    async fetchWebhook(): Promise<Webhook> {
        const { data }: { data: RawDiscordAPIWebhookData } = await rest.get(WebhookRoute(this.webhook_id!), this.auth);

        return new Webhook(data, this.client);
    };

    /**
     * Check if the Message belongs to a Guild
     * @returns {boolean}
     */

    inGuild(): boolean {
        return this.guild ? true : false;
    };

    /**
     * Check if the Message belongs to an uncached Guild
     * @returns {boolean}
     */

    inUncachedGuild(): boolean {
        return this.client.guilds.cache.has(this.guild?.id as string);
    };

    /**
     * Pin the Message
     * @param {string} reason - Reason for pin the Message
     * @returns {Promise<Message>}
     */

    async pin(reason?: string): Promise<Message> {
        await rest.put(this.url, null, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return this;
    };

    /**
     * Unpin the Message
     * @param {string} reason - Reason for unpin the Message
     * @returns {Promise<Message>}
     */

    async unpin(reason?: string): Promise<Message> {
        await rest.put(this.url, null, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return this;
    };

    /**
     * React to the Message
     * @param {EmojiResolvable} emoji - The emoji to react
     * @returns {Promise<Message>}
     */

    async react(emoji: EmojiResolvable): Promise<Message> {
        await rest.put(this.url + `/reactions/${encodeURIComponent(emoji)}/@me`, this.auth);

        return this;
    };

    /**
     * Start a thread from the Message
     * @param {StartThreadOptions} options - The thread options
     * @returns {Promise<RawDiscordAPIChannelData>}
     */

    async setThreadFrom(options: StartThreadOptions): Promise<RawDiscordAPIChannelData> {
        const { data }: { data: RawDiscordAPIChannelData } = await rest.post(this.url + `/threads`, options, this.auth);

        return data;
    };

    /**
     * Stringify the message's object into message's ID
     * @returns {string}
     */

    toString(): string {
        return this.id;
    };
};