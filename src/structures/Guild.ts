import { User } from "./User";
import { Widget } from "./Widget";
import { Locales } from "../types";
import { Message } from "./Message";
import { Webhook } from "./Webhook";
import { rest } from "../constants/Api";
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

export class Guild extends BasicGuild {
    public id: Snowflake;
    public name: string;
    public features: Array<GuildFeatures>;
    public icon: string;
    public partnered: boolean;
    public verified: boolean;
    public nameAcronym: string;
    public iconHash: string | undefined;
    public splash: string | undefined;
    public discoverySplash: string | undefined;
    public owner: boolean | undefined;
    public ownerId: Snowflake;
    public permissions: string | undefined;
    public afkChannelId: Snowflake | undefined;
    public afkTimeout: number;
    public widgetEnabled: boolean | undefined;
    public widgetChannelId: Snowflake | undefined;
    public verificationLevel: GuildVerificationLevels;
    public defaultMessageNotifications: number;
    public explicitContentFilter: ExplicitContentFilterLevels;
    public roles: Array<RawGuildRole>;
    public emojis: Array<RawGuildEmoji>;
    public mfa_level: number;
    public applicationId: Snowflake | undefined;
    public systemChannelId: Snowflake | undefined;
    public systemChannelFlags: SystemChannelFlags;
    public rulesChannelId: Snowflake | undefined;
    public maxPresences: number | undefined;
    public maxMembers: number;
    public vanityUrlCode: string | undefined;
    public description: string | undefined;
    public banner: string | undefined;
    public premiumTier: GuildPremiumTier;
    public premiumSubscriptionCount: number | undefined;
    public preferredLocale: keyof Locales;
    public publicUpdatesChannelId: Snowflake | undefined;
    public maxVideoChannelUsers: number | undefined;
    public maxStageVideoChannelUsers: number | undefined;
    public approximateMemberCount: number | undefined;
    public approximatePresenceCount: number | undefined;
    public welcomeScreen: GuildWelcomeScreenData | undefined;
    public nsfwLevel: GuildNSFWLevels;
    public stickers: Array<Required<Omit<RawSticker, "pack_id" | "sort_value">>> | undefined;
    public premiumProgressBarEnabled: boolean;
    public creationTimestamp: number;
    public creationDate: Date;
    private readonly superAxiosConfig: { headers: { Authorization: `Bot ${string}` } };

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
        this.nameAcronym = super.nameAcronym;
        this.creationTimestamp = super.creationTimestamp;
        this.creationDate = super.creationDate;
        this.iconHash = data.icon_hash;
        this.splash = data.splash;
        this.discoverySplash = data.discovery_splash;
        this.owner = data.owner;
        this.ownerId = data.owner_id;
        this.permissions = data.permissions;
        this.afkChannelId = data.afk_channel_id;
        this.afkTimeout = data.afk_timeout;
        this.widgetEnabled = data.widget_enabled;
        this.widgetChannelId = data.widget_channel_id;
        this.verificationLevel = data.verification_level;
        this.defaultMessageNotifications = data.default_message_notifications;
        this.explicitContentFilter = data.explicit_content_filter;
        this.roles = data.roles;
        this.emojis = data.emojis;
        this.mfa_level = data.mfa_level;
        this.applicationId = data.application_id;
        this.systemChannelFlags = data.system_channel_flags;
        this.systemChannelId = data.system_channel_id;
        this.rulesChannelId = data.rules_channel_id;
        this.maxPresences = data.max_presences;
        this.maxMembers = data.max_members;
        this.vanityUrlCode = data.vanity_url_code;
        this.description = data.description;
        this.banner = data.banner;
        this.premiumTier = data.premium_tier;
        this.premiumSubscriptionCount = data.premium_subscription_count;
        this.preferredLocale = data.preferred_locale;
        this.publicUpdatesChannelId = data.public_updates_channel_id;
        this.maxVideoChannelUsers = data.max_video_channel_users;
        this.maxStageVideoChannelUsers = data.max_stage_video_channel_users;
        this.approximateMemberCount = data.approximate_member_count;
        this.approximatePresenceCount = data.approximate_presence_count;
        this.welcomeScreen = data.welcome_screen;
        this.nsfwLevel = data.nsfw_level;
        this.stickers = data.stickers;
        this.premiumProgressBarEnabled = data.premium_progress_bar_enabled;
        this.superAxiosConfig = { headers: { Authorization: `Bot ${this.client.token}` } };

