import { User } from "./User";
import { Widget } from "./Widget";
import { Locales } from "../types";
import { Message } from "./Message";
import { Webhook } from "./Webhook";
import { api } from "../constants/Api";
import { Group } from "../utils/Group";
import { BasicGuild } from "./BasicGuild";
import { Client } from "../entities/Client";
import { Integration } from "./Integration";
import { GuildMember } from "./GuildMember";
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
    public icon_hash: string | undefined;
    public splash: string | undefined;
    public discovery_splash: string | undefined;
    public owner: boolean | undefined;
    public owner_id: Snowflake;
    public permissions: string | undefined;
    public afk_channel_id: Snowflake | undefined;
    public afk_timeout: number;
    public widget_enabled: boolean | undefined;
    public widget_channel_id: Snowflake | undefined;
    public verification_level: GuildVerificationLevels;
    public default_message_notifications: number;
    public explicit_content_filter: ExplicitContentFilterLevels;
    public roles: Array<RawGuildRole>;
    public emojis: Array<RawGuildEmoji>;
    public mfa_level: number;
    public application_id: Snowflake | undefined;
    public system_channel_id: Snowflake | undefined;
    public system_channel_flags: SystemChannelFlags;
    public rules_channel_id: Snowflake | undefined;
    public max_presences: number | undefined;
    public max_members: number;
    public vanity_url_code: string | undefined;
    public description: string | undefined;
    public banner: string | undefined;
    public premium_tier: GuildPremiumTier;
    public premium_subscription_count: number | undefined;
    public preferred_locale: keyof Locales;
    public public_updates_channel_id: Snowflake | undefined;
    public max_video_channel_users: number | undefined;
    public max_stage_video_channel_users: number | undefined;
    public approximate_member_count: number | undefined;
    public approximate_presence_count: number | undefined;
    public welcome_screen: GuildWelcomeScreenData | undefined;
    public nsfw_level: GuildNSFWLevels;
    public stickers: Array<Required<Omit<RawSticker, 'pack_id' | 'sort_value'>>> | undefined;
    public premium_progress_bar_enabled: boolean;
    public creation_timestamp: number;
    public creation_date: Date;
    private readonly axios_confg: { headers: { Authorization: `Bot ${string}` } };

    /**
     * Create a new Guild
     * @param {RawGuild} data - The guild data
     * @param {Client} client - The client
     * @see https://discord.com/developers/docs/resources/guild
     */

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
        this.axios_confg = { headers: { Authorization: `Bot ${this.client.token}` } };

        Object.assign(this, data);
    };

    /**
     * Create a new template
     * @param {string} name - The template name
     * @param {string} description - The description
     * @returns {Promise<GuildTemplate>}
     */

    async createTemplate(name: string, description?: string): Promise<GuildTemplate> {
        const { data }: { data: GuildTemplateData } = await api.post(GuildTemplatesRoute(this.id), { name, description }, this.axios_confg);

        return new GuildTemplate(data, this.client);
    };

    /**
     * Delete the guild
     * @returns {Promise<Guild>}
     */

    async delete(): Promise<Guild> {
        await api.delete(GuildRoute(this.id), this.axios_confg);

        return this;
    };

    /**
     * Leave from guild's
     * @returns {Promise<Guild>}
     */

    async leave(): Promise<Guild> {
        await api.delete(OauthGuild(this.id), this.axios_confg);

        return this;
    };

    /**
     * Edit guild's options
     * @param {GuildEditOptions} options - The options to edit
     * @param {string} reason - Reason for edit the guild's
     * @returns {Promise<Guild>}
     */

    async edit(options: GuildEditOptions, reason?: string): Promise<Guild> {
        const { data }: { data: RawGuild } = await api.patch(GuildRoute(this.id), options, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return new Guild(data, this.client);
    };

    /**
     * Fetch guild's preview
     * @returns {Promise<GuildPreview>}
     */

    async fetchPreview(): Promise<GuildPreview> {
        const { data }: { data: RawGuildPreview } = await api.get(GuildPreviewRoute(this.id), this.axios_confg);

        return new GuildPreview(data, this.client);
    };

    /**
     * Fetch guild's widget
     * @returns {Promise<Widget>}
     */

    async fetchWidget(): Promise<Widget> {
        const { data }: { data: GuildWidgetData } = await api.get(GuildWidgetJSON(this.id), this.axios_confg);

        return new Widget(data, this.client);
    };

    /**
     * Fetch guild's widget settings
     * @returns {Promise<GuildWidgetSettingsData>}
     */

    async fetchWidgetSettings(): Promise<GuildWidgetSettingsData> {
        const { data }: { data: GuildWidgetSettingsData } = await api.get(GuildWidget(this.id), this.axios_confg);

        return data;
    };

    /**
     * Fetch guild's welcome screen
     * @returns {Promise<WelcomeScreen>}
     */

    async fetchWelcomeScreen(): Promise<WelcomeScreen> {
        const { data }: { data: GuildWelcomeScreenData } = await api.get(GuildWelcomeScreen(this.id), this.axios_confg);

        return new WelcomeScreen(data, this.client, this);
    };

    /**
     * Fetch guild's owner
     * @returns {Promise<User>}
     */

    async fetchOwner(): Promise<User> {
        const { data }: { data: RawDiscordAPIUserData } = await api.get(UserRoute(this.owner_id), this.axios_confg);

        return new User(data, this.client);
    };

    /**
     * Fetch guild's vanity URL
     * @returns {Promise<GuildVanityData>}
     */

    async fetchVanityURL(): Promise<GuildVanityData> {
        const { data }: { data: GuildVanityData } = await api.get(GuildVanityURL(this.id), this.axios_confg);

        return data;
    };

    /**
     * Fetch all guild's integrations
     * @returns {Promise<Group<Snowflake, Integration>>}
     */

    async fetchIntegrations(): Promise<Group<Snowflake, Integration>> {
        const integrationsGroup: Group<Snowflake, Integration> = new Group<Snowflake, Integration>();
        const { data }: { data: Array<RawIntegrationData> } = await api.get(GuildIntegrations(this.id), this.axios_confg);

        data.forEach((integration: RawIntegrationData) => integrationsGroup.set(integration.id, new Integration(integration, this.client, this)));

        return integrationsGroup;
    };


    /**
     * Fetch all guild's webhooks
     * @returns {Promise<Group<Snowflake, Webhook>>}
     */

    async fetchWebhooks(): Promise<Group<Snowflake, Webhook>> {
        const webhooksGroup: Group<Snowflake, Webhook> = new Group<Snowflake, Webhook>();
        const { data }: { data: Array<RawDiscordAPIWebhookData> } = await api.get(GuildWebhooks(this.id), this.axios_confg);

        data.forEach((webhook: RawDiscordAPIWebhookData) => webhooksGroup.set(webhook.id, new Webhook(webhook, this.client)));

        return webhooksGroup;
    };

    /**
     * Fetch guild's onboarding
     * @returns {Promise<GuildOnboardingData>}
     */

    async fetchOnboarding(): Promise<GuildOnboardingData> {
        const { data }: { data: GuildOnboardingData } = await api.get(GuildOnboarding(this.id), this.axios_confg);

        return data;
    };

    /**
     * Set guild's name
     * @param {string} name - New name
     * @param {string} reason - Reason for edit the name
     * @returns {Promise<Guild>}
     */

    async setName(name: string, reason?: string): Promise<Guild> {
        const data: Guild = await this.edit({ name }, reason);

        return data;
    };

    /**
     * Set guild's AFK timeout
     * @param {number} timeout - The timeout 
     * @param {string} reason - Reason for edit the AFK timeout
     * @returns {Promise<Guild>}
     */

    async setAFKTimeout(timeout: number, reason?: string): Promise<Guild> {
        const data: Guild = await this.edit({ afk_timeout: timeout }, reason);

        return data;
    };

    /**
     * Set guild's banner
     * @param {string} banner - New banner
     * @param {string} reason - Reason for edit the banner
     * @returns {Promise<Guild>}
     */

    async setBanner(banner: string, reason?: string): Promise<Guild> {
        const data: Guild = await this.edit({ banner }, reason);

        return data;
    };

    /**
     * Set guild's icon
     * @param {string} icon - New icon
     * @param {string} reason - Reason for edit the icon
     * @returns {Promise<Guild>}
     */

    async setIcon(icon: string, reason?: string): Promise<Guild> {
        const data: Guild = await this.edit({ icon }, reason);

        return data;
    };

    /**
     * Set guild's owner
     * @param {GuildMemberResolvable} owner - The new owner 
     * @param {string} reason - Reason for change the owner
     * @returns {Promise<Guild>}
     */

    async setOwner(owner: GuildMemberResolvable, reason?: string): Promise<Guild> {
        const data: Guild = await this.edit({ owner_id: owner instanceof User || owner instanceof GuildMember ? owner.id : owner instanceof Message ? owner.author.id : owner }, reason);

        return data;
    };
    toString(): string {
        return this.name;
    };
};