export const PermissionFlagsBits: { [permissionName: string]: bigint } = {
    CreateInstanteInvite: BigInt(1 << 0),
    KickMembers: BigInt(1 << 1),
    BanMembers: BigInt(1 << 2),
    Administrator: BigInt(1 << 3),
    ManageChannels: BigInt(1 << 4),
    ManageGuild: BigInt(1 << 5),
    AddReactions: BigInt(1 << 6),
    ViewAuditLog: BigInt(1 << 7),
    PrioritySpeaker: BigInt(1 << 8),
    Stream: BigInt(1 << 9),
    ViewChannel: BigInt(1 << 10),
    SendMessages: BigInt(1 << 11),
    SendTTSMessages: BigInt(1 << 12),
    ManageMessages: BigInt(1 << 13),
    EmbedLinks: BigInt(1 << 14),
    AttachFiles: BigInt(1 << 15),
    ReadMessageHistory: BigInt(1 << 16),
    MentionEveryone: BigInt(1 << 17),
    UseExternalEmojis: BigInt(1 << 18),
    ViewGuildInsights: BigInt(1 << 19),
    Connect: BigInt(1 << 20),
    Speak: BigInt(1 << 21),
    MuteMembers: BigInt(1 << 22),
    DeafenMembers: BigInt(1 << 23),
    MoveMembers: BigInt(1 << 24),
    UseVad: BigInt(1 << 25),
    ChangeNickname: BigInt(1 << 26),
    ManageNicknames: BigInt(1 << 27),
    ManageRoles: BigInt(1 << 28),
    ManageWebhooks: BigInt(1 << 29),
    ManageEmojisAndStickers: BigInt(1 << 30),
    UseApplicationCommands: BigInt(1 << 31),
    RequestToSpeak: BigInt(1 << 32),
    ManageEvents: BigInt(1 << 33),
    ManageThreads: BigInt(1 << 34),
    CreatePublicThreads: BigInt(1 << 35),
    CreatePrivateThreads: BigInt(1 << 36),
    UseExternalStickers: BigInt(1 << 37),
    SendMessagesInThreads: BigInt(1 << 38),
    UseEmbeddedActivities: BigInt(1 << 39),
    ModerateMembers: BigInt(1 << 40)
};