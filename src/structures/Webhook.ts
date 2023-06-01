import { User } from "./User";
import { Basic } from "./Basic";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { RawDiscordAPIMessageData, WebhookTypes } from "../types/index";
import { Snowflake } from "../types/Snowflake";
import { WebhookPlatform } from "../utils/Routes";
import type { MessageResolvable, RawDiscordAPIChannelData, RawGuild, RawDiscordAPIWebhookData, WebhookEditOptions, WebhookMessageEditOptions, WebhookMessageSlackCreateOptions } from "../types/index";
import { Message } from "./Message";

export class Webhook extends Basic {
	public id: Snowflake;
	public type: WebhookTypes;
	public guildId: Snowflake | undefined;
	public channelId: Snowflake | undefined;
	public user: User | undefined | undefined;
	public name: string | undefined;
	public avatar: string | undefined;
	public token: string | undefined;
	public applicationId: Snowflake | undefined;
	public sourceGuild: Partial<RawGuild> | undefined;
	public sourceChannel: Partial<RawDiscordAPIChannelData> | undefined;
	public url: string | undefined;
	public creationTimestamp: number;
	public creationDate: Date;
	private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };
	private readonly requestURL: string;

	constructor(data: RawDiscordAPIWebhookData, client: Client) {
		super(client);

		this.id = data.id;
		this.type = data.type;
		this.guildId = data.guild_id;
		this.channelId = data.channel_id;
		this.user = data.user ? new User(data.user, this.client) : data.user;
		this.name = data.name;
		this.avatar = data.avatar;
		this.token = data.token;
		this.applicationId = data.application_id;
		this.sourceGuild = data.source_guild;
		this.sourceChannel = data.source_channel;
		this.url = data.url;
		this.creationDate = new Date((+this.id / 4194304) + 1420070400000);
		this.creationTimestamp = this.creationDate.getTime();
		this.axiosConfig = { headers: { Authorization: `Bot ${this.client.token}` } };
		this.requestURL = `/webhooks/${this.id}`;

		Object.assign(this, data);
	}

	/**
     * Delete the webhook
     * @param {string} reason - The reason to deleting the webhook
     * @returns {Promise<void>}
     */

	async delete(reason?: string): Promise<void> {
		const { data }: { data: void } = await rest.delete(this.requestURL, { headers: { Authorization: `Bot ${this.client.token}`, "X-Audit-Log-Reason": reason } });

		return data;
	}

	/**
     * Delete a message sent by the webhook
     * @param {MessageResolvable} message - The message to be deleted
     * @param {Snowflake} threadId - The id of the thread the webhook is on
     * @returns {Promise<void>}
     */

	async deleteMessage(message: MessageResolvable, threadId?: Snowflake): Promise<void> {
		const { data }: { data: void } = await rest.delete(`/webhooks/${this.id}/${this.token}/messages/${message}${threadId ? "?threadId=" + threadId : ""}`, this.axiosConfig);

		return data;
	}

	/**
     * Edit the webhook options
     * @param {WebhookEditOptions} options - New options to the webhook
     * @returns {Promise<Webhook>}
     */

	async edit(options: WebhookEditOptions): Promise<Webhook> {
		const { data }: { data: RawDiscordAPIWebhookData; } = await rest.patch(this.requestURL, { name: options.name, channel_id: options.channel_id, avatar: options.avatar } as Omit<WebhookEditOptions, "reason">, { headers: { Authorization: `Bot ${this.client.token}`, "X-Audit-Log-Reason": options.reason } });

		return new Webhook(data, this.client);
	}

	/**
     * Edit a message sent by the webhook
     * @param {MessageResolvable} message - The message to be edited
     * @param {WebhookEditOptions} options - The options to the new message 
     * @returns {Promise<Message>}
     */

	async editMessage(message: MessageResolvable, options: WebhookMessageEditOptions): Promise<Message> {
		const { data }: { data: RawDiscordAPIMessageData; } = await rest.patch(`/webhooks/${this.id}/${this.id}/messages/${message}${options.thread_id ? "?threadId=" + options.thread_id : ""}`, (delete options.thread_id, options), this.axiosConfig);

		return new Message(data, this.client);
	}

	/**
     * Fetch a message sent by the webhook
     * @param {MessageResolvable} message - The message to be fetched
     * @param {Snowflake} threadId - The id of the thread the webhook is on
     * @returns {Promise<Message>}
     */

	async fetchMessage(message: Snowflake, threadId?: Snowflake): Promise<Message> {
		const { data }: { data: RawDiscordAPIMessageData; } = await rest.get(`/webhooks/${this.id}/${this.token}/messages/${message}${threadId ? "?threadId=" + threadId : ""}`, this.axiosConfig);

		return new Message(data, this.client);
	}

	/**
     * Check if the webhook is an incoming webhook
     * @returns {boolean}
     */

	isIncoming(): boolean {
		return this.type === WebhookTypes.Incoming;
	}

	/**
     * Check if the webhook is a channel follower webhook
     * @returns {boolean}
     */

	isChannelFollower(): boolean {
		return this.type === WebhookTypes.ChannelFollower;
	}

	/**
     * Check if the webhook was created by an application
     * @returns {boolean}
     */

	isCreatedByApplication(): boolean {
		return this.type === WebhookTypes.Application;
	}

	/**
     * Check if the webhook was created by an user
     * @returns {boolean}
     */

	isCreatedByUser(): boolean {
		return this.user ? true : false;
	}

	/**
     * Send a slack message with the webhook
     * @param {object} body - The body of the message
     * @param options - Message options
     * @returns 
     */

	async sendSlackMessage(body: object, options: WebhookMessageSlackCreateOptions): Promise<boolean> {
		const queryStringParams: string = "?" + new URLSearchParams(options as {}).toString();
		const { data }: { data: boolean; } = await rest.post(WebhookPlatform(this.id, this.token!, "slack") + queryStringParams, body, this.axiosConfig);

		return data;
	}
}