        Object.assign(this, data);
    }

    /**
     * Create a new template
     * @param {string} name - The template name
     * @param {string} description - The description
     * @returns {Promise<GuildTemplate>}
     */

    async createTemplate(name: string, description?: string): Promise<GuildTemplate> {
        const { data }: { data: GuildTemplateData; } = await rest.post(GuildTemplatesRoute(this.id), { name, description }, this.superAxiosConfig);

        return new GuildTemplate(data, this.client);
    }

    /**
     * Delete the guild
     * @returns {Promise<Guild>}
     */

    async delete(): Promise<Guild> {
        await rest.delete(GuildRoute(this.id), this.superAxiosConfig);

        return this;
    }

    /**
     * Leave from guild's
     * @returns {Promise<Guild>}
     */

    async leave(): Promise<Guild> {
        await rest.delete(OauthGuild(this.id), this.superAxiosConfig);

        return this;
    }

    /**
     * Edit guild's options
     * @param {GuildEditOptions} options - The options to edit
     * @param {string} reason - Reason for edit the guild's
     * @returns {Promise<Guild>}
     */

    async edit(options: GuildEditOptions, reason?: string): Promise<Guild> {
        const { data }: { data: RawGuild; } = await rest.patch(GuildRoute(this.id), options, { headers: { Authorization: `Bot ${this.client.token}`, "X-Audit-Log-Reason": reason } });

        return new Guild(data, this.client);
    }

    /**
     * Fetch guild's preview
     * @returns {Promise<GuildPreview>}
     */

    async fetchPreview(): Promise<GuildPreview> {
        const { data }: { data: RawGuildPreview; } = await rest.get(GuildPreviewRoute(this.id), this.superAxiosConfig);

        return new GuildPreview(data, this.client);
    }

    /**
     * Fetch guild's widget
     * @returns {Promise<Widget>}
     */

    async fetchWidget(): Promise<Widget> {
        const { data }: { data: GuildWidgetData; } = await rest.get(GuildWidgetJSON(this.id), this.superAxiosConfig);

        return new Widget(data, this.client);
    }

    /**
     * Fetch guild's widget settings
     * @returns {Promise<GuildWidgetSettingsData>}
     */

    async fetchWidgetSettings(): Promise<GuildWidgetSettingsData> {
        const { data }: { data: GuildWidgetSettingsData; } = await rest.get(GuildWidget(this.id), this.superAxiosConfig);

        return data;
    }

    /**
     * Fetch guild's welcome screen
     * @returns {Promise<WelcomeScreen>}
     */

    async fetchWelcomeScreen(): Promise<WelcomeScreen> {
        const { data }: { data: GuildWelcomeScreenData; } = await rest.get(GuildWelcomeScreen(this.id), this.superAxiosConfig);

        return new WelcomeScreen(data, this.client, this);
    }

    /**
     * Fetch guild's owner
     * @returns {Promise<User>}
     */

    async fetchOwner(): Promise<User> {
        const { data }: { data: RawDiscordAPIUserData; } = await rest.get(UserRoute(this.ownerId), this.superAxiosConfig);

        return new User(data, this.client);
    }

    /**
     * Fetch guild's vanity URL
     * @returns {Promise<GuildVanityData>}
     */

    async fetchVanityURL(): Promise<GuildVanityData> {
        const { data }: { data: GuildVanityData; } = await rest.get(GuildVanityURL(this.id), this.superAxiosConfig);

        return data;
    }

    /**
     * Fetch all guild's integrations
     * @returns {Promise<Group<Snowflake, Integration>>}
     */

    async fetchIntegrations(): Promise<Group<Snowflake, Integration>> {
        const integrationsGroup: Group<Snowflake, Integration> = new Group<Snowflake, Integration>();
        const { data }: { data: Array<RawIntegrationData>; } = await rest.get(GuildIntegrations(this.id), this.superAxiosConfig);

        data.forEach((integration: RawIntegrationData) => integrationsGroup.set(integration.id, new Integration(integration, this.client, this)));

        return integrationsGroup;
    }


    /**
     * Fetch all guild's webhooks
     * @returns {Promise<Group<Snowflake, Webhook>>}
     */

    async fetchWebhooks(): Promise<Group<Snowflake, Webhook>> {
        const webhooksGroup: Group<Snowflake, Webhook> = new Group<Snowflake, Webhook>();
        const { data }: { data: Array<RawDiscordAPIWebhookData>; } = await rest.get(GuildWebhooks(this.id), this.superAxiosConfig);

        data.forEach((webhook: RawDiscordAPIWebhookData): Group<Snowflake, Webhook> => webhooksGroup.set(webhook.id, new Webhook(webhook, this.client)));

        return webhooksGroup;
    }

    /**
     * Fetch guild's onboarding
     * @returns {Promise<GuildOnboardingData>}
     */

    async fetchOnboarding(): Promise<GuildOnboardingData> {
        const { data }: { data: GuildOnboardingData; } = await rest.get(GuildOnboarding(this.id), this.superAxiosConfig);

        return data;
    }

    /**
     * Set guild's name
     * @param {string} name - New name
     * @param {string} reason - Reason for edit the name
     * @returns {Promise<Guild>}
     */

    async setName(name: string, reason?: string): Promise<Guild> {
        const data: Guild = await this.edit({ name }, reason);

        return data;
    }

    /**
     * Set guild's AFK timeout
     * @param {number} timeout - The timeout 
     * @param {string} reason - Reason for edit the AFK timeout
     * @returns {Promise<Guild>}
     */

    async setAFKTimeout(timeout: number, reason?: string): Promise<Guild> {
        const data: Guild = await this.edit({ afk_timeout: timeout }, reason);

        return data;
    }

    /**
     * Set guild's banner
     * @param {string} banner - New banner
     * @param {string} reason - Reason for edit the banner
     * @returns {Promise<Guild>}
     */

    async setBanner(banner: string, reason?: string): Promise<Guild> {
        const data: Guild = await this.edit({ banner }, reason);

        return data;
    }

    /**
     * Set guild's icon
     * @param {string} icon - New icon
     * @param {string} reason - Reason for edit the icon
     * @returns {Promise<Guild>}
     */

    async setIcon(icon: string, reason?: string): Promise<Guild> {
        const data: Guild = await this.edit({ icon }, reason);

        return data;
    }

    /**
     * Set guild's owner
     * @param {GuildMemberResolvable} owner - The new owner 
     * @param {string} reason - Reason for change the owner
     * @returns {Promise<Guild>}
     */

    async setOwner(owner: GuildMemberResolvable, reason?: string): Promise<Guild> {
        const data: Guild = await this.edit({ owner_id: owner instanceof User || owner instanceof GuildMember ? owner.id : owner instanceof Message ? owner.author.id : owner }, reason);

        return data;
    }

    /**
     * Stringify guild's object into guild's name
     * @returns {string}
     */

    toString(): string {
        return this.name;
    }
}