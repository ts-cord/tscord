import { User } from "./User";
import { Basic } from "./Basic";
import { Guild } from "./Guild";
import { api } from "../constants/Api";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import type { GuildTemplateData, RawGuild } from "../types";
import { GuildTemplate as GuildTemplateRoute, GuildTemplateCode } from "../utils/Routes";

export class GuildTemplate extends Basic {
    public code: string;
    public name: string;
    public description: string | undefined;
    public usage_count: number;
    public creator_id: string;
    public creator: User;
    public created_at: number;
    public updated_at: number;
    public source_guild_id: Snowflake;
    public serialized_source_guild: Partial<Omit<RawGuild, "creation_timestamp" | "creation_date">>;
    public is_dirty: boolean | undefined;
    private readonly axios_config: { headers: { Authorization: `Bot ${string}` } };

    constructor(data: GuildTemplateData, client: Client) {
        super(client);

        this.code = data.code;
        this.name = data.name;
        this.description = data.description;
        this.usage_count = data.usage_count;
        this.creator_id = data.creator_id;
        this.creator = new User(data.creator, this.client);
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.source_guild_id = data.source_guild_id;
        this.serialized_source_guild = data.serialized_source_guild;
        this.is_dirty = data.is_dirty;
        this.axios_config = { headers: { Authorization: `Bot ${this.client.token}` } };

        Object.assign(this, data);
    };

    /**
     * Delete the template
     * @returns {Promise<GuildTemplate>}
     */

    async delete(): Promise<GuildTemplate> {
        const { data }: { data: GuildTemplateData } = await api.delete(GuildTemplateRoute(this.source_guild_id, this.code), this.axios_config);

        return new GuildTemplate(data, this.client);
    };

    /**
     * Edit template's options
     * @param {string} name - New template's name
     * @param {string} description - New template's description
     * @returns {Promise<GuildTemplate>}
     */

    async edit(name: string, description?: string): Promise<GuildTemplate> {
        const { data }: { data: GuildTemplateData } = await api.patch(GuildTemplateRoute(this.source_guild_id, this.code), { name: name, description: description }, this.axios_config);

        return new GuildTemplate(data, this.client);
    };

    /**
     * Sync the template
     * @returns {Promise<GuildTemplate>}
     */

    async sync(): Promise<GuildTemplate> {
        const { data }: { data: GuildTemplateData } = await api.put(GuildTemplateRoute(this.source_guild_id, this.code), null, this.axios_config);

        return new GuildTemplate(data, this.client);
    };

    /**
     * Create a new Guild from template's
     * @param {string} name - Guild name
     * @param {string1} icon - Guild icon URL
     * @returns {Promise<Guild>}
     */

    async createGuild(name: string, icon?: string): Promise<Guild> {
        const { data }: { data: RawGuild } = await api.post(GuildTemplateCode(this.code), { name: name, icon: icon }, this.axios_config);

        this.client.guilds.cache.set(data.id, new Guild(data, this.client));

        return this.client.guilds.cache.get(data.id)!;
    };

    /**
     * Stringify template's object into template's code
     * @returns {string}
     */

    toString(): string {
        return this.code;
    };
};