import { User } from "./User";
import { Basic } from "./Basic";
import { Guild } from "./Guild";
import { rest } from "../constants/Api";
import { Group } from "../utils/Group";
import { CndURL } from "../utils/Routes";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import { GuildScheduledEventCover, GuildScheduledEvent as GuildScheduledEventRoute, GuildScheduledEventsUsers } from "../utils/Routes";
import { FetchGuildScheduledEventUsersOptions, GuildScheduledEventStatus, GuildScheduledEventUserData, RawGuildScheduledEventUserData } from "../types";
import type { GuildScheduledEventPrivacyLevel, GuildScheduledEventEntityTypes, ViewOptions, GuildScheduledEvent as GuildScheduledEventData, GuildScheduledEventEditOptions } from "../types";

export class GuildScheduledEvent extends Basic {
	public id: Snowflake;
	public guildId: Snowflake;
	public channelId: Snowflake | undefined;
	public creatorId: Snowflake | undefined;
	public name: string;
	public description: string | undefined;
	public scheduledStartTime: number;
	public scheduledEndTime: number | undefined;
	public privacyLevel: GuildScheduledEventPrivacyLevel;
	public status: GuildScheduledEventStatus;
	public entityType: GuildScheduledEventEntityTypes;
	public entityId: Snowflake | undefined;
	public creator: User | undefined;
	public userCount: number | undefined;
	public image: string | undefined;
	public guild: Guild | undefined;
	private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };

	constructor(data: GuildScheduledEventData, client: Client) {
		super(client);

		this.id = data.id;
		this.guildId = data.guild_id;
		this.creatorId = data.creator_id;
		this.name = data.name;
		this.description = data.description;
		this.scheduledStartTime = data.scheduled_start_time;
		this.scheduledEndTime = data.scheduled_end_time;
		this.privacyLevel = data.privacy_level;
		this.status = data.status;
		this.entityType = data.entity_type;
		this.creator = data.creator ? new User(data.creator, this.client) : data.creator;
		this.userCount = data.user_count;
		this.image = data.image;
		this.guild = this.client.guilds.cache.get(this.guildId);
		this.axiosConfig = { headers: { Authorization: `Bot ${this.client.token}` } };

		Object.assign(this, data);
	}

	/**
     * The URL of the scheduled event's cover image
     * @param {ViewOptions} options - Optional image options
     * @returns {string | undefined}
     */

	coverURL(options?: ViewOptions): string | undefined {
		return this.image && CndURL + GuildScheduledEventCover(this.id, this.image) + `.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
	}

	/**
     * Delete this guild scheduled event
     * @returns {Promise<GuildScheduledEvent>}
     */

	async delete(): Promise<GuildScheduledEvent> {
		await rest.delete(GuildScheduledEventRoute(this.guildId, this.id), this.axiosConfig);

		return this;
	}

	/**
     * Check if the guild scheduled event is active
     * @returns {boolean}
     */

	isActive(): boolean {
		return this.status === GuildScheduledEventStatus.Active;
	}

	/**
     * Check if the guild scheduled event is canceled
     * @returns {boolean}
     */

	isCanceled(): boolean {
		return this.status === GuildScheduledEventStatus.Canceled;
	}

	/**
     * Check if the guild scheduled event is completed
     * @returns {boolean}
     */

	isCompleted(): boolean {
		return this.status === GuildScheduledEventStatus.Completed;
	}

	/**
     * Check if the guild scheduled event is scheduled
     * @returns {boolean}
     */

	isScheduled(): boolean {
		return this.status === GuildScheduledEventStatus.Scheduled;
	}

	/**
     * Edits this guild scheduled event
     * @param {GuildScheduledEventEditOptions} options - Options to edit
     * @param {string} reason - Reason for edit this guild scheduled event
     * @returns {Promise<GuildScheduledEvent>}
     */

	async edit(options: GuildScheduledEventEditOptions, reason?: string): Promise<GuildScheduledEvent> {
		const { data }: { data: GuildScheduledEventData } = await rest.patch(GuildScheduledEventRoute(this.guildId, this.id), options, { headers: { Authorization: `Bot ${this.client.token}`, "X-Audit-Log-Reason": reason } });

		return new GuildScheduledEvent(data, this.client);
	}

	/**
     * Sets the new name of this guild scheduled event
     * @param {string} name - New name
     * @param {string} reason - Reason for edit this guild scheduled event name
     * @returns {Promise<GuildScheduledEvent>}
     */

	async setName(name: string, reason?: string): Promise<GuildScheduledEvent> {
		const data: GuildScheduledEvent = await this.edit({ name }, reason);

		return data;
	}

	/**
     * Sets the new description of this guild scheduled event
     * @param {string} description - New description
     * @param {string} reason - Reason for edit this guild scheduled event description
     * @returns {Promise<GuildScheduledEvent>}
     */

	async setDescription(description: string, reason?: string): Promise<GuildScheduledEvent> {
		const data: GuildScheduledEvent = await this.edit({ description }, reason);

		return data;
	}

	/**
     * Sets the new location of this guild scheduled event
     * @param {string} location - The location
     * @param {string} reason - Reason for edit this guild scheduled event location
     * @returns {Promise<GuildScheduledEvent>}
     */

	async setLocation(location: string, reason?: string): Promise<GuildScheduledEvent> {
		const data: GuildScheduledEvent = await this.edit({ entity_metadata: { location } }, reason);

		return data;
	}
	async fetchUsers(options?: FetchGuildScheduledEventUsersOptions): Promise<Group<Snowflake, GuildScheduledEventUserData>> {
		const queryStringParams: string = new URLSearchParams(options as {}).toString();
		const groupOfUsers: Group<Snowflake, GuildScheduledEventUserData> = new Group<Snowflake, GuildScheduledEventUserData>();
		const { data }: { data: RawGuildScheduledEventUserData[] } = await rest.get(GuildScheduledEventsUsers(this.guildId, this.id) + (queryStringParams ? "?" + queryStringParams : ""), this.axiosConfig);

		data.forEach((user: RawGuildScheduledEventUserData) => groupOfUsers.set(user.user.id, { guild_scheduled_event_id: user.guild_scheduled_event_id, user: new User(user.user, this.client), member: user.member as undefined }));
    
		return groupOfUsers;
	}
}