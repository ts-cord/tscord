import { Snowflake } from "./Snowflake";
import { Guild } from "../structures/Guild";
import type { AttachmentData } from "./misc";
import type { MessageComponentData, MessageFlags, MessageInteractionData } from "./interaction";
import type { RawApplication, RawDiscordAPIUserData, RawGuildEmoji, RawSticker, StickerFormatTypes, StickerItemData } from ".";
import { Message } from "../structures/Message";

export interface BasicChannelData {
    id: Snowflake;
    type: ChannelTypes;
    flags: ChannelFlags;
    creation_timestamp: number;
    creation_date: Date;
};

export enum ChannelTypes {
    GuildText,
    DM,
    GuildVoice,
    GroupDM,
    GuildCategory,
    GuildAnnouncement,
    AnnouncementThread = 10,
    PublicThread,
    PrivateThread,
    GuildStageVoice,
    GuildDirectory,
    GuildForum
};

export interface GuildChannelData extends BasicChannelData {
    guild_id: Snowflake;
    position: number;
    permission_overwrites: Array<OverwriteData>;
    name: string;
    parent_id: Snowflake | undefined;
};

export type MessageResolvable = Snowflake | Message;

export interface RawDiscordAPIChannelData extends Omit<BasicChannelData, 'creationTimestamp' | 'creationDate'> {
    guild_id?: Snowflake;
    position?: number;
    permission_overwrites?: Array<OverwriteData>;
    name?: string;
    topic?: string;
    nsfw?: boolean;
    last_message_id?: Snowflake;
    bitrate?: number;
    user_limit?: number;
    rate_limit_per_user?: number;
    recipients?: Array<RawDiscordAPIUserData>;
    icon?: string;
    owner_id?: Snowflake;
    application_id?: Snowflake;
    managed?: boolean;
    parent_id?: Snowflake;
    last_pin_timestamp?: string;
    rtc_region?: string;
    video_quality_mode?: number;
    message_count?: number;
    member_count?: number;
    thread_metadata?: ThreadMetadata;
    member?: RawThreadMemberData;
    default_auto_archive_duration?: number;
    permissions?: string;
    total_message_sent?: number;
    available_tags?: Array<ForumChannelTagData>;
    applied_tags?: Array<string>;
    default_reaction_emoji?: DefaultReactionData;
    default_thread_rate_limit_per_user?: number;
    default_order_sorter: SortOrderTypes;
    default_forum_layout?: ForumLayoutTypes;
};

export enum ForumLayoutTypes {
    NotSet,
    ListView,
    GalleryView
};

export enum SortOrderTypes {
    LatestActivity,
    CreationDate
};

export interface DefaultReactionData {
    emoji_id?: string;
    emoji_name?: string;
};

export interface ForumChannelTagData {
    id: Snowflake;
    name: string;
    moderated: boolean;
    emoji_id?: string;
    emoji_name?: string;
};

export interface RawThreadMemberData {
    id?: Snowflake;
    user_id?: Snowflake;
    join_timestamp?: string;
    flags: number;
    member?: object //do later
};

export interface ThreadMetadata {
    archived: boolean;
    auto_archive_duration: number;
    archive_timestamp: string;
    locked: boolean;
    invitable?: boolean;
    create_timestamp?: string;
};

export interface VoiceRegionData {
    id: string;
    name: string;
    optimal: boolean;
    deprecated: boolean;
    custom: boolean;
};

export interface OverwriteData {
    id: Snowflake;
    type: OverwriteTypes;
    allow: string;
    deny: string;
};

export enum OverwriteTypes {
    Role,
    Member
};

export interface DMChannelData extends BasicChannelData {
    last_message_id?: Snowflake;
};

export enum ChannelFlags {
    Pinned = 1 << 1,
    RequireTag = 1 << 4
};

export enum SystemChannelFlags {
    SuppressJoinNotifications = 1 << 0,
    SuppressPremiumSubscriptions = 1 << 1,
    SuppressGuildReminderNotifications = 1 << 2,
    SuppressJoinNotificationsReplies = 1 << 3,
    SuppressRoleSubscriptionPurchaseNotifications = 1 << 4,
    SuppressRoleSubscriptionPurchaseNotificationReplies = 1 << 5
};

export enum DefaultMessageNotificationLevel {
    AllMessages,
    OnlyMention
};

export interface RawWelcomeScreenChannel {
    channel_id: Snowflake;
    description: string;
    emoji_id?: Snowflake;
    emoji_name?: string;
};

export interface CreateMessageOptions {
    content?: string;
    nonce?: string | number;
    tts?: boolean;
    embeds?: Array<EmbedData>;
    allowed_mentions?: AllowedMentionOptions;
    message_reference?: MessageReferenceOptions;
    components?: Array<MessageComponentData>;
    stickers_id?: Array<Snowflake>;
    attachments?: Array<Pick<AttachmentData, 'filename' | 'description'>>;
    flags?: MessageFlags
};

export interface MessageReferenceOptions {
    message_id?: Snowflake;
    channel_id?: Snowflake;
    guild_id?: Snowflake;
    fail_if_not_exists?: boolean;
};

export enum AllowedMentionTypes {
    RoleMentions = 'roles',
    UserMentions = 'users',
    EveryoneMentions = 'everyone'
};

