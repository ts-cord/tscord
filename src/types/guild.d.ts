import { Snowflake } from "./Snowflake";
import { User } from "../managers/User";
import { Guild } from "../structures/Guild";
import { GuildScheduledEvent as GuildScheduledEventClass } from "../structures/GuildScheduledEvent";
import type { Locales, RawDiscordAPIUserData, UserResolvable , RawGuildRole, DefaultMessageNotificationLevel, RawWelcomeScreenChannel, SystemChannelFlags, ApplicationCommandData, RawDiscordAPIWebhookData, BasicFetchOptions, RawDiscordAPIChannelData } from "../types";
import { GuildMember } from "../structures/GuildMember";
import { Role } from "../structures/Role";
import { Sticker } from "../structures/Sticker";

export interface GuildCreateOptions {
    name: string;
    icon?: string;
    verification_level?: GuildVerificationLevels;
    default_message_notifications?: DefaultMessageNotificationLevel;
    explicit_content_filter?: ExplicitContentFilterLevels;
    roles?: RawGuildRole[];
    channels?: Partial<RawDiscordAPIChannelData>[];
    afk_channel_id?: Snowflake;
    afk_timeout?: number;
    system_channel_id?: Snowflake;
    system_channel_flags?: SystemChannelFlags;
}

export interface BasicGuildData {
    id: Snowflake;
    name: string;
    features: Array<GuildFeatures>;
    icon: string;
    partnered: boolean;
    verified: boolean;
    name_acronym: string;
}

export enum GuildFeatures {
    AnimatedBanner = "ANIMATED_BANNER",
    AnimatedIcon = "ANIMATED_ICON",
    ApplicationCommandPermissionsV2 = "APPLICATION_COMMAND_PERMISSIONS_V2",
    AutoModeration = "AUTO_MODERATION",
    Banner = "BANNER",
    Community = "COMMUNITY",
    CreatorMonetizableProvisional = "CREATOR_MONETIZABLE_PROVISIONAL",
    CreatorStoragePage = "CREATOR_STORE_PAGE",
    DeveloperSupportServer = "DEVELOPER_SUPPORT_SERVER",
    Discoverable = "DISCOVERABLE",
    Featurable = "FEATURABLE",
    InviteDisabled = "INVITE_DISABLED",
    InviteSplash = "IVNITE_SPLASH",
    MemberVerificationGateEnabled = "MEMBER_VERIFICATION_GATE_ENABLED",
    MoreStickers = "MORE_STICKERS",
    News = "NEWS",
    Partnered = "PARTNERED",
    PreviewEnabled = "PREVIEW_ENABLED",
    RoleIcons = "ROLE_ICONS",
    RoleSubscriptionsAvailableForPurchase = "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE",
    RoleSubscriptionsEnabled = "ROLE_SUBSCRIPTIONS_ENABLED",
    TicketedEventsEnabled = "TICKEDTED_EVENTS_ENABLED",
    VanityURL = "VANITY_URL",
    Verified = "VERIFIED",
    VipRegions = "VIP_REGIONS",
    WelcomeScreenEnabled = "WELCOME_SCREEN_ENABLED"
}

export interface GuildWidgetData {
    id: Snowflake;
    name: string;
    instant_invite?: string;
    channels: Array<Partial<RawDiscordAPIChannelData>>;
    members: Array<Partial<RawDiscordAPIUserData>>;
    presence_count: number;
}

export interface GuildWidgetSettingsData {
    enabled: boolean;
    channel_id?: Snowflake;
}

export interface RawGuild extends BasicGuildData {
    icon_hash?: string;
    splash?: string;
    discovery_splash?: string;
    owner?: boolean;
    owner_id: Snowflake;
    permissions?: string;
    afk_channel_id?: Snowflake;
    afk_timeout: number;
    widget_enabled?: boolean;
    widget_channel_id?: Snowflake;
    verification_level: GuildVerificationLevels;
    default_message_notifications: number;
    explicit_content_filter: ExplicitContentFilterLevels;
    roles: Array<RawGuildRole>;
    emojis: Array<RawGuildEmoji>;
    mfa_level: number;
    application_id?: Snowflake;
    system_channel_id?: Snowflake;
    system_channel_flags: SystemChannelFlags;
    rules_channel_id?: Snowflake;
    max_presences?: number;
    max_members: number;
    vanity_url_code?: string;
    description?: string;
    banner?: string;
    premium_tier: GuildPremiumTier;
    premium_subscription_count?: number;
    preferred_locale: keyof Locales;
    public_updates_channel_id?: Snowflake;
    max_video_channel_users?: number;
    max_stage_video_channel_users?: number;
    approximate_member_count?: number;
    approximate_presence_count?: number;
    welcome_screen?: GuildWelcomeScreenData;
    nsfw_level: GuildNSFWLevels;
    stickers?: Array<Required<Omit<RawSticker, "pack_id" | "sort_value">>>;
    premium_progress_bar_enabled: boolean;
    creation_timestamp: number;
    creation_date: Date;
}

