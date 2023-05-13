import { User } from "./User";
import { Basic } from "./Basic";
import { Guild } from "./Guild";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import type { GuildTemplateData, RawGuild } from "../types";
import { GuildTemplate as GuildTemplateRoute, GuildTemplateCode } from "../utils/Routes";

export class GuildTemplate extends Basic {
    public code: string;
    public name: string;
    public description: string | undefined;
    public usageCount: number;
    public creatorId: Snowflake;
    public creator: User;
    public createdAt: number;
    public updatedAt: number;
    public sourceGuildId: Snowflake;
    public serializedSourceGuild: Partial<Omit<RawGuild, "creation_timestamp" | "creation_date">>;
    public isDirty: boolean | undefined;
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };

    constructor(data: GuildTemplateData, client: Client) {
        super(client);

        this.code = data.code;
        this.name = data.name;
        this.description = data.description;
        this.usageCount = data.usage_count;
        this.creatorId = data.creator_id;
        this.creator = new User(data.creator, this.client);
        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;
        this.sourceGuildId = data.source_guild_id;
        this.serializedSourceGuild = data.serialized_source_guild;
        this.isDirty = data.is_dirty;
        this.axiosConfig = { headers: { Authorization: `Bot ${this.client.token}` } };

        Object.assign(this, data);
    };

    /**
     * Delete the template
     * @returns {Promise<GuildTemplate>}
     */

    async delete(): Promise<GuildTemplate> {
        const { data }: { data: GuildTemplateData } = await rest.delete(GuildTemplateRoute(this.sourceGuildId, this.code), this.axiosConfig);

        return new GuildTemplate(data, this.client);
    };

    /**
     * Edit template's options
     * @param {string} name - New template's name
     * @param {string} description - New template's description
     * @returns {Promise<GuildTemplate>}
     */

    async edit(name: string, description?: string): Promise<GuildTemplate> {
        const { data }: { data: GuildTemplateData } = await rest.patch(GuildTemplateRoute(this.sourceGuildId, this.code), { name: name, description: description }, this.axiosConfig);

        return new GuildTemplate(data, this.client);
    };

    /**
     * Sync the template
     * @returns {Promise<GuildTemplate>}
     */

    async sync(): Promise<GuildTemplate> {
        const { data }: { data: GuildTemplateData } = await rest.put(GuildTemplateRoute(this.sourceGuildId, this.code), null, this.axiosConfig);

        return new GuildTemplate(data, this.client);
    };

    /**
     * Create a new Guild from template's
     * @param {string} name - Guild name
     * @param {string1} icon - Guild icon URL
     * @returns {Promise<Guild>}
     */

    async createGuild(name: string, icon?: string): Promise<Guild> {
        const { data }: { data: RawGuild } = await rest.post(GuildTemplateCode(this.code), { name: name, icon: icon }, this.axiosConfig);

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