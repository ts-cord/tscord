import { Guild } from "./Guild";
import { Message } from "./Message";
import { rest } from "../constants/Api";
import { ChannelTypes } from "../types";
import { Client } from "../entities/Client";
import { BasicChannel } from "./BasicChannel";
import { Snowflake } from "../types/Snowflake";
import { Channel, ChannelMessages } from "../utils/Routes";
import type { CreateMessageOptions, GuildChannelData, GuildChannelEditOptions, OverwriteData, RawDiscordAPIMessageData } from "../types";

export class GuildChannel extends BasicChannel  {
	public id: Snowflake;
	public type: ChannelTypes;
	public flags: number;
	public creationTimestamp: number;
	public creationDate: Date;
	public guildId: Snowflake;
	public position: number;
	public permissionOverwrites: OverwriteData[];
	public name: string;
	public parentId: string | undefined;
	public guild: Guild;
	private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };

	constructor(data: GuildChannelData, client: Client, guild: Guild) {
		super(data, client);

		this.id = super.id;
		this.type = super.type;
		this.flags = data.flags;
		this.creationTimestamp = super.creationTimestamp;
		this.creationDate = super.creationDate;
		this.guild = guild;
		this.guildId = data.guild_id;
		this.position = data.position;
		this.permissionOverwrites = data.permission_overwrites;
		this.name = data.name;
		this.parentId = data.parent_id;
		this.axiosConfig = { headers: { Authorization: `Bot ${this.client.token}` } };

		Object.assign(this, data);
	}

	/**
     * Create a new message in the channel's
     * @param {CreateMessageOption} options - The message options
     * @returns {Promise<Message>}
     */

	async send(options: CreateMessageOptions): Promise<Message> {
		const { data }: { data: RawDiscordAPIMessageData } = await rest.post(ChannelMessages(this.id), options, this.axiosConfig);

		return new Message(data, this.client, this.guild);
	}

	/**
     * Edit the channel's
     * @param {GuildChannelEditOptions} options - The options to edit
     * @param {string} reason - Reason for edit the channel
     * @returns {Promise<GuildChannel>}
     */

	async edit(options: GuildChannelEditOptions, reason?: string): Promise<GuildChannel> {
		const { data }: { data: GuildChannelData } = await rest.patch(Channel(this.id), options, { headers: { Authorization: `Bot ${this.client.token}`, "X-Audit-Log-Reason": reason } });

		return new GuildChannel(data, this.client, this.guild);
	}

	/**
     * Edit channel's name
     * @param {string} name - New name
     * @param {string} reason - Reason for edit the name
     * @returns {Promise<GuildChannel>}
     */

	async setName(name: string, reason?: string): Promise<GuildChannel> {
		const data: GuildChannel = await this.edit({ name }, reason);

		return data;
	}

	/**
     * Edit channel's topic
     * @param {string} topic - New topic content
     * @param {string} reason - Reason for edit the topic
     * @returns {Promise<GuildChannel>}
     */

	async setTopic(topic: string, reason?: string): Promise<GuildChannel> {
		const data: GuildChannel = await this.edit({ topic }, reason);

		return data;
	}
}