export interface GuildWelcomeScreenEditOptions {
    enabled?: boolean;
    welcome_channels?: Array<RawWelcomeScreenChannel>;
    description?: string;
    reason?: string;
}

export type GuildVanityData = { code?: string; uses: number; };

export interface GuildEditOptions {
    name?: string;
    verification_level?: GuildVerificationLevels;
    default_message_notifications?: DefaultMessageNotificationLevel;
    explicit_content_filter?: ExplicitContentFilterLevels;
    afk_channel_id?: Snowflake;
    afk_timeout?: number;
    icon?: string;
    owner_id?: Snowflake;
    splash?: string;
    discovery_splash?: string;
    banner?: string;
    system_channel_id?: Snowflake;
    system_channel_flags?: SystemChannelFlags;
    rules_channel_id?: Snowflake;
    public_updates_channel_id?: Snowflake;
    preferred_locale?: keyof Locales;
    features?: Array<GuildFeatures>;
    description?: string;
    premium_progress_bar_enabled?: boolean;
}

export interface RawIntegrationData {
    id: Snowflake;
    name: string;
    type: IntegrationType;
    enabled: boolean;
    syncing?: boolean;
    role_id?: Snowflake;
    enable_emoticoins?: boolean;
    expire_behavior?: IntegrationExpireBehaviors;
    expire_grace_period?: number;
    user?: RawDiscordAPIUserData;
    account: IntegrationAccountData;
    synced_at?: number;
    subscriber_count?: number;
    revoked?: boolean;
    application: IntegrationApplicationData;
    scopes?: Array<string>;
}

export interface IntegrationApplicationData {
    id: Snowflake;
    name: string;
    icon?: string;
    description: string;
    user: RawDiscordAPIUserData;
}

export interface IntegrationAccountData {
    id: Snowflake;
    name: string;
}

export enum IntegrationExpireBehaviors {
    RemoveRole,
    Kick
}

export enum IntegrationType {
    Twitch = "twitch",
    Youtube = "youtube",
    Discord = "discord",
    GuildSubscription = "guild_subscription"
}

export type GuildMemberResolvable = UserResolvable | GuildMember;

export interface RawGuildPreview extends RawDiscordAPIGuildPreviewData {
    creation_timestamp: number;
    creation_date: Date;
}

export interface RawDiscordAPIGuildPreviewData {
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
}

export interface GuildTemplateData {
    code: string;
    name: string;
    description?: string;
    usage_count: number;
    creator_id: Snowflake;
    creator: RawDiscordAPIUserData;
    created_at: number;
    updated_at: number;
    source_guild_id: Snowflake;
    serialized_source_guild: Partial<Omit<RawGuild, "creation_timestamp" | "creation_date">>;
    is_dirty?: boolean;  
}

export enum GuildVerificationLevels {
    None,
    Low,
    Medium,
    High,
    VeryHigh
}

export enum ExplicitContentFilterLevels {
    Disabled,
    MembersWithoutRoles,
    AllMembers
}

export interface RawGuildEmoji {
    id?: Snowflake;
    name: string;
    roles?: Array<Snowflake>;
    user?: RawDiscordAPIUserData;
    require_colons?: boolean;
    managed?: boolean;
    animated?: boolean;
    available?: boolean;
}

export interface RawSticker {
    id: Snowflake;
    pack_id?: Snowflake;
    name: string;
    description?: string;
    tags: string;
    asset?: string;
    type: StickerTypes;
    format_type: StickerFormatTypes;
    available?: boolean;
    guild_id?: Snowflake;
    user?: RawDiscordAPIUserData;
    sort_value?: number;
}

export interface GuildStickerEditOptions {
    name?: string;
    description?: string;
    tags?: string;
}

export interface GuildStickerCreateOptions extends Required<GuildStickerEditOptions> {
    file: string;
    reason?: string;
}

export type StickerResolvable = Sticker | Snowflake;

export interface StickerItemData {
    id: Snowflake;
    name: string;
    type: StickerFormatTypes;
}

export enum StickerFormatTypes {
    PNG = 1,
    APNG,
    LOTTIE,
    GIF
}

export enum StickerTypes {
    Standard = 1,
    Guild
}

export enum GuildPremiumTier {
    None,
    Tier1,
    Tier2,
    Tier3
}

export interface GuildWelcomeScreenData {
    description?: string;
    welcome_channels?: Array<RawWelcomeScreenChannel>;
}

