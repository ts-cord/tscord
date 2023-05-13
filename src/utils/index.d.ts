import * as errors from '../constants/errors.json';

declare class TypeCordError<T extends boolean = true> extends Error {
    constructor(message: T extends true ? keyof typeof errors : string, options?: ErrorOptions);

    toString(): string;
    toJSON(): { name: string; message: string; stack?: string; options?: ErrorOptions; };
    log(): void;
};

declare class TypeCordRangeError extends RangeError {
    constructor(message: string, options?: ErrorOptions);

    toString(): string
    toJSON(): { name: string; message: string; stack?: string; options?: ErrorOptions };
    log(): void;
};

declare class Group<K, V> extends Map<K, V> {
    find(func: (value: V, index: number, obj: V[]) => unknown): V | undefined;
    map(func: (value: [K, V], index: number, array: [K, V][]) => unknown): unknown[];
    filter(func: (value: V, index: number, array: V[]) => value is V): V[];
    every(func: (value: V, index: number, array: V[]) => value is V): this is V[];
    some(func: (value: V, index: number, array: V[]) => unknown): boolean;
    toArray<T extends boolean = true>(groupKeyAndValue?: T): T extends true ? [K, V][] : V[];
    toJSON(): { [k: string]: V };
    at(index: number): V | undefined;
    reduce(callbackfn: (previousValue: V, currentValue: V, currentIndex: number, array: V[]) => V): V;
    hasAll(...keys: K[]): boolean;
    hasAny(...keys: K[]): boolean;
    first<T extends number | undefined>(amount: number = 1): T extends undefined ? V : { [key: string]: V; };
    last<T extends number | undefined = this['size']>(amount: number = this.size): T extends undefined ? V : { [key: string]: V; };
    merge(group: Group<K, V> | Map<K, V>): this;
    get random(): V;
    get empty(): boolean;
    findIndex(predicate: (value: V, index: number, obj: V[]) => unknown): V;
    reduceRight(callbackfn: (previousValue: V, currentValue: V, currentIndex: number, array: V[]) => V): V;
    get randomKey(): K;
    sort(compareFunction?: ((a: V, b: V) => number) | undefined): V[];
    reverse(): V[];
    get clone(): Group<K, V>;
    mapValues<U>(callbackfn: (value: V, index: number, array: V[]) => U, thisArg?: any): U[];
};

declare const CndURL: string = "https://cdn.discordapp.com";

declare const ChannelWebhooks = (channelId: Snowflake): string => `/channels/${channelId}/webhooks`;
declare const GuildWebhooks = (guildId: Snowflake): string => `/guilds/${guildId}/webhooks`;
declare const Webhook = (webhookId: Snowflake, webhookToken?: string): string => (webhookToken ? `/webhooks/${webhookId}/${webhookToken}` : `/webhooks/${webhookId}`) as `/webhooks/${string}` | `/webhooks/${string}/${string}`;
declare const WebhookMessage = (webhookId: Snowflake, webhookToken: string, messageId: Snowflake): string => `/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`;
declare const WebhookPlatform = (webhookId: Snowflake, webhookToken: string, platform: "github" | "slack"): string => `/webhooks/${webhookId}/${webhookToken}/${platform}`;

