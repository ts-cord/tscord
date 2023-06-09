import { Snowflake } from "../types/Snowflake";

// Image Base URL

export const CndURL = "https://cdn.discordapp.com";

// Webhooks

export const ChannelWebhooks: (channelId: Snowflake) => string = (channelId: Snowflake): string => `/channels/${channelId}/webhooks`;
export const GuildWebhooks: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/webhooks`;
export const Webhook: (webhookId: Snowflake, webhookToken?: string) => string = (webhookId: Snowflake, webhookToken?: string): string => (webhookToken ? `/webhooks/${webhookId}/${webhookToken}` : `/webhooks/${webhookId}`) as `/webhooks/${string}` | `/webhooks/${string}/${string}`;
export const WebhookMessage: (webhookId: Snowflake, webhookToken: string, messageId: Snowflake) => string = (webhookId: Snowflake, webhookToken: string, messageId: Snowflake): string => `/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`;
export const WebhookPlatform: (webhookId: Snowflake, webhookToken: string, platform: "github" | "slack") => string = (webhookId: Snowflake, webhookToken: string, platform: "github" | "slack"): string => `/webhooks/${webhookId}/${webhookToken}/${platform}`;

// Guilds

export const Guild: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}`;
export const Guilds = "/guilds";
export const GuildBans: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/bans`;
export const GuildBan: (guildId: Snowflake, userId: Snowflake) => string = (guildId: Snowflake, userId: Snowflake): string => `/guilds/${guildId}/bans/${userId}`;
export const GuildAutomodRule: (guildId: Snowflake, autoModerationRuleId: Snowflake) => string = (guildId: Snowflake, autoModerationRuleId: Snowflake): string => `/guilds/${guildId}/auto-moderation/rules/${autoModerationRuleId}`;
export const GuildAutomodRules: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/auto-moderation/rules`;
export const GuildEmoji: (guildId: Snowflake, emojiId: Snowflake) => string = (guildId: Snowflake, emojiId: Snowflake): string => `/guilds/${guildId}/emojis/${emojiId}`;
export const GuildEmojis: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/emojis`;
export const GuildAuditLog: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/audit-logs`;
export const GuildScheduledEvent: (guildId: Snowflake, eventId: Snowflake) => string = (guildId: Snowflake, eventId: Snowflake): string => `/guilds/${guildId}/scheduled-events/${eventId}`;
export const GuildScheduledEvents: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/scheduled-events`;
export const GuildScheduledEventsUsers: (guildId: Snowflake, eventId: Snowflake) => string = (guildId: Snowflake, eventId: Snowflake): string => `/guilds/${guildId}/scheduled-events/${eventId}/users`;
export const GuildTemplateCode: (code: string) => string = (code: string): string => `/guilds/templates/${code}`;
export const GuildTemplate: (guildId: Snowflake, templateId: Snowflake) => string = (guildId: Snowflake, templateId: Snowflake): string => `/guilds/${guildId}/templates/${templateId}`;
export const GuildTemplates: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/templates`;
export const GuildPreview: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/preview`;
export const GuildChannels: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/channels`;
export const GuildActiveThreads: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/threads/active`;
export const GuildMembers: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/members`;
export const GuildMember: (guildId: Snowflake, userId: Snowflake) => string = (guildId: Snowflake, userId: Snowflake): string => `/guilds/${guildId}/members/${userId}`;
export const GuildSearchMembers: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/members/search`;
export const GuildMemberRole: (guildId: Snowflake, userId: Snowflake, roleId: Snowflake) => string = (guildId: Snowflake, userId: Snowflake, roleId: Snowflake): string => `/guilds/${guildId}/members/${userId}/roles/${roleId}`;
export const GuildRoles: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/roles`;
export const GuildRole: (guildId: Snowflake, roleId: Snowflake) => string = (guildId: Snowflake, roleId: Snowflake): string => `/guilds/${guildId}/roles/${roleId}`;
export const GuildMFA: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/mfa`;
export const GuildPrune: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/prune`;
export const GuildInvites: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/invites`;
export const GuildIntegration: (guildId: Snowflake, integrationId: Snowflake) => string = (guildId: Snowflake, integrationId: Snowflake): string => `/guilds/${guildId}/integrations/${integrationId}`;
export const GuildIntegrations: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/integrations`;
export const GuildWidget: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/widget`;
export const GuildVanityURL: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/vanity-url`;
export const GuildWidgetImage: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/wIdget.png`;
export const GuildWidgetJSON: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/wIdget.json`;
export const GuildWelcomeScreen: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/welcome-screen`;
export const GuildVoiceState: (guildId: Snowflake, userId: Snowflake) => string = (guildId: Snowflake, userId: Snowflake): string => `/guilds/${guildId}/voice-states/${userId}`;
export const GuildSticker: (guildId: Snowflake, stickerId: Snowflake) => string = (guildId: Snowflake, stickerId: Snowflake): string => `/guilds/${guildId}/stickers/${stickerId}`;
export const GuildStickers: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/stickers`;
export const GuildOnboarding: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/onboarding`;

// Channels

export const Channel: (channelId: Snowflake) => string = (channelId: Snowflake): string => `/channels/${channelId}`;
export const ChannelBulkDeleteMessages: (channelId: Snowflake) => string = (channelId: Snowflake): string => `/channels/${channelId}/messages/bulk-delete`;
export const ChannelFollowers: (channelId: Snowflake) => string = (channelId: Snowflake): string => `/channels/${channelId}/followers`;
export const ChannelInvites: (channelId: Snowflake) => string = (channelId: Snowflake): string => `/channels/${channelId}/invites`;
export const ChannelJoinedPrivateArchivedThreads: (channelId: Snowflake) => string = (channelId: Snowflake): string => `/channels/${channelId}/users/@me/threads/archived/private`;
export const ChannelMessage: (channelId: Snowflake, messageId: Snowflake) => string = (channelId: Snowflake, messageId: Snowflake): string => `/channels/${channelId}/messages/${messageId}`;
export const ChannelMessages: (channelId: Snowflake) => string = (channelId: Snowflake): string => `/channels/${channelId}/messages`;
export const ChannelMessageCrosspost: (channelId: Snowflake, messageId: Snowflake) => string = (channelId: Snowflake, messageId: Snowflake): string => `/channels/${channelId}/messages/${messageId}/crosspost`;
export const ChannelMessageThreads: (channelId: Snowflake, messageId: Snowflake) => string = (channelId: Snowflake, messageId: Snowflake): string => `/channels/${channelId}/messages/${messageId}/threads`;
export const ChannelPermission: (channelId: Snowflake, overwriteId: Snowflake) => string = (channelId: Snowflake, overwriteId: Snowflake): string => `/channels/${channelId}/permissions/${overwriteId}`;
export const ChannelPermissions: (channelId: Snowflake) => string = (channelId: Snowflake): string => `/channels/${channelId}/permissions`;
export const ChannelPinnedMessage: (channelId: Snowflake, messageId: Snowflake) => string = (channelId: Snowflake, messageId: Snowflake): string => `/channels/${channelId}/pins/${messageId}`;
export const ChannelPins: (channelId: Snowflake) => string = (channelId: Snowflake): string => `/channels/${channelId}/pins`;
export const ChannelPrivateArchivedThreads: (channelId: Snowflake) => string = (channelId: Snowflake): string => `/channels/${channelId}/threads/archived/private`;
export const ChannelPublicArchivedThreads: (channelId: Snowflake) => string = (channelId: Snowflake): string => `/channels/${channelId}/threads/archived/public`;
export const ChannelReaction: (channelId: Snowflake, messageId: Snowflake, reaction: string) => string = (channelId: Snowflake, messageId: Snowflake, reaction: string): string => `/channels/${channelId}/messages/${messageId}/reactions/${reaction}`;
export const ChannelReactions: (channelId: Snowflake, messageId: Snowflake) => string = (channelId: Snowflake, messageId: Snowflake): string => `/channels/${channelId}/messages/${messageId}/reactions`;
export const ChannelReactionsUser: (channelId: Snowflake, messageId: Snowflake, reaction: string, user: string) => string = (channelId: Snowflake, messageId: Snowflake, reaction: string, user: string): string => `/channels/${channelId}/messages/${messageId}/reactions/${reaction}/${user}`;
export const ChannelThreads: (channelId: Snowflake) => string = (channelId: Snowflake): string => `/channels/${channelId}/threads`;
export const ChannelThreadsMember: (channelId: Snowflake, userId: Snowflake) => string = (channelId: Snowflake, userId: Snowflake): string => `/channels/${channelId}/thread-members/${userId}`;
export const ChannelThreadsMembers: (channelId: Snowflake) => string = (channelId: Snowflake): string => `/channels/${channelId}/thread-members`;
export const ChannelTyping: (channelId: Snowflake) => string = (channelId: Snowflake): string => `/channels/${channelId}/typing`;
export const GroupRecipient: (channelId: Snowflake, userId: Snowflake) => string = (channelId: Snowflake, userId: Snowflake): string => `/channels/${channelId}/recipients/${userId}`;
export const VoiceRegions = "/voice/regions";
export const GuildVoiceRegions: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/guilds/${guildId}/regions`;

