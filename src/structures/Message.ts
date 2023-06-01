import { User } from "./User";
import { Basic } from "./Basic";
import { Guild } from "./Guild";
import { Webhook } from "./Webhook";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import { ChannelMessage, Webhook as WebhookRoute, ChannelMessageCrosspost, ChannelThreads } from "../utils/Routes";
import type { AttachmentData, ChannelMentionData, EmbedData, EmojiResolvable, MessageActivity, MessageComponentData, MessageFlags, MessageInteractionData, MessageReferenceOptions, MessageTypes, RawApplication, RawDiscordAPIChannelData, RawDiscordAPIMessageData, RawDiscordAPIUserData, RawDiscordAPIWebhookData, RawSticker, ReactionData, RoleSubscriptionData, StartThreadOptions, StickerItemData } from "../types";

export class Message extends Basic {
	public id: Snowflake;
	public channelId: Snowflake;
	public author: User;
	public content: string | undefined;
	public timestamp: number;
	public editedTimestmap: number | undefined;
	public tts: boolean;
	public mentionEveryone: boolean;
	public mentions: RawDiscordAPIUserData[];
	public mentionRoles: Snowflake[];
	public mentionChannels: ChannelMentionData[] | undefined;
	public attachments: AttachmentData[];
	public embeds: EmbedData[];
	public reactions: ReactionData[] | undefined;
	public nonce: string | number | undefined;
	public pinned: boolean;
	public webhookId: string | undefined;
	public type: MessageTypes;
	public activity: MessageActivity | undefined;
	public application: Partial<RawApplication> | undefined;
	public applicationId: string | undefined;
	public messageReference: MessageReferenceOptions | undefined;
	public flags: MessageFlags | undefined;
	public referencedMessage: RawDiscordAPIMessageData | undefined;
	public interaction: MessageInteractionData | undefined;
	public thread: RawDiscordAPIChannelData | undefined;
	public components: MessageComponentData[] | undefined;
	public stickerItems: StickerItemData[] | undefined;
	public stickers: RawSticker[] | undefined;
	public position: number | undefined;
	public roleSubscriptionData: RoleSubscriptionData | undefined;
	public guild: Guild | undefined;
	public creationDate: Date;
	public creationTimestamp: number;
	private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };
	private readonly url: string;

	constructor(data: RawDiscordAPIMessageData, client: Client, guild?: Guild) {
		super(client);

		this.id = data.id;
		this.author = new User(data.author, this.client);
		this.channelId = data.channel_id;
		this.content = data.content;
		this.timestamp = new Date(data.timestamp).getTime();
		this.editedTimestmap = data.edited_timestmap ? new Date(data.edited_timestmap).getTime() : data.edited_timestmap;
		this.tts = data.tts;
		this.mentionEveryone = data.mention_everyone;
		this.mentions = data.mentions;
		this.mentionChannels = data.mention_channels;
		this.mentionRoles = data.mention_roles;
		this.attachments = data.attachments;
		this.embeds = data.embeds;
		this.reactions = data.reactions;
		this.nonce = data.nonce;
		this.pinned = data.pinned;
		this.webhookId = data.webhook_id;
		this.type = data.type;
		this.activity = data.activity;
		this.application = data.application;
		this.applicationId = data.application_id;
		this.messageReference = data.message_reference;
		this.flags = data.flags;
		this.referencedMessage = data.referenced_message;
		this.interaction = data.interaction;
		this.thread = data.thread;
		this.components = data.components;
		this.stickerItems = data.sticker_items;
		this.stickers = data.stickers;
		this.position = data.position;
		this.roleSubscriptionData = data.role_subscription_data;
		this.guild = guild;
		this.axiosConfig = { headers: { Authorization: `Bot ${this.client.token}` } };
		this.url = ChannelMessage(this.channelId, this.id);
		this.creationDate = new Date((+this.id / 4194304) + 1420070400000);
		this.creationTimestamp = this.creationDate.getTime();

		Object.assign(this, data);
	}

	/**
     * Publishes the message in an announcement channel to all channels following it
     * @returns {Promise<Message>}
     */

	async crosspost(): Promise<Message> {
		const { data }: { data: RawDiscordAPIMessageData } = await rest.post(ChannelMessageCrosspost(this.channelId, this.id), null, this.axiosConfig);

		return new Message(data, this.client, this.guild);
	}

	/**
     * Delete the Message
     * @param {string} reason - Reason for delete the message
     * @returns {Promise<Message>}
     */

	async delete(reason?: string): Promise<Message> {
		await rest.delete(this.url, { headers: { Authorization: `Bot ${this.client.token}`, "X-Audit-Log-Reason": reason } });

		return this;
	}

	/**
     * Fetch the Message
     * @returns {Promise<Message>}
     */

	async fetch(): Promise<Message> {
		const { data }: { data: RawDiscordAPIMessageData } = await rest.get(this.url, this.axiosConfig);

		return new Message(data, this.client, this.guild);
	}

	/**
     * Fetches the Message this crosspost/reply/pin-add references
     * @returns {Promise<Message>}
     */

	async fetchMessageReference(): Promise<Message> {
		const { data }: { data: RawDiscordAPIMessageData } = await rest.get(ChannelMessage(this.channelId, this.referencedMessage!.id), this.axiosConfig);

		return new Message(data, this.client, this.guild);
	}

	/**
     * Fetches the Webhook used to create the Message
     * @returns {Promise<Webhook>}
     */

	async fetchWebhook(): Promise<Webhook> {
		const { data }: { data: RawDiscordAPIWebhookData } = await rest.get(WebhookRoute(this.webhookId!), this.axiosConfig);

		return new Webhook(data, this.client);
	}

	/**
     * Check if the Message belongs to a Guild
     * @returns {boolean}
     */

	inGuild(): boolean {
		return this.guild ? true : false;
	}

	/**
     * Check if the Message belongs to an uncached Guild
     * @returns {boolean}
     */

	inUncachedGuild(): boolean {
		return !this.client.guilds.cache.has(this.guild?.id as string);
	}

	/**
     * Pin the Message
     * @param {string} reason - Reason for pin the Message
     * @returns {Promise<Message>}
     */

	async pin(reason?: string): Promise<Message> {
		await rest.put(this.url, null, { headers: { Authorization: `Bot ${this.client.token}`, "X-Audit-Log-Reason": reason } });

		return this;
	}

	/**
     * Unpin the Message
     * @param {string} reason - Reason for unpin the Message
     * @returns {Promise<Message>}
     */

	async unpin(reason?: string): Promise<Message> {
		await rest.put(this.url, null, { headers: { Authorization: `Bot ${this.client.token}`, "X-Audit-Log-Reason": reason } });

		return this;
	}

	/**
     * React to the Message
     * @param {EmojiResolvable} emoji - The emoji to react
     * @returns {Promise<Message>}
     */

	async react(emoji: EmojiResolvable): Promise<Message> {
		await rest.put(this.url + `/reactions/${encodeURIComponent(emoji)}/@me`, this.axiosConfig);

		return this;
	}

	/**
     * Start a thread from the Message
     * @param {StartThreadOptions} options - The thread options
     * @returns {Promise<RawDiscordAPIChannelData>}
     */

	async setThreadFrom(options: StartThreadOptions): Promise<RawDiscordAPIChannelData> {
		const { data }: { data: RawDiscordAPIChannelData } = await rest.post(ChannelThreads(this.channelId), options, this.axiosConfig);

		return data;
	}

	/**
     * Stringify the message's object into message's ID
     * @returns {string}
     */

	toString(): string {
		return this.id;
	}
}