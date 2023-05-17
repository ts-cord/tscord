import { ViewOptions } from "./misc";
import { User } from "../structures/User";
import { Role } from "../structures/Role";
import { Guild } from "../structures/Guild";
import { Client } from "../entities/Client";
import { Invite } from "../structures/Invite";
import { Message } from "../structures/Message";
import { GuildMember } from "../structures/GuildMember";

export interface ClientEvents {
    messageCreate: (message: Message) => unknown;
    connect: (client: User) => unknown;
    guildCreate: (guild: Guild) => unknown;
};

export interface ClientEditOptions {
    username?: string;
    avatar?: string;
};

export interface ClientOptions {
    token: string;
    intents?: number;
    options?: {
        default_image_format?: ViewOptions['format'];
        default_image_size?: number
    };
    rest?: ClientRESTOptions;
    cache_sweepers?: ClientSweeperOptions;
};

export interface ClientSweeperOptions {
    messages?: ClientSweeperConfig<(message: Message) => unknown>;
    guilds?: ClientSweeperConfig<(guild: Guild) => unknown>;
    members?: ClientSweeperConfig<(member: GuildMember) => unknown>;
    roles?: ClientSweeperConfig<(role: Role) => unknown>;
    users?: ClientSweeperConfig<(user: User) => unknown>;
    invites?: ClientSweeperConfig<(invite: Invite) => unknown>;
};

export interface ClientSweeperConfig<T extends Function> {
    limit?: number;
    filter?: T;
    lifetime?: number;
};

export interface ClientRESTOptions {
    baseURL?: string;
    request_timeout?: number;
};

export interface ClientWebSocketOptions {
    url: string;
    events: string[];
    client: Client;
};

export enum Events {
    Connect = 'connect',
    MessageCreate = 'messageCreate',
    Resumed = 'resumed',
    Reconnect = 'reconnect',
    ApplicationCommandPermissionsUpdate = 'applicationCommandPermissionsUpdate',
    AutoModerationRuleCreate = 'autoModerationRuleCreate',
    AutoModerationRuleUpdate = 'autoModerationRuleUpdate',
    AutoModerationRuleDelete = 'autoModerationRuleDelete',
    AutoModerationActionExecute = 'autoModerationActionExecute',
    ChannelCreate = 'channelCreate',
    ChannelUpdate = 'channelUpdate',
    ChannelDelete = 'channelDelete',
    ChannelPinsUpdate = 'channelPinsUpdate',
    ThreadCreate = 'threadCreate',
    ThreadUpdate = 'threadUpdate',
    ThreadDelete = 'threadDelete',
    ThreadListSync = 'threadListSync',
    ThreadMemberUpdate = 'threadMemberUpdate',
    ThreadMembersUpdate = 'threadMembersUpdate',
    GuildCreate = 'guildCreate',
    GuildUpdate = 'guildUpdate',
    GuildDelete = 'guildDelete',
    GuildAuditLogEntryCreate = 'guildAuditLogEntryCreate',
    GuildBanAdd = 'guildBanAdd',
    GuildBanRemove = 'guildBanRemove',
    GuildEmojisUpdate = 'guildEmojisUpdate',
    GuildStickersUpdate = 'guildStickersUpdate',
    GuildIntegrationsUpdate = 'guildIntegrationsUpdate',
    GuildMemberAdd = 'guildMemberAdd',
    GuildMemberRemove = 'guildMemberRemove',
    GuildMemberUpdate = 'guildMemberUpdate',
    GuildMembersChunk = 'guildMembersChunk',
    GuildRoleCreate = 'guildRoleCreate',
    GuildRoleUpdate = 'guildRoleUpdate',
    GuildRoleDelete = 'guildRoleDelete',
    GuildScheduledEventCreate = 'guildScheduledEventCreate',
    GuildScheduledEventUpdate = 'guildScheduledEventUpdate',
    GuildScheduledEventDelete = 'guildScheduledEventDelete',
    GuildScheduledEventUserAdd = 'guildScheduledEventUserAdd',
    GuildScheduledEventUserRemove = 'guildScheduledEventUserRemove',
    IntegrationCreate = 'integrationCreate',
    IntegrationUpdate = 'integrationUpdate',
    integrationDelete = 'integrationDelete',
    InteractionCreate = 'interactionCreate',
    InviteCreate = 'inviteCreate',
    InviteDelete = 'inviteDelete',
    MessageCreate = 'messageCreate',
    MessageUpdate = 'messageUpdate',
    MessageDelete = 'messageDelete',
    MessageDeleteBulk = 'messageDeleteBulk',
    MessageReactionAdd = 'messageReactionAdd',
    MessageReactionRemove = 'messageReactionRemove',
    MessageReactionRemoveAll = 'messageReactionRemoveAll',
    MessageReactionRemoveEmoji = 'messageReactionRemoveEmoji',
    PresenceUpdate = 'presenceUpdate',
    StageInstanceCreate = 'stageInstanceCreate',
    StageInstanceUpdate = 'stageInstanceUpdate',
    StageInstanceDelete = 'stageInstanceDelete',
    TypingStart = 'typingStart',
    UserUpdate = 'userUpdate',
    VoiceStateUpdate = 'voiceStateUpdate',
    VoiceServerUpdate = 'voiceServerUpdate',
    WebhooksUpdate = 'webhooksUpdate'
};