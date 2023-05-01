import { User } from "./User";
import { Basic } from "./Basic";
import { Guild } from "./Guild";
import { api } from "../constants/Api";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import { GuildMember as GuildMemberRoute, ChannelMessages } from "../utils/Routes";
import type { BanOptions, CreateMessageOptions, GuildMemberData, GuildMemberEditOptions, GuildMemberFlags } from "../types";

export class GuildMember extends Basic {
    public user: User | undefined;
    public nick: string | undefined;
    public avatar: string | undefined;
    public roles: Array<Snowflake>;
    public joined_at: number;
    public premium_since: number | undefined;
    public deaf: boolean;
    public mute: boolean;
    public flags: GuildMemberFlags;
    public pending: boolean | undefined;
    public permissions: string | undefined;
    public communication_disabled_until: number | undefined;
    public guild: Guild;
    public id: Snowflake | undefined;
    private readonly auth: { headers: { Authorization: `Bot ${string}` } };

    constructor(data: GuildMemberData, guild: Guild, client: Client) {
        super(client);

        this.user = data.user ? new User(data.user, this.client) : void 0;
        this.id = this.user?.id;
        this.nick = data.nick;
        this.avatar = data.avatar;
        this.roles = data.roles;
        this.joined_at = new Date(data.joined_at).getTime();
        this.premium_since = data.premium_since;
        this.deaf = data.deaf;
        this.mute = data.mute;
        this.flags = data.flags;
        this.pending = data.pending;
        this.permissions = data.permissions;
        this.communication_disabled_until = data.communication_disabled_until;
        this.guild = guild;
        this.auth = { headers: { Authorization: `Bot ${this.client.token}` } };

        Object.assign(this, data);
    };

    async ban(options?: BanOptions): Promise<GuildMember> {
        await api.put(`/guilds/${this.guild.id}/bans/${this.id}`, { delete_message_seconds: options?.delete_message_seconds }, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': options?.reason } });

        return this;
    };
    async edit(options: GuildMemberEditOptions): Promise<GuildMember> {
        const { data }: { data: GuildMemberData } = await api.patch(GuildMemberRoute(this.guild.id, this.id!), { nick: options.nick, roles: options.roles, mute: options.mute, deaf: options.deaf, channel_id: options.channel_id, communication_disabled_until: options.communication_disabled_until, flags: options.flags }, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': options?.reason } });

        return new GuildMember(data, this.guild, this.client);
    };
    async kick(reason?: string): Promise<GuildMember> {
        await api.delete(GuildMemberRoute(this.guild.id, this.id!), { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return this;
    };
    async setNickname(nick: string, reason?: string): Promise<GuildMember> {
        const data: GuildMember = await this.edit({ nick, reason });

        return data;
    };
    async setFlags(flags: GuildMemberFlags, reason?: string): Promise<GuildMember> {
        const data: GuildMember = await this.edit({ flags, reason });

        return data;
    };
    async timeout(duration: number | null, reason?: string): Promise<GuildMember> {
        const data: GuildMember = await this.edit({ communication_disabled_until: duration === null ? duration : new Date(duration).toISOString(), reason });

        return data;
    };
    async send(options: CreateMessageOptions | string) {
        const { data }: { data: object } = await api.post(ChannelMessages(this.id!), typeof options === 'string' ? { content: options } : options, this.auth);

        return data;
    };
    async fetch() {
        const { data }: { data: GuildMemberData } = await api.get(GuildMemberRoute(this.guild.id, this.id!), this.auth);

        return new GuildMember(data, this.guild, this.client);
    };
    async setDeaf(deaf: boolean, reason?: string): Promise<GuildMember> {
        const data: GuildMember = await this.edit({ deaf, reason });

        return data;
    }
    isComunnicationDisabled(): boolean {
        return this.communication_disabled_until ? true : false;
    };
    toString(): string {
        return `<@${this.id}>`;
    };
};