declare const Guild = (guildId: Snowflake): string => `/guilds/${guildId}`;
declare const Guilds = "/guilds";
declare const GuildBans = (guildId: Snowflake): string => `/guilds/${guildId}/bans`;
declare const GuildBan = (guildId: Snowflake, userId: Snowflake): string => `/guilds/${guildId}/bans/${userId}`;
declare const GuildAutomodRule = (guildId: Snowflake, autoModerationRuleId: Snowflake): string => `/guilds/${guildId}/auto-moderation/rules/${autoModerationRuleId}`;
declare const GuildAutomodRules = (guildId: Snowflake): string => `/guilds/${guildId}/auto-moderation/rules`;
declare const GuildEmoji = (guildId: Snowflake, emojiId: Snowflake): string => `/guilds/${guildId}/emojis/${emojiId}`;
declare const GuildEmojis = (guildId: Snowflake): string => `/guilds/${guildId}/emojis`;
declare const GuildAuditLog = (guildId: Snowflake): string => `/guilds/${guildId}/audit-logs`;
declare const GuildScheduledEvent = (guildId: Snowflake, eventId: Snowflake): string => `/guilds/${guildId}/scheduled-events/${eventId}`;
declare const GuildScheduledEvents = (guildId: Snowflake): string => `/guilds/${guildId}/scheduled-events`;
declare const GuildScheduledEventsUsers = (guildId: Snowflake, eventId: Snowflake): string => `/guilds/${guildId}/scheduled-events/${eventId}/users`;
declare const GuildTemplateCode = (code: string): string => `/guilds/templates/${code}`;
declare const GuildTemplate = (guildId: Snowflake, templateId: Snowflake): string => `/guilds/${guildId}/templates/${templateId}`;
declare const GuildTemplates = (guildId: Snowflake): string => `/guilds/${guildId}/templates`;
declare const GuildPreview = (guildId: Snowflake): string => `/guilds/${guildId}/preview`;
declare const GuildChannels = (guildId: Snowflake): string => `/guilds/${guildId}/channels`;
declare const GuildActiveThreads = (guildId: Snowflake): string => `/guilds/${guildId}/threads/active`;
declare const GuildMembers = (guildId: Snowflake): string => `/guilds/${guildId}/members`;
declare const GuildMember = (guildId: Snowflake, userId: Snowflake): string => `/guilds/${guildId}/members/${userId}`;
declare const GuildSearchMembers = (guildId: Snowflake): string => `/guilds/${guildId}/members/search`;
declare const GuildMemberRole = (guildId: Snowflake, userId: Snowflake, roleId: Snowflake): string => `/guilds/${guildId}/members/${userId}/roles/${roleId}`;
declare const GuildRoles = (guildId: Snowflake): string => `/guilds/${guildId}/roles`;
declare const GuildRole = (guildId: Snowflake, roleId: Snowflake): string => `/guilds/${guildId}/roles/${roleId}`;
declare const GuildMFA = (guildId: Snowflake): string => `/guilds/${guildId}/mfa`;
declare const GuildPrune = (guildId: Snowflake): string => `/guilds/${guildId}/prune`;
declare const GuildInvites = (guildId: Snowflake): string => `/guilds/${guildId}/invites`;
declare const GuildIntegration = (guildId: Snowflake, integrationId: Snowflake): string => `/guilds/${guildId}/integrations/${integrationId}`;
declare const GuildIntegrations = (guildId: Snowflake): string => `/guilds/${guildId}/integrations`;
declare const GuildWidget = (guildId: Snowflake): string => `/guilds/${guildId}/widget`;
declare const GuildVanityURL = (guildId: Snowflake): string => `/guilds/${guildId}/vanity-url`;
declare const GuildWidgetImage = (guildId: Snowflake): string => `/guilds/${guildId}/wIdget.png`;
declare const GuildWidgetJSON = (guildId: Snowflake): string => `/guilds/${guildId}/wIdget.json`;
declare const GuildWelcomeScreen = (guildId: Snowflake): string => `/guilds/${guildId}/welcome-screen`;
declare const GuildVoiceState = (guildId: Snowflake, userId: Snowflake): string => `/guilds/${guildId}/voice-states/${userId}`;
declare const GuildSticker = (guildId: Snowflake, stickerId: Snowflake): string => `/guilds/${guildId}/stickers/${stickerId}`;
declare const GuildStickers = (guildId: Snowflake): string => `/guilds/${guildId}/stickers`;
declare const GuildOnboarding = (guildId: Snowflake): string => `/guilds/${guildId}/onboarding`;

