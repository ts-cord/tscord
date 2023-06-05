import { Group } from "../utils";
import { Client } from "../entities";
import { Role } from "../structures/Role";
import { User } from "../structures/User";
import { Basic } from "../structures/Basic";
import { Guild } from "../structures/Guild";
import { Invite } from "../structures/Invite";
import { Snowflake } from "../types/Snowflake";
import { Message } from "../structures/Message";
import { Sticker } from "../structures/Sticker";
import { Webhook } from "../structures/Webhook";
import { GuildBan } from "../structures/GuildBan";
import { DMChannel } from "../structures/DMChannel";
import { GuildMember } from "../structures/GuildMember";
import { BasicChannel } from "../structures/BasicChannel";
import { GuildChannel } from "../structures/GuildChannel";
import { ApplicationCommand } from "../structures/ApplicationCommand";
import { GuildScheduledEvent } from "../structures/GuildScheduledEvent";
import { AddGuildMemberOptions, ApplicationCommandResolvable, BanOptions, ChannelInviteCreateOptions, ChannelPositions, ChannelResolvable, CreateApplicationCommandOptions, CreateMessageOptions, CreateRoleOptions, EditApplicationCommandOptions, EditRoleOptions, EmojiResolvable, FetchGuildScheduledEventUsersOptions, GuildChannelCreateOptions, GuildChannelEditOptions, GuildChannelResolvable, GuildCreateOptions, GuildListMembersOptions, GuildMemberEditOptions, GuildMemberResolvable, GuildPruneMembersOptions, GuildResolvable, GuildScheduledEventCreateOptions, GuildScheduledEventEditOptions, GuildScheduledEventResolvable, GuildScheduledEventUserData, GuildSearchMembersOptions, GuildStickerCreateOptions, GuildStickerEditOptions, InviteResolvable, RoleResolvable, StickerResolvable, UserResolvable, WebhookCreateOptions } from "../types";

declare class BasicManager extends Basic {
    cache: Group<Snowflake, any>;

    constructor(client: Client): this;
}

declare class ApplicationCommandManager extends BasicManager {
    cache: Group<Snowflake, ApplicationCommand>;
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };

    constructor(client: Client): this;

    resolveId(command: ApplicationCommandResolvable): Snowflake;
    async create(command: CreateApplicationCommandOptions, guildId?: Snowflake): Promise<ApplicationCommand>;
    async delete(command: ApplicationCommandResolvable, guildId?: Snowflake): Promise<ApplicationCommand | void>;
    async edit(options: EditApplicationCommandOptions, command: ApplicationCommandResolvable, guildId?: Snowflake): Promise<ApplicationCommand>;
    async bulkOverwrite(commands: EditApplicationCommandOptions[], guildId?: Snowflake): Promise<Group<Snowflake, ApplicationCommand>>;
}

declare class ChannelManager extends BasicManager {
    cache: Group<Snowflake, BasicChannel>;
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };

    resolveId(channel: ChannelResolvable): Snowflake;
    async fetch(channel: ChannelResolvable): Promise<BasicChannel>;
}

declare class GuildBanManager extends BasicManager {
    public guild: Guild;
    cache: Group<Snowflake, GuildBan>;

    constructor(guild: Guild, client: Client): this;

    async remove(user: Snowflake, reason?: string): Promise<void>;
}

declare class GuildChannelManager extends BasicManager {
    public guild: Guild;
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };
    cache: Group<Snowflake, GuildChannel>;

    constructor(client: Client, guild: Guild): this;

    resolveId(channel: GuildChannelResolvable): Snowflake;
    async delete(channel: GuildChannelResolvable, reason?: string): Promise<void>;
    async fetchWebhooks(channel: GuildChannelResolvable): Promise<Group<Snowflake, Webhook>>;
    async setPositions(options: ChannelPositions[]): Promise<Guild>;
    async edit(channel: GuildChannelResolvable, options: GuildChannelEditOptions, reason?: string): Promise<GuildChannel>;
    async createWebhook(options: WebhookCreateOptions): Promise<Webhook>;
    async create(options: GuildChannelCreateOptions, reason?: string): Promise<GuildChannel>;
}

declare class GuildInviteManager extends BasicManager {
    public guild: Guild;
    cache: Group<string, Invite>;

    constructor(client: Client, guild: Guild): this;

    resolveId(invite: InviteResolvable): string;
    async delete(invite: InviteResolvable, reason?: string): Promise<void>;
    async create(channel: ChannelResolvable, options: ChannelInviteCreateOptions = {}, reason?: string): Promise<Invite>;
}

