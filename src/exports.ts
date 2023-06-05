import { Snowflake } from "./types/Snowflake";

export * from "./builders";
export * from "./entities";
export * from "./managers";
export { version } from "../package.json";
export const Routes = {
    // Image Base URL

    CndURL: "https://cdn.discordapp.com",

    // Webhooks

    ChannelWebhooks: (channelId: Snowflake): string => `/channels/${channelId}/webhooks`,
    GuildWebhooks: (guildId: Snowflake): string => `/guilds/${guildId}/webhooks`,
    Webhook: (webhookId: Snowflake, webhookToken?: string): string => (webhookToken ? `/webhooks/${webhookId}/${webhookToken}` : `/webhooks/${webhookId}`) as `/webhooks/${string}` | `/webhooks/${string}/${string}`,
    WebhookMessage: (webhookId: Snowflake, webhookToken: string, messageId: Snowflake): string => `/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`,
    WebhookPlatform: (webhookId: Snowflake, webhookToken: string, platform: "github" | "slack"): string => `/webhooks/${webhookId}/${webhookToken}/${platform}`,

    // Guilds

    Guild: (guildId: Snowflake): string => `/guilds/${guildId}`,
    Guilds: "/guilds",
    GuildBans: (guildId: Snowflake): string => `/guilds/${guildId}/bans`,
    GuildBan: (guildId: Snowflake, userId: Snowflake): string => `/guilds/${guildId}/bans/${userId}`,
    GuildAutomodRule: (guildId: Snowflake, autoModerationRuleId: Snowflake): string => `/guilds/${guildId}/auto-moderation/rules/${autoModerationRuleId}`,
    GuildAutomodRules: (guildId: Snowflake): string => `/guilds/${guildId}/auto-moderation/rules`,
    GuildEmoji: (guildId: Snowflake, emojiId: Snowflake): string => `/guilds/${guildId}/emojis/${emojiId}`,
    GuildEmojis: (guildId: Snowflake): string => `/guilds/${guildId}/emojis`,
    GuildAuditLog: (guildId: Snowflake): string => `/guilds/${guildId}/audit-logs`,
    GuildScheduledEvent: (guildId: Snowflake, eventId: Snowflake): string => `/guilds/${guildId}/scheduled-events/${eventId}`,
    GuildScheduledEvents: (guildId: Snowflake): string => `/guilds/${guildId}/scheduled-events`,
    GuildScheduledEventsUsers: (guildId: Snowflake, eventId: Snowflake): string => `/guilds/${guildId}/scheduled-events/${eventId}/users`,
    GuildTemplateCode: (code: string): string => `/guilds/templates/${code}`,
    GuildTemplate: (guildId: Snowflake, templateId: Snowflake): string => `/guilds/${guildId}/templates/${templateId}`,
    GuildTemplates: (guildId: Snowflake): string => `/guilds/${guildId}/templates`,
    GuildPreview: (guildId: Snowflake): string => `/guilds/${guildId}/preview`,
    GuildChannels: (guildId: Snowflake): string => `/guilds/${guildId}/channels`,
    GuildActiveThreads: (guildId: Snowflake): string => `/guilds/${guildId}/threads/active`,
    GuildMembers: (guildId: Snowflake): string => `/guilds/${guildId}/members`,
    GuildMember: (guildId: Snowflake, userId: Snowflake): string => `/guilds/${guildId}/members/${userId}`,
    GuildSearchMembers: (guildId: Snowflake): string => `/guilds/${guildId}/members/search`,
    GuildMemberRole: (guildId: Snowflake, userId: Snowflake, roleId: Snowflake): string => `/guilds/${guildId}/members/${userId}/roles/${roleId}`,
    GuildRoles: (guildId: Snowflake): string => `/guilds/${guildId}/roles`,
    GuildRole: (guildId: Snowflake, roleId: Snowflake): string => `/guilds/${guildId}/roles/${roleId}`,
    GuildMFA: (guildId: Snowflake): string => `/guilds/${guildId}/mfa`,
    GuildPrune: (guildId: Snowflake): string => `/guilds/${guildId}/prune`,
    GuildInvites: (guildId: Snowflake): string => `/guilds/${guildId}/invites`,
    GuildIntegration: (guildId: Snowflake, integrationId: Snowflake): string => `/guilds/${guildId}/integrations/${integrationId}`,
    GuildIntegrations: (guildId: Snowflake): string => `/guilds/${guildId}/integrations`,
    GuildWidget: (guildId: Snowflake): string => `/guilds/${guildId}/widget`,
    GuildVanityURL: (guildId: Snowflake): string => `/guilds/${guildId}/vanity-url`,
    GuildWidgetImage: (guildId: Snowflake): string => `/guilds/${guildId}/wIdget.png`,
    GuildWidgetJSON: (guildId: Snowflake): string => `/guilds/${guildId}/wIdget.json`,
    GuildWelcomeScreen: (guildId: Snowflake): string => `/guilds/${guildId}/welcome-screen`,
    GuildVoiceState: (guildId: Snowflake, userId: Snowflake): string => `/guilds/${guildId}/voice-states/${userId}`,
    GuildSticker: (guildId: Snowflake, stickerId: Snowflake): string => `/guilds/${guildId}/stickers/${stickerId}`,
    GuildStickers: (guildId: Snowflake): string => `/guilds/${guildId}/stickers`,
    GuildOnboarding: (guildId: Snowflake): string => `/guilds/${guildId}/onboarding`,

    // Channels

    Channel: (channelId: Snowflake): string => `/channels/${channelId}`,
    ChannelBulkDeleteMessages: (channelId: Snowflake): string => `/channels/${channelId}/messages/bulk-delete`,
    ChannelFollowers: (channelId: Snowflake): string => `/channels/${channelId}/followers`,
    ChannelInvites: (channelId: Snowflake): string => `/channels/${channelId}/invites`,
    ChannelJoinedPrivateArchivedThreads: (channelId: Snowflake): string => `/channels/${channelId}/users/@me/threads/archived/private`,
    ChannelMessage: (channelId: Snowflake, messageId: Snowflake): string => `/channels/${channelId}/messages/${messageId}`,
    ChannelMessages: (channelId: Snowflake): string => `/channels/${channelId}/messages`,
    ChannelMessageCrosspost: (channelId: Snowflake, messageId: Snowflake): string => `/channels/${channelId}/messages/${messageId}/crosspost`,
    ChannelMessageThreads: (channelId: Snowflake, messageId: Snowflake): string => `/channels/${channelId}/messages/${messageId}/threads`,
    ChannelPermission: (channelId: Snowflake, overwriteId: Snowflake): string => `/channels/${channelId}/permissions/${overwriteId}`,
    ChannelPermissions: (channelId: Snowflake): string => `/channels/${channelId}/permissions`,
    ChannelPinnedMessage: (channelId: Snowflake, messageId: Snowflake): string => `/channels/${channelId}/pins/${messageId}`,
    ChannelPins: (channelId: Snowflake): string => `/channels/${channelId}/pins`,
    ChannelPrivateArchivedThreads: (channelId: Snowflake): string => `/channels/${channelId}/threads/archived/private`,
    ChannelPublicArchivedThreads: (channelId: Snowflake): string => `/channels/${channelId}/threads/archived/public`,
    ChannelReaction: (channelId: Snowflake, messageId: Snowflake, reaction: string): string => `/channels/${channelId}/messages/${messageId}/reactions/${reaction}`,
    ChannelReactions: (channelId: Snowflake, messageId: Snowflake): string => `/channels/${channelId}/messages/${messageId}/reactions`,
    ChannelReactionsUser: (channelId: Snowflake, messageId: Snowflake, reaction: string, user: string): string => `/channels/${channelId}/messages/${messageId}/reactions/${reaction}/${user}`,
    ChannelThreads: (channelId: Snowflake): string => `/channels/${channelId}/threads`,
    ChannelThreadsMember: (channelId: Snowflake, userId: Snowflake): string => `/channels/${channelId}/thread-members/${userId}`,
    ChannelThreadsMembers: (channelId: Snowflake): string => `/channels/${channelId}/thread-members`,
    ChannelTyping: (channelId: Snowflake): string => `/channels/${channelId}/typing`,
    GroupRecipient: (channelId: Snowflake, userId: Snowflake): string => `/channels/${channelId}/recipients/${userId}`,
    VoiceRegions: "/voice/regions",
    GuildVoiceRegions: (guildId: Snowflake): string => `/guilds/${guildId}/regions`,

    // OAuth

    OauthApplication: "/oauth2/applications/@me",
    OauthAuthorize: "/oauth2/authorize",
    OauthInfo: "/oauth2/@me",
    OauthCurrentUser: "/users/@me",
    OauthChannels: "/users/@me/channels",
    OauthConnections: "/users/@me/connections",
    OauthGuild: (guildId: Snowflake): string => `/users/@me/guilds/${guildId}`,
    OauthGuildMember: (guildId: Snowflake): string => `${Routes.OauthGuild(guildId)}/member`,
    OauthGuilds: "/users/@me/guilds",
    OauthToken: "/oauth2/token",
    OauthTokenRevoke: "/oauth2/token/revoke",
    OauthRoleConnection: (applicationId: Snowflake): string => `/users/@me/applications/${applicationId}/role-connection`,

    // Images

    AchievementIcon: (applicationId: Snowflake, achievementId: Snowflake, hash: string): string => `/app-assets/${applicationId}/achievements/${achievementId}/icons/${hash}`,
    ApplicationAsset: (applicationId: Snowflake, assetId: Snowflake): string => `/applications/${applicationId}/assets/${assetId}`,
    ApplicationCover: (applicationId: Snowflake, hash: string): string => `/app-icons/${applicationId}/${hash}`,
    ApplicationIcon: (applicationId: Snowflake, hash: string): string => Routes.ApplicationCover(applicationId, hash),
    Banner: (guildOrUserId: Snowflake, hash: string): string => `/banners/${guildOrUserId}/${hash}`,
    CustomEmoji: (emojiId: Snowflake): string => `/emojis/${emojiId}`,
    EmbedAvatar: (mod: number): string => `/embed/avatars/${mod}`,
    GuildAvatar: (guildId: Snowflake, userId: Snowflake, hash: string): string => `/guilds/${guildId}/users/${userId}/avatars/${hash}`,
    GuildDiscoverySplash: (guildId: Snowflake, hash: string): string => `/guilds/${guildId}/splashes/${hash}`,
    GuildIcon: (guildId: Snowflake, hash: string): string => `/icons/${guildId}/${hash}`,
    GuildScheduledEventCover: (eventId: Snowflake, hash: string): string => `/guild-events/${eventId}/${hash}`,
    GuildSplash: (guildId: Snowflake, hash: string): string => `/splashes/${guildId}/${hash}`,
    MemberBanner: (guildId: Snowflake, userId: Snowflake, hash: string): string => `/guilds/${guildId}/users/${userId}/banners/${hash}`,
    RoleIcon: (roleId: Snowflake, hash: string): string => `/role-icons/${roleId}/${hash}`,
    Sticker: (stickerId: Snowflake): string => `/stickers/${stickerId}`,
    StickerPackBanner: (assetId: Snowflake): string => Routes.ApplicationAsset("710982414301790216", assetId),
    TeamIcon: (teamId: Snowflake, hash: string): string => `/team-icons/${teamId}/${hash}`,
    UserAvatar: (userId: Snowflake, hash: string): string => `/avatars/${userId}/${hash}`,
    UserAvatarDecoration: (userId: Snowflake, hash: string): string => `/avatar-decorations/${userId}/${hash}`,

    // Application Commands

    ApplicationCommand: (applicationId: Snowflake, commandId: Snowflake): string => `/applications/${applicationId}/commands/${commandId}`,
    ApplicationCommands: (applicationId: Snowflake): string => `/applications/${applicationId}/commands`,
    GuildApplicationCommand: (applicationId: Snowflake, guildId: Snowflake, commandId: Snowflake): string => `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`,
    GuildApplicationCommands: (applicationId: Snowflake, guildId: Snowflake): string => `/applications/${applicationId}/guilds/${guildId}/commands`,
    GuildApplicationCommandPermission: (applicationId: Snowflake, guildId: Snowflake, commandId: Snowflake): string => `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`,
    GuildApplicationCommandPermissions: (applicationId: Snowflake, guildId: Snowflake): string => `/applications/${applicationId}/guilds/${guildId}commands/permissions`,
    InteractionCallback: (interactionId: Snowflake, interactionToken: string): string => `/interactions/${interactionId}/${interactionToken}/callback`,

    // Misc

    Gateway: "/gateway",
    GatewayBot: "/gateway/bot",
    User: (userId: Snowflake): string => `/users/${userId}`,
    MessageLink: (guildId: Snowflake, channelId: Snowflake, messageId: Snowflake): string => `/channels/${guildId}/${channelId}/${messageId}`,
    NitroStickerPacks: "/sticker-packs",
    Inviter: (code: string): string => `/invites/${code}`,
    StageInstances: "/stage-instances",
    StageInstance: (channelId: Snowflake): string => `/stage-instances/${channelId}`,
    RoleConnectionMetadata: (applicationId: Snowflake): string => `/applications/${applicationId}/role-connections/metadata`,
    Application: "/applications/@me"
};