export enum GuildNSFWLevels {
    Default,
    Explicit,
    Safe,
    AgeRestricted
}

export interface GuildOnboardingData {
    guild_id: Snowflake;
    prompts: Array<object>;
    default_channel_ids: Array<Snowflake>;
    enabled: boolean;
}

export interface GuildOnboardingPromptData {
    id: Snowflake;
    type: OnboardingPromptType;
    options?: Array<GuildOnboardingPromptOption>;
    title: string;
    single_select: boolean;
    required: boolean;
    is_onboarding: boolean;
}

export interface GuildOnboardingPromptOption {
    id: Snowflake;
    channel_ids: Array<Snowflake>;
    role_ids: Array<Snowflake>;
    emoji: RawGuildEmoji;
    title: string;
    description?: string;
}

export enum OnboardingPromptType {
    MultipleChoice,
    Dropdown
}

export interface GuildAuditLogData {
    application_commands: Array<ApplicationCommandData>;
    audit_log_entries: Array<GuildAuditLogEntryData>;
    auto_moderation_rules: Array<AutoModerationRuleData>;
    guild_scheduled_events: Array<GuildScheduledEvent>;
    integrations: Array<Partial<RawIntegrationData>>;
    threads: Array</* TODO, channel object */>;
    users: Array<RawDiscordAPIUserData>;
    webhooks: Array<RawDiscordAPIWebhookData>;9
}

export interface GuildAuditLogsFetchOptions {
    user_id?: Snowflake;
    action_type?: GuildAuditLogActionType;
    before?: Snowflake;
    after?: Snowflake;
    limit?: number;
}

export interface GuildScheduledEvent {
    id: Snowflake;
    guild_id: Snowflake;
    channel_id?: Snowflake;
    creator_id?: Snowflake;
    name: string;
    description?: string;
    scheduled_start_time: number;
    scheduled_end_time?: number;
    privacy_level: GuildScheduledEventPrivacyLevel;
    status: GuildScheduledEventStatus;
    entity_type: GuildScheduledEventEntityTypes;
    entity_id?: Snowflake;
    entity_metadata?: GuildScheduledEventEntityMetadata;
    creator?: RawDiscordAPIUserData;
    user_count?: number;
    image?: string;
}

export interface RawGuildScheduledEventUserData {
    guild_scheduled_event_id: Snowflake;
    user: RawDiscordAPIUserData;
    member?: GuildMemberData;
}

export type GuildScheduledEventResolvable = Snowflake | GuildScheduledEventClass;

export interface GuildScheduledEventUserData {
    guild_scheduled_event_id: Snowflake;
    user: User;
    member?: GuildMember;
}

export interface FetchGuildScheduledEventUsersOptions {
    limit?: number;
    with_member?: boolean;
    before?: Snowflake;
    after?: Snowflake;
}

export type GuildScheduledEventEditOptions = Partial<Omit<GuildScheduledEvent, "id" | "guild_id" | "creator" | "creator_id" | "user_count" | "entity_id">>;
export type GuildScheduledEventCreateOptions = GuildScheduledEventEditOptions;

export interface GuildScheduledEventEntityMetadata {
    location?: string;
}

export enum GuildScheduledEventEntityTypes {
    StageInstance = 1,
    Voice,
    External
}

export enum GuildScheduledEventStatus {
    Scheduled = 1,
    Active,
    Completed,
    Canceled
}

export enum GuildScheduledEventPrivacyLevel {
    GuildOnly = 2
}

export enum AutoModerationRuleKeywordPresetTypes {
    Profanity = 1,
    SexualContent,
    Slurs
}

export interface AutoModerationRuleData {
    id: Snowflake;
    guild_id: Snowflake;
    name: string;
    creator_id: Snowflake;
    event_type: AutoModerationRuleEventType;
    trigger_type: AutoModerationRuleTriggerType;
    trigger_metadata: AutoModerationRuleTriggerMetadata;
    actions: Array<AutoModerationActionData>;
    enabled: boolean;
    exempt_roles: Array<Snowflake>;
    exempt_channels: Array<Snowflake>;
}

export interface AutoModerationActionData {
    type: AutoModerationActionType;
    metadata: AutoModerationActionMetadata;
}

export interface AutoModerationActionMetadata {
    channel_id: Snowflake;
    duration_seconds: number;
    custom_message?: string;
}

export enum AutoModerationActionType {
    BlockMessage = 1,
    SendAlertMessage,
    Timeout
}

export interface AutoModerationRuleTriggerMetadata {
    keyword_filter: Array<string>;
    regex_patterns: Array<string>;
    presets: Array<AutoModerationRuleKeywordPresetTypes>;
    allow_list: Array<string>;
    mention_total_list: number;
}

