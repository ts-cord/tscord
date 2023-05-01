import { User } from "./User";
import { Widget } from "./Widget";
import { Locales } from "../types";
import { Webhook } from "./Webhook";
import { api } from "../constants/Api";
import { Group } from "../utils/Group";
import { BasicGuild } from "./BasicGuild";
import { Client } from "../entities/Client";
import { Integration } from "./Integration";
import { GuildPreview } from "./GuildPreview";
import { Snowflake } from "../types/Snowflake";
import { GuildTemplate } from "./GuildTemplate";
import { WelcomeScreen } from "./WelcomeScreen";
import { GuildTemplates as GuildTemplatesRoute, Guild as GuildRoute, OauthGuild, GuildPreview as GuildPreviewRoute, GuildWidget, GuildWidgetJSON, GuildWelcomeScreen, User as UserRoute, GuildVanityURL, GuildIntegrations, GuildWebhooks, GuildOnboarding } from "../utils/Routes";
import type { ExplicitContentFilterLevels, GuildEditOptions, GuildFeatures, GuildMemberResolvable, GuildNSFWLevels, GuildOnboardingData, GuildPremiumTier, GuildTemplateData, GuildVanityData, GuildVerificationLevels, GuildWelcomeScreenData, GuildWidgetData, GuildWidgetSettingsData, RawDiscordAPIUserData, RawDiscordAPIWebhookData, RawGuild, RawGuildEmoji, RawGuildPreview, RawGuildRole, RawIntegrationData, RawSticker, SystemChannelFlags } from "../types";


export class Guild extends BasicGuild implements RawGuild {
    public id: Snowflake;
    public name: string;
    public features: Array<GuildFeatures>;
    public icon: string;
    public partnered: boolean;
    public verified: boolean;
    public name_acronym: string;
    public icon_hash?: string;
    public splash?: string;
    public discovery_splash?: string;
    public owner?: boolean;
    public owner_id: Snowflake;
    public permissions?: string;
    public afk_channel_id?: Snowflake;
    public afk_timeout: number;
    public widget_enabled?: boolean;
    public widget_channel_id?: Snowflake;
    public verification_level: GuildVerificationLevels;
    public default_message_notifications: number;
    public explicit_content_filter: ExplicitContentFilterLevels;
    public roles: Array<RawGuildRole>;
    public emojis: Array<RawGuildEmoji>;
    public mfa_level: number;
    public application_id?: Snowflake;
    public system_channel_id?: Snowflake;
    public system_channel_flags: SystemChannelFlags;
    public rules_channel_id?: Snowflake;
    public max_presences?: number;
    public max_members: number;
    public vanity_url_code?: string;
    public description?: string;
    public banner?: string;
    public premium_tier: GuildPremiumTier;
    public premium_subscription_count?: number;
    public preferred_locale: keyof Locales;
    public public_updates_channel_id?: Snowflake;
    public max_video_channel_users?: number;
    public max_stage_video_channel_users?: number;
    public approximate_member_count?: number;
    public approximate_presence_count?: number;
    public welcome_screen?: GuildWelcomeScreenData;
    public nsfw_level: GuildNSFWLevels;
    public stickers?: Array<Required<Omit<RawSticker, 'pack_id' | 'sort_value'>>>;
    public premium_progress_bar_enabled: boolean;
    public creation_timestamp: number;
    public creation_date: Date;
    private readonly axiosAuth: { headers: { Authorization: `Bot ${string}` } };