// OAuth

export const OauthApplication = "/oauth2/applications/@me";
export const OauthAuthorize = "/oauth2/authorize";
export const OauthInfo = "/oauth2/@me";
export const OauthCurrentUser = "/users/@me";
export const OauthChannels = "/users/@me/channels";
export const OauthConnections = "/users/@me/connections";
export const OauthGuild: (guildId: Snowflake) => string = (guildId: Snowflake): string => `/users/@me/guilds/${guildId}`;
export const OauthGuildMember: (guildId: Snowflake) => string = (guildId: Snowflake): string => `${OauthGuild(guildId)}/member`;
export const OauthGuilds = "/users/@me/guilds";
export const OauthToken = "/oauth2/token";
export const OauthTokenRevoke = "/oauth2/token/revoke";
export const OauthRoleConnection: (applicationId: Snowflake) => string = (applicationId: Snowflake): string => `/users/@me/applications/${applicationId}/role-connection`;

// Images

export const AchievementIcon : (applicationId: Snowflake, achievementId: Snowflake, hash: string) => string= (applicationId: Snowflake, achievementId: Snowflake, hash: string): string => `/app-assets/${applicationId}/achievements/${achievementId}/icons/${hash}`;
export const ApplicationAsset: (applicationId: Snowflake, assetId: Snowflake) => string = (applicationId: Snowflake, assetId: Snowflake): string => `/applications/${applicationId}/assets/${assetId}`;
export const ApplicationCover: (applicationId: Snowflake, hash: string) => string = (applicationId: Snowflake, hash: string): string => `/app-icons/${applicationId}/${hash}`;
export const ApplicationIcon: (applicationId: Snowflake, hash: string) => string = ApplicationCover;
export const Banner: (guildOrUserId: Snowflake, hash: string) => string = (guildOrUserId: Snowflake, hash: string): string => `/banners/${guildOrUserId}/${hash}`;
export const CustomEmoji: (emojiId: Snowflake) => string = (emojiId: Snowflake): string => `/emojis/${emojiId}`;
export const EmbedAvatar: (mod: number) => string = (mod: number): string => `/embed/avatars/${mod}`;
export const GuildAvatar: (guildId: Snowflake, userId: Snowflake, hash: string) => string = (guildId: Snowflake, userId: Snowflake, hash: string): string => `/guilds/${guildId}/users/${userId}/avatars/${hash}`;
export const GuildDiscoverySplash: (guildId: Snowflake, hash: string) => string = (guildId: Snowflake, hash: string): string => `/guilds/${guildId}/splashes/${hash}`;
export const GuildIcon: (guildId: Snowflake, hash: string) => string = (guildId: Snowflake, hash: string): string => `/icons/${guildId}/${hash}`;
export const GuildScheduledEventCover: (eventId: Snowflake, hash: string) => string = (eventId: Snowflake, hash: string): string => `/guild-events/${eventId}/${hash}`;
export const GuildSplash: (guildId: Snowflake, hash: string) => string = (guildId: Snowflake, hash: string): string => `/splashes/${guildId}/${hash}`;
export const MemberBanner: (guildId: Snowflake, userId: Snowflake, hash: string) => string = (guildId: Snowflake, userId: Snowflake, hash: string): string => `/guilds/${guildId}/users/${userId}/banners/${hash}`;
export const RoleIcon: (roleId: Snowflake, hash: string) => string = (roleId: Snowflake, hash: string): string => `/role-icons/${roleId}/${hash}`;
export const Sticker: (stickerId: Snowflake) => string = (stickerId: Snowflake): string => `/stickers/${stickerId}`;
export const StickerPackBanner: (assetId: Snowflake) => string = (assetId: Snowflake): string => ApplicationAsset("710982414301790216", assetId);
export const TeamIcon: (teamId: Snowflake, hash: string) => string = (teamId: Snowflake, hash: string): string => `/team-icons/${teamId}/${hash}`;
export const UserAvatar: (userId: Snowflake, hash: string) => string = (userId: Snowflake, hash: string): string => `/avatars/${userId}/${hash}`;
export const UserAvatarDecoration: (userId: Snowflake, hash: string) => string = (userId: Snowflake, hash: string): string => `/avatar-decorations/${userId}/${hash}`;

