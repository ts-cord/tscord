import { Basic } from "./Basic";
import { api } from "../constants/Api";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import { ViewOptions } from "../interfaces/IViewOptions";
import { GuildPreview as GuildPreviewRoute, GuildDiscoverySplash, GuildIcon, GuildSplash } from "../utils/Routes";
import type { GuildFeatures, RawDiscordAPIGuildPreviewData, RawGuildEmoji, RawGuildPreview, RawSticker } from "../types";

export class GuildPreview extends Basic implements RawGuildPreview {
    id: Snowflake;
    name: string;
    icon?: string;
    splash?: string;
    discovery_splash?: string;
    emojis: Array<RawGuildEmoji>;
    features: Array<GuildFeatures>;
    approximate_member_count: number;
    approximate_presence_count: number;
    description?: string;
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

    toString(): string {
        return this.name;
    };
    async fetch(): Promise<GuildPreview> {
        const { data }: { data: RawDiscordAPIGuildPreviewData } = await api.get(GuildPreviewRoute(this.id), this.auth);

        return new GuildPreview(data, this.client);
    };
    discoverySplashURL(options?: ViewOptions): string | undefined {
        return this.discovery_splash && GuildDiscoverySplash(this.id, this.discovery_splash) + `.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
    };
    iconURL(options?: ViewOptions): string | undefined {
        return this.icon && GuildIcon(this.id, this.icon) + `.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
    };
    splashURL(options?: ViewOptions): string | undefined {
        return this.splash && GuildSplash(this.id, this.splash) + `.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
    };
};