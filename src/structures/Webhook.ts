import { User } from "./User";
import { Basic } from "./Basic";
import { api } from "../constants/Api";
import { Client } from "../entities/Client";
import { WebhookTypes } from "../types/index";
import { Snowflake } from "../types/Snowflake";
import type { MessageResolvable, RawDiscordAPIChannelData, RawGuild, RawDiscordAPIWebhookData, RawWebhook, WebhookEditOptions, WebhookMessageEditOptions, WebhookMessageSlackCreateOptions } from "../types/index";

export class Webhook extends Basic implements RawWebhook {
    public id: Snowflake;
    public type: WebhookTypes;
    public guild_id: Snowflake | undefined;
    public channel_id: Snowflake | undefined;
    public user: User | undefined | undefined;
    public name: string | undefined;
    public avatar: string | undefined;
    public token: string | undefined;
    public application_id: Snowflake | undefined;
    public source_guild: Partial<RawGuild> | undefined;
    public source_channel: Partial<RawDiscordAPIChannelData> | undefined;
    public url: string | undefined;
    public creation_timestamp: number;
    public creation_date: Date;
    private readonly axios_config: { headers: { Authorization: `Bot ${string}` } };
    private readonly requestUrl: string;

    constructor(data: RawDiscordAPIWebhookData, client: Client) {
        super(client);

        this.id = data.id;
        this.type = data.type;
        this.guild_id = data.guild_id;
        this.channel_id = data.channel_id;
        this.user = data.user ? new User(data.user, this.client) : data.user;
        this.name = data.name;
        this.avatar = data.avatar;
        this.token = data.token;
        this.application_id = data.application_id;
        this.source_guild = data.source_guild;
        this.source_channel = data.source_channel;
        this.url = data.url;
        this.creation_date = new Date((+this.id / 4194304) + 1420070400000);
        this.creation_timestamp = this.creation_date.getTime();
        this.axios_config = { headers: { Authorization: `Bot ${this.client.token}` } };
        this.requestUrl = `/webhooks/${this.id}`;

        Object.assign(this, data);
    };

    /**
     * Delete the webhook
     * @param {string} reason - The reason to deleting the webhook
     * @returns {Promise<void>}
     */

    async delete(reason?: string): Promise<void> {
        const { data }: { data: void } = await api.delete(this.requestUrl, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return data;
    };

    /**
     * Delete a message sent by the webhook
     * @param {MessageResolvable} message - The message to be deleted
     * @param {Snowflake} threadId - The id of the thread the webhook is on
     * @returns {Promise<void>}
     */

    async deleteMessage(message: MessageResolvable, threadId?: Snowflake): Promise<void> {
        const { data }: { data: void } = await api.delete(`/webhooks/${this.id}/${this.token}/messages/${message}${threadId ? '?threadId=' + threadId : ''}`, this.axios_config);

        return data;
    };

    /**
     * Edit the webhook options
     * @param {WebhookEditOptions} options - New options to the webhook
     * @returns {Promise<Webhook>}
     */

    async edit(options: WebhookEditOptions): Promise<Webhook> {
        const { data }: { data: RawDiscordAPIWebhookData } = await api.patch(this.requestUrl, { name: options.name, channel_id: options.channel_id, avatar: options.avatar } as Omit<WebhookEditOptions, 'reason'>, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': options.reason } });

        return new Webhook(data, this.client);
    };

    /**
     * Edit a message sent by the webhook
     * @param {MessageResolvable} message - The message to be edited
     * @param {WebhookEditOptions} options - The options to the new message 
     * @returns {Promise<object>}
     */

    async editMessage(message: MessageResolvable, options: WebhookMessageEditOptions): Promise<object> {
        const { data }: { data: object /* replace to message object */ } = await api.patch(`/webhooks/${this.id}/${this.id}/messages/${message}${options.thread_id ? '?threadId=' + options.thread_id : ''}`, (delete options.thread_id, options), this.axios_config);

        return data;
    };

    /**
     * Fetch a message sent by the webhook
     * @param {MessageResolvable} message - The message to be fetched
     * @param {Snowflake} threadId - The id of the thread the webhook is on
     * @returns {Promise<object>}
     */

    async fetchMessage(message: Snowflake, threadId?: Snowflake): Promise<object> {
        const { data }: { data: object /* replace to message object */ } = await api.get(`/webhooks/${this.id}/${this.token}/messages/${message}${threadId ? '?threadId=' + threadId : ''}`, this.axios_config);

        return data;
    };

    /**
     * Check if the webhook is an incoming webhook
     * @returns {boolean}
     */

    isIncoming(): boolean {
        return this.type === WebhookTypes.Incoming;
    };

    /**
     * Check if the webhook is a channel follower webhook
     * @returns {boolean}
     */

    isChannelFollower(): boolean {
        return this.type === WebhookTypes.ChannelFollower;
    };

    /**
     * Check if the webhook was created by an application
     * @returns {boolean}
     */

    isCreatedByApplication(): boolean {
        return this.type === WebhookTypes.Application;
    };

    /**
     * Check if the webhook was created by an user
     * @returns {boolean}
     */

    isCreatedByUser(): boolean {
        return this.user ? true : false;
    };

    /**
     * Send a slack message with the webhook
     * @param {object} body - The body of the message
     * @param options - Message options
     * @returns 
     */

    async sendSlackMessage(body: object, options: WebhookMessageSlackCreateOptions): Promise<boolean> {
        const queryStringParams: string = new URLSearchParams(options as unknown as Record<string, string>).toString();
        const { data }: { data: boolean } = await api.post(`/webhooks/${this.id}/${this.token}/slack?${queryStringParams}`, body, this.axios_config);

        return data;
    };
};