export interface AllowedMentionOptions {
    parse?: Array<AllowedMentionTypes>;
    roles?: Array<Snowflake>;
    users?: Array<Snowflake>;
    replied_user?: boolean;
};

export interface EmbedData {
    title?: string;
    type?: EmbedTypes;
    description?: string;
    url?: string;
    timestamp?: number;
    color?: number;
    footer?: EmbedFooterData;
    image?: EmbedImageData;
    thumbnail?: EmbedThumbnailData;
    video?: EmbedVideoData;
    provider?: EmbedProviderData;
    author?: EmbedAuthorData;
    fields?: Array<EmbedFieldData>;
};

export interface EmbedFieldData {
    name: string;
    value: string;
    inline?: boolean;
};

export interface EmbedFooterData {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
};

export interface EmbedVideoData extends EmbedGenericsData { };
export interface EmbedImageData extends EmbedGenericsData { };
export interface EmbedThumbnailData extends EmbedGenericsData { };

export interface EmbedAuthorData {
    name: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
};

export enum EmbedTypes {
    Rich = 'rich',
    Image = 'image',
    Video = 'video',
    Gifv = 'gifv',
    Article = 'article',
    Link = 'link'
};

export interface EmbedProviderData {
    name?: string;
    url?: string;
};

export interface EmbedGenericsData {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
};

export interface BasicMessageOptions {
    content?: string;
    embeds?: Array<EmbedData>;
    allowed_mentions?: AllowedMentionOptions;
    files?: Array<AttachmentData>;
    components?: Array<MessageComponentData>
};

export interface RawDiscordAPIMessageData {
    id: Snowflake;
    channel_id: Snowflake;
    author: RawDiscordAPIUserData;
    content?: string;
    timestamp: number;
    edited_timestmap?: number;
    tts: boolean;
    mention_everyone: boolean;
    mentions: Array<RawDiscordAPIUserData>;
    mention_roles: Array<Snowflake>;
    mention_channels?: Array<ChannelMentionData>;
    attachments: Array<AttachmentData>;
    embeds: Array<EmbedData>;
    reactions?: Array<ReactionData>;
    nonce?: string | number;
    pinned: boolean;
    webhook_id?: string;
    type: MessageTypes;
    activity?: MessageActivity;
    application?: Partial<RawApplication>;
    application_id?: Snowflake;
    message_reference?: MessageReferenceOptions;
    flags?: MessageFlags;
    referenced_message?: RawDiscordAPIMessageData;
    interaction?: MessageInteractionData;
    thread?: RawDiscordAPIChannelData;
    components?: Array<MessageComponentData>;
    sticker_items?: Array<StickerItemData>;
    stickers?: Array<RawSticker>;
    position?: number;
    role_subscription_data?: RoleSubscriptionData;
};

export interface StartThreadOptions {
    name: string;
    auto_archive_duration?: number;
    rate_limit_per_user?: number;
};

export type EmojiResolvable = string;

export interface RoleSubscriptionData {
    role_subscription_listing_id: Snowflake;
    tier_name: string;
    total_months_subscribed: number;
    is_renewal: boolean;
};

export interface MessageActivity {
    type: MessageActivityTypes;
    party_id?: string;  
};

export enum MessageActivityTypes {
    Join = 1,
    Spectate,
    Listen,
    JoinRequest
};

export enum MessageTypes {
    Default,
    RecipientAdd,
    RecipientRemove,
    Call,
    ChannelNameChange,
    ChannelIconChange,
    ChannelPinnedMessage,
    UserJoin,
    GuildBoost,
    GuildBoostTierOne,
    GuildBoostTierTwo,
    GuildBoostTierThree,
    ChannelFollowAdd,
    GuildDiscoveryDisqualified = 14,
    GuildDiscoveryRequalified,
    GuildDiscorveryGracePeriodInitialWarning,
    GuildDiscorveryGracePeriodFinalWarning,
    ThreadCreated,
    Reply,
    SlashCommand,
    ThreadStarterMessage,
    GuildInviteReminder,
    ContextMenuCommand,
    AutoModerationAction,
    RoleSubscriptionPurchase,
    InteractionPremiumUpsell,
    StaeStart,
    StageEnd,
    StageSpeaker,
    StageTopic = 31,
    GuildApplicationPremiumSubscription
};

export interface ReactionData {
    count: number;
    me: boolean;
    emoji: Partial<RawGuildEmoji>;
};

export interface ChannelMentionData {
    id: Snowflake;
    guild_id: Snowflake;
    type: ChannelTypes;
    name: string;
};

export interface GuildChannelEditOptions {
    name?: string;
    type?: ChannelTypes;
    position?: number;
    topic?: string;
    nsfw?: boolean;
    rate_limit_per_user?: number;
    bitrate?: number;
    user_limit?: number;
    permission_overwrites?: Array<Partial<OverwriteData>>;
    parent_id?: Snowflake;
    rtc_region?: string;
    video_quality_mode?: number;
    default_auto_archive_duration?: number;
    flags?: ChannelFlags;
    available_tags?: Array<ForumChannelTagData>;
    default_reaction_emoji?: DefaultReactionData;
    default_thread_rate_limit_per_user?: number;
    default_sort_order?: SortOrderTypes;
    default_forum_layout?: ForumLayoutTypes;
};