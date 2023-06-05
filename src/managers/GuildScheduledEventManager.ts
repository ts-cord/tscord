import { Group } from "../utils/Group";
import { rest } from "../constants/Api";
import { User } from "../structures/User";
import { Client } from "../entities/Client";
import { Guild } from "../structures/Guild";
import { BasicManager } from "./BasicManager";
import { Snowflake } from "../types/Snowflake";
import { GuildScheduledEvent } from "../structures/GuildScheduledEvent";
import { GuildScheduledEventsUsers, GuildScheduledEvent as GuildScheduledEventRoute, GuildScheduledEvents } from "../utils/Routes";
import type { FetchGuildScheduledEventUsersOptions, GuildScheduledEventEditOptions, GuildScheduledEventResolvable, GuildScheduledEventUserData, RawGuildScheduledEventUserData, GuildScheduledEvent as GuildScheduledEventData, GuildScheduledEventCreateOptions } from "../types";

export class GuildScheduledEventManager extends BasicManager {
    public guild: Guild;
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };
    override cache: Group<Snowflake, GuildScheduledEvent> = new Group<Snowflake, GuildScheduledEvent>();

    constructor(guild: Guild, client: Client) {
        super(client);

        this.guild = guild;
        this.axiosConfig = { headers: { Authorization: `Bot ${this.client.token}` } };
    }

    /**
     * Resolves a GuildScheduledEventResolvable into guild scheduled event's ID
     * @param {GuildScheduledEventResolvable} guildScheduledEvent - The guild scheduled event
     * @returns {Snowflake}
     */

    resolveId(guildScheduledEvent: GuildScheduledEventResolvable): Snowflake {
        return typeof guildScheduledEvent === "string" ? guildScheduledEvent : guildScheduledEvent.id;
    }

    /**
     * Fetches users of a guild scheduled event
     * @param {GuildScheduledEventResolvable} guildScheduledEvent - The guild scheduled event
     * @param {FetchGuildScheduledEventUsersOptions} options - Optional options to fetch
     * @returns {Promise<Group<Snowflake, User>>}
     */

    async fetchUsers(guildScheduledEvent: GuildScheduledEventResolvable, options?: FetchGuildScheduledEventUsersOptions): Promise<Group<Snowflake, GuildScheduledEventUserData>> {
        const queryStringParams: string = new URLSearchParams(options as {}).toString();
        const groupOfUsers: Group<Snowflake, GuildScheduledEventUserData> = new Group<Snowflake, GuildScheduledEventUserData>();
        const { data }: { data: RawGuildScheduledEventUserData[] } = await rest.get(GuildScheduledEventsUsers(this.guild.id, this.resolveId(guildScheduledEvent)) + (queryStringParams ? "?" + queryStringParams : ""), this.axiosConfig);

        data.forEach((user: RawGuildScheduledEventUserData) => groupOfUsers.set(user.user.id, { guild_scheduled_event_id: user.guild_scheduled_event_id, user: new User(user.user, this.client), member: user.member as undefined }));

        return groupOfUsers;
    }

    /**
     * Edits a guild scheduled event
     * @param {GuildScheduledEventResolvable} guildScheduledEvent - The guild scheduled event
     * @param {GuildScheduledEventEditOptions} options - The options to edit
     * @param {string} reason - Reason for edit this guild scheduled event
     * @returns {Promise<GuildScheduledEvent>}
     */

    async edit(guildScheduledEvent: GuildScheduledEventResolvable, options: GuildScheduledEventEditOptions, reason?: string): Promise<GuildScheduledEvent> {
        const { data }: { data: GuildScheduledEventData } = await rest.patch(GuildScheduledEventRoute(this.guild.id, this.resolveId(guildScheduledEvent)), options, { headers: { Authorization: `Bot ${this.client.token}`, "X-Audit-Log-Reason": reason } });

        this.cache.set(data.id, new GuildScheduledEvent(data, this.client));

        return this.cache.get(data.id)!;
    }

    /**
     * Deletes a guild scheduled event
     * @param {GuildScheduledEventResolvable} guildScheduledEvent - The guild scheduled event
     * @returns {Promise<void>}
     */

    async delete(guildScheduledEvent: GuildScheduledEventResolvable): Promise<void> {
        await rest.delete(GuildScheduledEventRoute(this.guild.id, this.resolveId(guildScheduledEvent)));

        this.cache.delete(this.resolveId(guildScheduledEvent));

        return;
    }

    /**
     * Creates a new guild scheduled event
     * @param {GuildScheduledEventCreateOptions} options - The options to create
     * @param {string} reason - Reason for create this guild scheduled event
     * @returns {Promise<GuildScheduledEvent>}
     */

    async create(options: GuildScheduledEventCreateOptions, reason?: string): Promise<GuildScheduledEvent> {
        const { data }: { data: GuildScheduledEventData } = await rest.post(GuildScheduledEvents(this.guild.id), options, { headers: { Authorization: `Bot ${this.client.token}`, "X-Audit-Log-Reason": reason } });

        this.cache.set(data.id, new GuildScheduledEvent(data, this.client));

        return this.cache.get(data.id)!;
    }
}