import { Basic } from "./Basic";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import { GuildPreview as GuildPreviewRoute, GuildDiscoverySplash, GuildIcon, GuildSplash } from "../utils/Routes";
import type { GuildFeatures, RawDiscordAPIGuildPreviewData, RawGuildEmoji, RawGuildPreview, RawSticker, ViewOptions } from "../types";

export class GuildPreview extends Basic implements RawGuildPreview {
    id: Snowflake;
    name: string;
    icon: string | undefined;
    splash: string | undefined;
    discovery_splash: string | undefined;
    emojis: Array<RawGuildEmoji>;
    features: Array<GuildFeatures>;
    approximate_member_count: number;
    approximate_presence_count: number;
    description: string | undefined;
    stickers: Array<RawSticker>;
    creation_timestamp: number;
    creation_date: Date;
    private readonly auth: { headers: { Authorization: `Bot ${string}` } };

    constructor(data: RawDiscordAPIGuildPreviewData, client: Client) {
        super(client);

        this.id = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.splash = data.splash;
        this.discovery_splash = data.discovery_splash;
        this.emojis = data.emojis;
        this.features = data.features;
        this.approximate_member_count = data.approximate_member_count;
        this.approximate_presence_count = data.approximate_presence_count;
        this.description = data.description;
        this.stickers = data.stickers;
        this.creation_date = new Date((+this.id / 4194304) + 1420070400000);
        this.creation_timestamp = this.creation_date.getTime();
        this.auth = { headers: { Authorization: `Bot ${this.client.token}` } };

        Object.assign(this, data);
    };

    /**
     * Stringify the GuildPreview objecto into guild's name
     * @returns {string}
     */

    toString(): string {
        return this.name;
    };

    /**
     * Fetch guild's preview
     * @returns {Promise<GuildPreview>}
     */

    async fetch(): Promise<GuildPreview> {
        const { data }: { data: RawDiscordAPIGuildPreviewData } = await rest.get(GuildPreviewRoute(this.id), this.auth);

        return new GuildPreview(data, this.client);
    };

    /**
     * Returns guild's discovery splash URL
     * @param {ViewOptions} options - Optional image options
     * @returns {string | undefined}
     */

    discoverySplashURL(options?: ViewOptions): string | undefined {
        return this.discovery_splash && GuildDiscoverySplash(this.id, this.discovery_splash) + `.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
    };

    /**
     * Returns guild's icon URL
     * @param {ViewOptions} options - Optional image options
     * @returns {Promise<string | undefined>}
     */

    iconURL(options?: ViewOptions): string | undefined {
        return this.icon && GuildIcon(this.id, this.icon) + `.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
    };

    /**
     * Returns guild's splash URL
     * @param {ViewOptions} options - Optional image options
     * @returns {string | undefined}
     */

    splashURL(options?: ViewOptions): string | undefined {
        return this.splash && GuildSplash(this.id, this.splash) + `.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
    };
};