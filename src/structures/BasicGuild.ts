import { Basic } from "./Basic";
import { Guild } from "./Guild";
import { api } from "../constants/Api";
import { GuildFeatures } from "../types";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import type { BasicGuildData,RawGuild, ViewOptions } from "../types";
import { Guild as GuildRoute, GuildIcon as GuildIconRoute } from "../utils/Routes";

export class BasicGuild extends Basic implements BasicGuildData {
    public id: Snowflake;
    public name: string;
    public features: Array<GuildFeatures>;
    public icon: string;
    public partnered: boolean;
    public verified: boolean;
    public name_acronym: string;
    public creation_timestamp: number;
    public creation_date: Date;
    private readonly axios_config: { headers: { Authorization: `Bot ${string}` } };

    constructor(data: BasicGuildData, client: Client) {
        super(client);

        this.id = data.id;
        this.name = data.name;
        this.features = data.features;
        this.icon = data.icon;
        this.partnered = this.features.includes(GuildFeatures.Partnered);
        this.verified = this.features.includes(GuildFeatures.Verified);
        this.name_acronym = data.name_acronym;
        this.axios_config = { headers: { Authorization: `Bot ${this.client.token}` } };
        this.creation_date = new Date((+this.id / 4194304) + 1420070400000)
        this.creation_timestamp = this.creation_date.getTime();
    };

    /**
     * Fetch the guild's
     * @returns 
     */

    async fetch(): Promise<Guild> {
        const { data }: { data: RawGuild } = await api.get(GuildRoute(this.id), this.axios_config);

        return new Guild(data, this.client);
    };

    /**
     * View the guild's icon url
     * @param {ViewOptions} options - Image format options
     * @returns {boolean}
     */

    iconURL(options?: ViewOptions): string | undefined {
        return this.icon && GuildIconRoute(this.id, this.icon) + `.${options?.format ?? this.client.options!.default_image_format}?size=${options!.size}`;
    };

    /**
     * Stringify the guild object into a guild's name
     * @returns {string}
     */

    toString(): string {
        return this.name;
    };
};