// Application Commands

export const ApplicationCommand: (applicationId: Snowflake, commandId: Snowflake) => string = (applicationId: Snowflake, commandId: Snowflake): string => `/applications/${applicationId}/commands/${commandId}`;
export const ApplicationCommands: (applicationId: Snowflake) => string = (applicationId: Snowflake): string => `/applications/${applicationId}/commands`;
export const GuildApplicationCommand: (applicationId: Snowflake, guildId: Snowflake, commandId: Snowflake) => string = (applicationId: Snowflake, guildId: Snowflake, commandId: Snowflake): string => `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`;
export const GuildApplicationCommands: (applicationId: Snowflake, guildId: Snowflake) => string = (applicationId: Snowflake, guildId: Snowflake): string => `/applications/${applicationId}/guilds/${guildId}/commands`;
export const GuildApplicationCommandPermission: (applicationId: Snowflake, guildId: Snowflake, commandId: Snowflake) => string = (applicationId: Snowflake, guildId: Snowflake, commandId: Snowflake): string => `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`;
export const GuildApplicationCommandPermissions: (applicationId: Snowflake, guildId: Snowflake) => string = (applicationId: Snowflake, guildId: Snowflake): string => `/applications/${applicationId}/guilds/${guildId}commands/permissions`;
export const InteractionCallback: (interactionId: Snowflake, interactionToken: string) => string = (interactionId: Snowflake, interactionToken: string): string => `/interactions/${interactionId}/${interactionToken}/callback`;

// Misc

export const Gateway = "/gateway";
export const GatewayBot = "/gateway/bot";
export const User: (userId: Snowflake) => string = (userId: Snowflake): string => `/users/${userId}`;
export const MessageLink: (guildId: Snowflake, channelId: Snowflake, messageId: Snowflake) => string = (guildId: Snowflake, channelId: Snowflake, messageId: Snowflake): string => `/channels/${guildId}/${channelId}/${messageId}`;
export const NitroStickerPacks = "/sticker-packs";
export const Inviter: (code: string) => string = (code: string): string => `/invites/${code}`;
export const StageInstances = "/stage-instances";
export const StageInstance: (channelId: Snowflake) => string = (channelId: Snowflake): string => `/stage-instances/${channelId}`;
export const RoleConnectionMetadata: (applicationId: Snowflake) => string = (applicationId: Snowflake): string => `/applications/${applicationId}/role-connections/metadata`;
export const Application = "/applications/@me";