declare const Channel = (channelId: Snowflake): string => `/channels/${channelId}`;
declare const ChannelBulkDeleteMessages = (channelId: Snowflake): string => `/channels/${channelId}/messages/bulk-delete`;
declare const ChannelFollowers = (channelId: Snowflake): string => `/channels/${channelId}/followers`;
declare const ChannelInvites = (channelId: Snowflake): string => `/channels/${channelId}/invites`;
declare const ChannelJoinedPrivateArchivedThreads = (channelId: Snowflake): string => `/channels/${channelId}/users/@me/threads/archived/private`;
declare const ChannelMessage = (channelId: Snowflake, messageId: Snowflake): string => `/channels/${channelId}/messages/${messageId}`;
declare const ChannelMessages = (channelId: Snowflake): string => `/channels/${channelId}/messages`;
declare const ChannelMessageCrosspost = (channelId: Snowflake, messageId: Snowflake): string => `/channels/${channelId}/messages/${messageId}/crosspost`;
declare const ChannelMessageThreads = (channelId: Snowflake, messageId: Snowflake): string => `/channels/${channelId}/messages/${messageId}/threads`;
declare const ChannelPermission = (channelId: Snowflake, overwriteId: Snowflake): string => `/channels/${channelId}/permissions/${overwriteId}`;
declare const ChannelPermissions = (channelId: Snowflake): string => `/channels/${channelId}/permissions`;
declare const ChannelPinnedMessage = (channelId: Snowflake, messageId: Snowflake): string => `/channels/${channelId}/pins/${messageId}`;
declare const ChannelPins = (channelId: Snowflake): string => `/channels/${channelId}/pins`;
declare const ChannelPrivateArchivedThreads = (channelId: Snowflake): string => `/channels/${channelId}/threads/archived/private`;
declare const ChannelPublicArchivedThreads = (channelId: Snowflake): string => `/channels/${channelId}/threads/archived/public`;
declare const ChannelReaction = (channelId: Snowflake, messageId: Snowflake, reaction: string): string => `/channels/${channelId}/messages/${messageId}/reactions/${reaction}`;
declare const ChannelReactions = (channelId: Snowflake, messageId: Snowflake): string => `/channels/${channelId}/messages/${messageId}/reactions`;
declare const ChannelReactionsUser = (channelId: Snowflake, messageId: Snowflake, reaction: string, user: string): string => `/channels/${channelId}/messages/${messageId}/reactions/${reaction}/${user}`;
declare const ChannelThreads = (channelId: Snowflake): string => `/channels/${channelId}/threads`;
declare const ChannelThreadsMember = (channelId: Snowflake, userId: Snowflake): string => `/channels/${channelId}/thread-members/${userId}`;
declare const ChannelThreadsMembers = (channelId: Snowflake): string => `/channels/${channelId}/thread-members`;
declare const ChannelTyping = (channelId: Snowflake): string => `/channels/${channelId}/typing`;
declare const GroupRecipient = (channelId: Snowflake, userId: Snowflake): string => `/channels/${channelId}/recipients/${userId}`;
declare const VoiceRegions: string = "/voice/regions";
declare const GuildVoiceRegions = (guildId: Snowflake): string => `/guilds/${guildId}/regions`;

declare const OauthApplication: string = "/oauth2/applications/@me";
declare const OauthAuthorize: string = "/oauth2/authorize";
declare const OauthInfo: string = "/oauth2/@me";
declare const OauthCurrentUser: string = "/users/@me";
declare const OauthChannels: string = "/users/@me/channels";
declare const OauthConnections: string = "/users/@me/connections";
declare const OauthGuild = (guildId: Snowflake): string => `/users/@me/guilds/${guildId}`;
declare const OauthGuildMember = (guildId: Snowflake): string => `${OauthGuild(guildId)}/member`;
declare const OauthGuilds: string = "/users/@me/guilds";
declare const OauthToken: string = "/oauth2/token";
declare const OauthTokenRevoke: string = "/oauth2/token/revoke";
declare const OauthRoleConnection = (applicationId: Snowflake): string => `/users/@me/applications/${applicationId}/role-connection`;