export enum AutoModerationRuleTriggerType {
    Keyword = 1,
    Spam = 3,
    KeywordPresent,
    MentionSpam
}

export enum AutoModerationRuleEventType {
    MessageSend = 1
}

export interface GuildAuditLogEntryData {
    target_id?: string;
    changes?: Array<GuildAuditLogChangeData>;
    user_id?: Snowflake;
    id: Snowflake;
    action_type: GuildAuditLogActionType;
    options?: Array<OptionalGuildAuditLogEntryInfoData>;
    reason?: string;
}

export interface OptionalGuildAuditLogEntryInfoData {
    application_id: Snowflake;
    auto_moderation_rule_name: string;
    auto_moderation_rule_trigger_type: string;
    channel_id: Snowflake;
    count: string;
    delete_member_days: string;
    id: Snowflake;
    members_removed: string;
    message_id: Snowflake;
    role_name: string;
    type: string;
}

export interface GuildAuditLogChangeData {
    new_value?: object;
    old_value?: object;
    key: string;
}

export type GuildResolvable = Snowflake | Guild;

export interface FetchGuildOptions {
    with_counts?: number;
    guild: GuildResolvable;
}

export interface GuildMemberData {
    user?: RawDiscordAPIUserData;
    nick?: string;
    avatar?: string;
    roles: Array<Snowflake>;
    joined_at: number;
    premium_since?: number;
    deaf: boolean;
    mute: boolean;
    flags: GuildMemberFlags;
    pending?: boolean;
    permissions?: string;
    communication_disabled_until?: number;
}

export interface GuildListMembersOptions {
    limit?: number;
    after?: Snowflake;
    cache?: boolean;
}

export interface AddGuildMemberOptions {
    acess_token: string;
    nick?: string;
    roles?: Snowflake[];
    mute?: boolean;
    deaf?: boolean;
}

export interface GuildPruneMembersOptions {
    days?: number;
    compute_prune_count?: boolean;
    include_roles?: (Snowflake | Role)[];
    reason?: string;
}

export interface GuildSearchMembersOptions {
    query: string;
    limit?: number;
    cache?: boolean;
}

export interface BanOptions {
    delete_message_seconds?: number;
    reason?: string;
}

export interface GuildMemberEditOptions {
    nick?: string;
    roles?: Array<Snowflake>;
    mute?: boolean;
    deaf?: boolean;
    channel_id?: Snowflake;
    communication_disabled_until?: string | null;
    flags?: GuildMemberFlags;
    reason?: string;
}

export enum GuildMemberFlags {
    DidRejoin = 1 << 0,
    CompletedOnboarding = 1 << 1,
    BypassesVerification = 1 << 2,
    StartedOnboarding = 1 << 3
}

export enum GuildAuditLogActionType {
    GuildUpdate = 1,
    ChannelCreate = 10,
    ChannelUpdate,
    ChannelDelete,
    ChannelOverwriteCreate,
    ChannelOverwriteUpdate,
    ChannelOverwriteDelete,
    MemberKick = 20,
    MemberPrune,
    MemberBanAdd,
    MemberBanRemove,
    MemberUpdate,
    MemberRoleUpdate,
    MemberMove,
    MemberDisconnect,
    BotAdd,
    RoleCreate = 30,
    RoleUpdate,
    RoleDelete,
    InviteCreate = 40,
    InviteUpdate,
    InviteDelete,
    WebhookCreate = 50,
    WebhookUpdate,
    WebhookDelete,
    EmojiCreate = 60,
    EmojiUpdate,
    EmojiDelete,
    MessageDelete = 72,
    MessageBulkDelete,
    MessagePin,
    MessageUnpin,
    IntergrationCreate = 80,
    IntergrationUpdate,
    IntergrationDelete,
    StageInstanceCreate,
    StageInstanceUpdate,
    StageInstanceDelete,
    StickerCreate = 90,
    StickerUpdate,
    StickerDelete,
    GuildScheduledEventCreate = 100,
    GuildScheduledEventUpdate,
    GuildScheduledEventDelete,
    ThreadCreate = 110,
    ThreadUpdate,
    ThreadDelete,
    ApplicationCommandPermissionUpdate = 121,
    AutoModerationRuleCreate = 140,
    AutoModerationRuleUpdate,
    AutoModerationRuleDelete,
    AutoModerationBlockMessage,
    AutoModerationFlagToChannel,
    AutoModerationUserCommunicationDisabled
}

export interface RawGuildBanData {
    reason?: string;
    user: RawDiscordAPIUserData;
}

export interface UnavailableGuildData {
    id: Snowflake;
    unavailable: true;
}