import { Basic } from "./Basic";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import { GuildPreview as GuildPreviewRoute, GuildDiscoverySplash, GuildIcon, GuildSplash } from "../utils/Routes";
import type { GuildFeatures, RawDiscordAPIGuildPreviewData, RawGuildEmoji, RawSticker, ViewOptions } from "../types";

export class GuildPreview extends Basic {
    public id: Snowflake;
    public name: string;
    public icon: string | undefined;
    public splash: string | undefined;
    public discoverySplash: string | undefined;
    public emojis: Array<RawGuildEmoji>;
    public features: Array<GuildFeatures>;
    public approximateMemberCount: number;
    public approximatePresenceCount: number;
    public description: string | undefined;
    public stickers: Array<RawSticker>;
    public creationTimestamp: number;
    public creationDate: Date;
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };

    constructor(data: RawDiscordAPIGuildPreviewData, client: Client) {
        super(client);

        this.id = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.splash = data.splash;
        this.discoverySplash = data.discovery_splash;
        this.emojis = data.emojis;
        this.features = data.features;
        this.approximateMemberCount = data.approximate_member_count;
        this.approximatePresenceCount = data.approximate_presence_count;
        this.description = data.description;
        this.stickers = data.stickers;
        this.creationDate = new Date((+this.id / 4194304) + 1420070400000);
        this.creationTimestamp = this.creationDate.getTime();
        this.axiosConfig = { headers: { Authorization: `Bot ${this.client.token}` } };

        Object.assign(this, data);
    }

    /**
     * Stringify the GuildPreview objecto into guild's name
     * @returns {string}
     */

    toString(): string {
        return this.name;
    }

    /**
     * Fetch guild's preview
     * @returns {Promise<GuildPreview>}
     */

    async fetch(): Promise<GuildPreview> {
        const { data }: { data: RawDiscordAPIGuildPreviewData } = await rest.get(GuildPreviewRoute(this.id), this.axiosConfig);

        return new GuildPreview(data, this.client);
    }

    /**
     * Returns guild's discovery splash URL
     * @param {ViewOptions} options - Optional image options
     * @returns {string | undefined}
     */

    discoverySplashURL(options?: ViewOptions): string | undefined {
        return this.discoverySplash && GuildDiscoverySplash(this.id, this.discoverySplash) + `.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
    }

    /**
     * Returns guild's icon URL
     * @param {ViewOptions} options - Optional image options
     * @returns {Promise<string | undefined>}
     */

    iconURL(options?: ViewOptions): string | undefined {
        return this.icon && GuildIcon(this.id, this.icon) + `.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
    }

    /**
     * Returns guild's splash URL
     * @param {ViewOptions} options - Optional image options
     * @returns {string | undefined}
     */

    splashURL(options?: ViewOptions): string | undefined {
        return this.splash && GuildSplash(this.id, this.splash) + `.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
    }
}