declare const AchievementIcon = (applicationId: Snowflake, achievementId: Snowflake, hash: string): string => `/app-assets/${applicationId}/achievements/${achievementId}/icons/${hash}`;
declare const ApplicationAsset = (applicationId: Snowflake, assetId: Snowflake): string => `/applications/${applicationId}/assets/${assetId}`;
declare const ApplicationCover = (applicationId: Snowflake, hash: string): string => `/app-icons/${applicationId}/${hash}`;
declare const ApplicationIcon: (applicationId: Snowflake, hash: string) => string = ApplicationCover;
declare const Banner = (guildOrUserId: Snowflake, hash: string): string => `/banners/${guildOrUserId}/${hash}`;
declare const CustomEmoji = (emojiId: Snowflake): string => `/emojis/${emojiId}`;
declare const EmbedAvatar = (mod: number): string => `/embed/avatars/${mod}`;
declare const GuildAvatar = (guildId: Snowflake, userId: Snowflake, hash: string): string => `/guilds/${guildId}/users/${userId}/avatars/${hash}`;
declare const GuildDiscoverySplash = (guildId: Snowflake, hash: string): string => `/guilds/${guildId}/splashes/${hash}`;
declare const GuildIcon = (guildId: Snowflake, hash: string): string => `/icons/${guildId}/${hash}`;
declare const GuildScheduledEventCover = (eventId: Snowflake, hash: string): string => `/guild-events/${eventId}/${hash}`;
declare const GuildSplash = (guildId: Snowflake, hash: string): string => `/splashes/${guildId}/${hash}`;
declare const MemberBanner = (guildId: Snowflake, userId: Snowflake, hash: string): string => `/guilds/${guildId}/users/${userId}/banners/${hash}`;
declare const RoleIcon = (roleId: Snowflake, hash: string): string => `/role-icons/${roleId}/${hash}`;
declare const Sticker = (stickerId: Snowflake): string => `/stickers/${stickerId}`;
declare const StickerPackBanner = (assetId: Snowflake): string => ApplicationAsset("710982414301790216", assetId);
declare const TeamIcon = (teamId: Snowflake, hash: string): string => `/team-icons/${teamId}/${hash}`;
declare const UserAvatar = (userId: Snowflake, hash: string): string => `/avatars/${userId}/${hash}`;
declare const UserAvatarDecoration = (userId: Snowflake, hash: string): string => `/avatar-decorations/${userId}/${hash}`;

declare const ApplicationCommand = (applicationId: Snowflake, commandId: Snowflake): string => `/applications/${applicationId}/commands/${commandId}`;
declare const ApplicationCommands = (applicationId: Snowflake): string => `/applications/${applicationId}/commands`;
declare const GuildApplicationCommand = (applicationId: Snowflake, guildId: Snowflake, commandId: Snowflake): string => `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`;
declare const GuildApplicationCommands = (applicationId: Snowflake, guildId: Snowflake): string => `/applications/${applicationId}/guilds/${guildId}/commands`;
declare const GuildApplicationCommandPermission = (applicationId: Snowflake, guildId: Snowflake, commandId: Snowflake): string => `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`;
declare const GuildApplicationCommandPermissions = (applicationId: Snowflake, guildId: Snowflake): string => `/applications/${applicationId}/guilds/${guildId}commands/permissions`;
declare const InteractionCallback = (interactionId: Snowflake, interactionToken: string): string => `/interactions/${interactionId}/${interactionToken}/callback`;

declare const Gateway: string = "/gateway";
declare const GatewayBot: string = "/gateway/bot";
declare const User = (userId: Snowflake): string => `/users/${userId}`;
declare const MessageLink = (guildId: Snowflake, channelId: Snowflake, messageId: Snowflake): string => `/channels/${guildId}/${channelId}/${messageId}`;
declare const NitroStickerPacks: string = "/sticker-packs";
declare const Inviter = (code: string): string => `/invites/${code}`;
declare const StageInstances: string = "/stage-instances";
declare const StageInstance = (channelId: Snowflake): string => `/stage-instances/${channelId}`;
declare const RoleConnectionMetadata = (applicationId: Snowflake): string => `/applications/${applicationId}/role-connections/metadata`;
declare const Application: string;