declare class GuildManager extends BasicManager {
    cache: Group<Snowflake, Guild>;
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };

    constructor(client: Client): this;

    resolveId(guild: GuildResolvable): Snowflake;
    async fetch(guild: GuildResolvable): Promise<Guild>;
    async create(options: GuildCreateOptions): Promise<Guild>;
}

declare class GuildMemberManager extends BasicManager {
    public guild: Guild;
    public me: GuildMember | undefined;
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };
    cache: Group<Snowflake, GuildMember>;

    constructor(client: Client, guild: Guild): this;

    resolveId(member: GuildMemberResolvable): Snowflake;
    async ban(user: GuildMemberResolvable, options?: BanOptions): Promise<GuildMember | User | Snowflake>;
    async fetchMe(): Promise<GuildMember>;
    async kick(member: GuildMemberResolvable, reason?: string): Promise<GuildMember | User | Snowflake>;
    async list(options?: GuildListMembersOptions): Promise<Group<Snowflake, GuildMember>>;
    async add(user: UserResolvable, options: AddGuildMemberOptions): Promise<GuildMember>;
    async unban(user: UserResolvable): Promise<User | void>;
    async prune(options?: GuildPruneMembersOptions): Promise<number>;
    async search(options: GuildSearchMembersOptions): Promise<Group<Snowflake, GuildMember>>;
    async edit(member: GuildMemberResolvable, options: GuildMemberEditOptions): Promise<GuildMember>;
}

declare class GuildScheduledEventManager extends BasicManager {
    public guild: Guild;
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };
    cache: Group<Snowflake, GuildScheduledEvent>;

    constructor(guild: Guild, client: Client): this;

    resolveId(guildScheduledEvent: GuildScheduledEventResolvable): Snowflake;
    async fetchUsers(guildScheduledEvent: GuildScheduledEventResolvable, options?: FetchGuildScheduledEventUsersOptions): Promise<Group<Snowflake, GuildScheduledEventUserData>>;
    async edit(guildScheduledEvent: GuildScheduledEventResolvable, options: GuildScheduledEventEditOptions, reason?: string): Promise<GuildScheduledEvent>;
    async delete(guildScheduledEvent: GuildScheduledEventResolvable): Promise<void>;
    async create(options: GuildScheduledEventCreateOptions, reason?: string): Promise<GuildScheduledEvent>;
}

declare class GuildStickerManager extends BasicManager {
    public guild: Guild;
    cache: Group<Snowflake, Sticker>;
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };

    constructor(guild: Guild, client: Client): this;

    resolveId(sticker: StickerResolvable): Snowflake;
    async fetchUser(sticker: StickerResolvable): Promise<User>;
    async edit(sticker: StickerResolvable, options: GuildStickerEditOptions & { reason?: string; }): Promise<Sticker>;
    async delete(sticker: StickerResolvable, reason?: string): Promise<void>;
    async create(options: GuildStickerCreateOptions): Promise<Sticker>;
}

declare class RoleManager extends BasicManager {
    public highest: Role;
    public guild: Guild;
    public everyone: Role;
    cache: Group<Snowflake, Role>;

    constructor(client: Client): this;

    comparePosition(role1: RoleResolvable, role2: RoleResolvable): number;
    async create(options: CreateRoleOptions): Promise<Role>;
    async delete(role: RoleResolvable, reason?: string): Promise<void>;
    async edit(role: RoleResolvable, options: EditRoleOptions): Promise<Role>;
    resolveId(role: RoleResolvable): Snowflake;
}

declare class UserManager extends BasicManager {
    cache: Group<Snowflake, User>;
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };

    constructor(client: Client): this;

    resolveId(user: UserResolvable): Snowflake;
    async send(user: UserResolvable, options: CreateMessageOptions | string): Promise<object>;
    async deleteDM(user: UserResolvable): Promise<DMChannel>;
}

declare class MessageManager extends BasicManager {
    public channel: GuildChannel;
    cache: Group<Snowflake, Message>;
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };

    constructor(client: Client, channel: GuildChannel): this;

    resolveId(message: MessageResolvable): Snowflake;
    async crosspost(message: MessageResolvable): Promise<Message>;
    async delete(message: MessageResolvable): Promise<void>;
    async fetchPinned(cache?: boolean): Promise<Group<Snowflake, Message>>;
    async pin(message: MessageResolvable, reason?: string): Promise<void>;
    async unpin(message: MessageResolvable, reason?: string): Promise<void>;
    async react(message: MessageResolvable, emoji: EmojiResolvable): Promise<void>;
}