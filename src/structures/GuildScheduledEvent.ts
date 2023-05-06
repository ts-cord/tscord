import { User } from "./User";
import { Basic } from "./Basic";
import { Guild } from "./Guild";
import { api } from "../constants/Api";
import { Group } from "../utils/Group";
import { CndURL } from "../utils/Routes";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import { GuildScheduledEventCover, GuildScheduledEvent as GuildScheduledEventRoute, GuildScheduledEventsUsers } from "../utils/Routes";
import { FetchGuildScheduledEventUsersOptions, GuildScheduledEventStatus, GuildScheduledEventUserData, RawGuildScheduledEventUserData } from "../types";
import type { GuildScheduledEventPrivacyLevel, GuildScheduledEventEntityTypes, ViewOptions, GuildScheduledEvent as GuildScheduledEventData, GuildScheduledEventEditOptions } from "../types";

export class GuildScheduledEvent extends Basic {
    public id: Snowflake;
    public guild_id: Snowflake;
    public channel_id: Snowflake | undefined;
    public creator_id: Snowflake | undefined;
    public name: string;
    public description: string | undefined;
    public scheduled_start_time: number;
    public scheduled_end_time: number | undefined;
    public privacy_level: GuildScheduledEventPrivacyLevel;
    public status: GuildScheduledEventStatus;
    public entity_type: GuildScheduledEventEntityTypes;
    public entity_id: Snowflake | undefined;
    public creator: User | undefined;
    public user_count: number | undefined;
    public image: string | undefined;
    public guild: Guild | undefined;
    private readonly axios_config: { headers: { Authorization: `Bot ${string}` } };

    constructor(data: GuildScheduledEventData, client: Client) {
        super(client);

        this.id = data.id;
        this.guild_id = data.guild_id;
        this.creator_id = data.creator_id;
        this.name = data.name;
        this.description = data.description;
        this.scheduled_start_time = data.scheduled_start_time;
        this.scheduled_end_time = data.scheduled_end_time;
        this.privacy_level = data.privacy_level;
        this.status = data.status;
        this.entity_type = data.entity_type;
        this.creator = data.creator ? new User(data.creator, this.client) : data.creator;
        this.user_count = data.user_count;
        this.image = data.image;
        this.guild = this.client.guilds.cache.get(this.guild_id);
        this.axios_config = { headers: { Authorization: `Bot ${this.client.token}` } };

        Object.assign(this, data);
    };

    /**
     * The URL of the scheduled event's cover image
     * @param {ViewOptions} options - Optional image options
     * @returns {string | undefined}
     */

    coverURL(options?: ViewOptions): string | undefined {
        return this.image && CndURL + GuildScheduledEventCover(this.id, this.image) + `.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
    };

    /**
     * Delete this guild scheduled event
     * @returns {Promise<GuildScheduledEvent>}
     */

    async delete(): Promise<GuildScheduledEvent> {
        await api.delete(GuildScheduledEventRoute(this.guild_id, this.id), this.axios_config);

        return this;
    };

    /**
     * Check if the guild scheduled event is active
     * @returns {boolean}
     */

    isActive(): boolean {
        return this.status === GuildScheduledEventStatus.Active;
    };

    /**
     * Check if the guild scheduled event is canceled
     * @returns {boolean}
     */

    isCanceled(): boolean {
        return this.status === GuildScheduledEventStatus.Canceled;
    };

    /**
     * Check if the guild scheduled event is completed
     * @returns {boolean}
     */

    isCompleted(): boolean {
        return this.status === GuildScheduledEventStatus.Completed;
    };

    /**
     * Check if the guild scheduled event is scheduled
     * @returns {boolean}
     */

    isScheduled(): boolean {
        return this.status === GuildScheduledEventStatus.Scheduled;
    };

    /**
     * Edits this guild scheduled event
     * @param {GuildScheduledEventEditOptions} options - Options to edit
     * @param {string} reason - Reason for edit this guild scheduled event
     * @returns {Promise<GuildScheduledEvent>}
     */

    async edit(options: GuildScheduledEventEditOptions, reason?: string): Promise<GuildScheduledEvent> {
        const { data }: { data: GuildScheduledEventData } = await api.patch(GuildScheduledEventRoute(this.guild_id, this.id), options, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return new GuildScheduledEvent(data, this.client);
    };

    /**
     * Sets the new name of this guild scheduled event
     * @param {string} name - New name
     * @param {string} reason - Reason for edit this guild scheduled event name
     * @returns {Promise<GuildScheduledEvent>}
     */

    async setName(name: string, reason?: string): Promise<GuildScheduledEvent> {
        const data: GuildScheduledEvent = await this.edit({ name }, reason);

        return data;
    };

    /**
     * Sets the new description of this guild scheduled event
     * @param {string} description - New description
     * @param {string} reason - Reason for edit this guild scheduled event description
     * @returns {Promise<GuildScheduledEvent>}
     */

    async setDescription(description: string, reason?: string): Promise<GuildScheduledEvent> {
        const data: GuildScheduledEvent = await this.edit({ description }, reason);

        return data;
    };

    /**
     * Sets the new location of this guild scheduled event
     * @param {string} location - The location
     * @param {string} reason - Reason for edit this guild scheduled event location
     * @returns {Promise<GuildScheduledEvent>}
     */

    async setLocation(location: string, reason?: string): Promise<GuildScheduledEvent> {
        const data: GuildScheduledEvent = await this.edit({ entity_metadata: { location } }, reason);

        return data;
    };
    async fetchUsers(options?: FetchGuildScheduledEventUsersOptions): Promise<Group<Snowflake, GuildScheduledEventUserData>> {
        const queryStringParams: string = new URLSearchParams(options as {}).toString();
        const groupOfUsers: Group<Snowflake, GuildScheduledEventUserData> = new Group<Snowflake, GuildScheduledEventUserData>();
        const { data }: { data: RawGuildScheduledEventUserData[] } = await api.get(GuildScheduledEventsUsers(this.guild_id, this.id) + (queryStringParams ? '?' + queryStringParams : ''), this.axios_config);

        data.forEach((user: RawGuildScheduledEventUserData) => groupOfUsers.set(user.user.id, { guild_scheduled_event_id: user.guild_scheduled_event_id, user: new User(user.user, this.client), member: user.member as undefined }));
    
        return groupOfUsers;
    };
};