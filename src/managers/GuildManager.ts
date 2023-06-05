import { Group } from "../utils/Group";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { Guild } from "../structures/Guild";
import { BasicManager } from "./BasicManager";
import { Snowflake } from "../types/Snowflake";
import { Guild as GuildRoute, Guilds } from "../utils/Routes";
import type { GuildCreateOptions, GuildResolvable, RawGuild } from "../types";

export class GuildManager extends BasicManager {
    override cache: Group<Snowflake, Guild> = new Group<Snowflake, Guild>();
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };

    constructor(client: Client) {
        super(client);

        this.axiosConfig = { headers: { Authorization: `Bot ${this.client.token}` } };
    }

    /**
     * Resolves a GuildResolvable into guild's ID
     * @param {GuildResolvable} guild - The guild
     * @returns {Snowflake}
     */

    resolveId(guild: GuildResolvable): Snowflake {
        return guild instanceof Guild ? guild.id : guild;
    }

    /**
     * Fetch a guild
     * @param {GuildResolvable} guild - The guild to fetch
     * @returns {Promise<Guild>}
     */

    async fetch(guild: GuildResolvable): Promise<Guild> {
        const { data }: { data: RawGuild } = await rest.get(GuildRoute(this.resolveId(guild)), this.axiosConfig);

        this.cache.set(data.id, new Guild(data, this.client));

        return this.cache.get(data.id)!;
    }

    /**
     * Create a new Guild
     * @param {GuildCreateOptions} options - The options for create
     * @returns {Promise<Guild>}
     */

    async create(options: GuildCreateOptions): Promise<Guild> {
        const { data }: { data: RawGuild } = await rest.post(Guilds, options, this.axiosConfig);

        this.cache.set(data.id, new Guild(data, this.client));

        return this.cache.get(data.id)!;
    }
}