    constructor(data: RawGuild, client: Client) {
        super(data, client);

        this.id = super.id;
        this.name = super.name;
        this.features = super.features;
        this.icon = super.icon;
        this.partnered = super.partnered;
        this.verified = super.verified;
        this.name_acronym = super.name_acronym;
        this.creation_timestamp = super.creation_timestamp;
        this.creation_date = super.creation_date;
        this.icon_hash = data.icon_hash;
        this.splash = data.splash;
        this.discovery_splash = data.discovery_splash;
        this.owner = data.owner;
        this.owner_id = data.owner_id;
        this.permissions = data.permissions;
        this.afk_channel_id = data.afk_channel_id;
        this.afk_timeout = data.afk_timeout;
        this.widget_enabled = data.widget_enabled;
        this.widget_channel_id = data.widget_channel_id;
        this.verification_level = data.verification_level;
        this.default_message_notifications = data.default_message_notifications;
        this.explicit_content_filter = data.explicit_content_filter;
        this.roles = data.roles;
        this.emojis = data.emojis;
        this.mfa_level = data.mfa_level;
        this.application_id = data.application_id;
        this.system_channel_flags = data.system_channel_flags;
        this.system_channel_id = data.system_channel_id;
        this.rules_channel_id = data.rules_channel_id;
        this.max_presences = data.max_presences;
        this.max_members = data.max_members;
        this.vanity_url_code = data.vanity_url_code;
        this.description = data.description;
        this.banner = data.banner;
        this.premium_tier = data.premium_tier;
        this.premium_subscription_count = data.premium_subscription_count;
        this.preferred_locale = data.preferred_locale;
        this.public_updates_channel_id = data.public_updates_channel_id;
        this.max_video_channel_users = data.max_video_channel_users;
        this.max_stage_video_channel_users = data.max_stage_video_channel_users;
        this.approximate_member_count = data.approximate_member_count;
        this.approximate_presence_count = data.approximate_presence_count;
        this.welcome_screen = data.welcome_screen;
        this.nsfw_level = data.nsfw_level;
        this.stickers = data.stickers;
        this.premium_progress_bar_enabled = data.premium_progress_bar_enabled;
        this.axiosAuth = { headers: { Authorization: `Bot ${this.client.token}` } };

        Object.assign(this, data);
    };
    async createTemplate(name: string, description?: string): Promise<GuildTemplate> {
        const { data }: { data: GuildTemplateData } = await api.post(GuildTemplatesRoute(this.id), { name, description }, this.axiosAuth);

        return new GuildTemplate(data, this.client);
    };
    async delete(): Promise<Guild> {
        await api.delete(GuildRoute(this.id), this.axiosAuth);

        return this;
    };
    async leave(): Promise<Guild> {
        await api.delete(OauthGuild(this.id), this.axiosAuth);

        return this;
    };
    async edit(options: GuildEditOptions, reason?: string): Promise<Guild> {
        const { data }: { data: RawGuild } = await api.patch(GuildRoute(this.id), options, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return new Guild(data, this.client);
    };
    async fetchPreview(): Promise<GuildPreview> {
        const { data }: { data: RawGuildPreview } = await api.get(GuildPreviewRoute(this.id), this.axiosAuth);

        return new GuildPreview(data, this.client);
    };
    async fetchWidget(): Promise<Widget> {
        const { data }: { data: GuildWidgetData } = await api.get(GuildWidgetJSON(this.id), this.axiosAuth);

        return new Widget(data, this.client);
    };
    async fetchWidgetSettings(): Promise<GuildWidgetSettingsData> {
        const { data }: { data: GuildWidgetSettingsData } = await api.get(GuildWidget(this.id), this.axiosAuth);

        return data;
    };
    async fetchWelcomeScreen() {
        const { data }: { data: GuildWelcomeScreenData } = await api.get(GuildWelcomeScreen(this.id), this.axiosAuth);

        return new WelcomeScreen(data, this.client, this);
    };
    async fetchOwner(): Promise<User> {
        const { data }: { data: RawDiscordAPIUserData } = await api.get(UserRoute(this.owner_id), this.axiosAuth);

        return new User(data, this.client);
    };
    async fetchVanityURL(): Promise<GuildVanityData> {
        const { data }: { data: GuildVanityData } = await api.get(GuildVanityURL(this.id), this.axiosAuth);

        return data;
    };
    async fetchIntegrations(): Promise<Group<Snowflake, Integration>> {
        const integrationsGroup: Group<Snowflake, Integration> = new Group<Snowflake, Integration>();
        const { data }: { data: Array<RawIntegrationData> } = await api.get(GuildIntegrations(this.id), this.axiosAuth);

        data.forEach((integration: RawIntegrationData) => integrationsGroup.set(integration.id, new Integration(integration, this.client, this)));

        return integrationsGroup;
    };
    async fetchWebhooks(): Promise<Group<Snowflake, Webhook>> {
        const webhooksGroup: Group<Snowflake, Webhook> = new Group<Snowflake, Webhook>();
        const { data }: { data: Array<RawDiscordAPIWebhookData> } = await api.get(GuildWebhooks(this.id), this.axiosAuth);

        data.forEach((webhook: RawDiscordAPIWebhookData) => webhooksGroup.set(webhook.id, new Webhook(webhook, this.client)));

        return webhooksGroup;
    };
    async fetchOnboarding(): Promise<GuildOnboardingData> {
        const { data }: { data: GuildOnboardingData } = await api.get(GuildOnboarding(this.id), this.axiosAuth);

        return data;
    };
    async setName(name: string, reason?: string): Promise<Guild> {
        const data: Guild = await this.edit({ name }, reason);

        return data;
    };
    async setAFKTimeout(timeout: number, reason?: string): Promise<Guild> {
        const data: Guild = await this.edit({ afk_timeout: timeout }, reason);

        return data;
    };
    async setBanner(banner: string, reason?: string): Promise<Guild> {
        const data: Guild = await this.edit({ banner }, reason);

        return data;
    };
    async setIcon(icon: string, reason?: string): Promise<Guild> {
        const data: Guild = await this.edit({ icon }, reason);

        return data;
    };
    async setOwner(owner: GuildMemberResolvable, reason?: string): Promise<Guild> {
        const data: Guild = await this.edit({ owner_id: owner instanceof User ? owner.id : owner }, reason);

        return data;
    };
    toString(): string {
        return this.name;
    };
};