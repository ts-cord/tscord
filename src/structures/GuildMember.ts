import { User } from "./User";
import { Basic } from "./Basic";
import { Guild } from "./Guild";
import { Message } from "./Message";
import { api } from "../constants/Api";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import { GuildMember as GuildMemberRoute, ChannelMessages } from "../utils/Routes";
import type { BanOptions, CreateMessageOptions, GuildMemberData, GuildMemberEditOptions, GuildMemberFlags, RawDiscordAPIMessageData } from "../types";

export class GuildMember extends Basic {
    public user: User;
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
    public id: Snowflake;
    private readonly auth: { headers: { Authorization: `Bot ${string}` } };

    constructor(data: GuildMemberData, guild: Guild, client: Client) {
        super(client);

        this.user = new User(data.user!, this.client);
        this.id = this.user.id;
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

    /**
     * Ban the member's from the guild's
     * @param {BanOptions} options - Optional ban options
     * @returns {Promise<GuildMember>}
     */

    async ban(options?: BanOptions): Promise<GuildMember> {
        await api.put(`/guilds/${this.guild.id}/bans/${this.id}`, { delete_message_seconds: options?.delete_message_seconds }, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': options?.reason } });

        return this;
    };

    /**
     * Edit member's options
     * @param {GuildMemberEditOptions} options - The options to edit
     * @returns {Promise<GuildMember>}
     */

    async edit(options: GuildMemberEditOptions): Promise<GuildMember> {
        const { data }: { data: GuildMemberData } = await api.patch(GuildMemberRoute(this.guild.id, this.id!), { nick: options.nick, roles: options.roles, mute: options.mute, deaf: options.deaf, channel_id: options.channel_id, communication_disabled_until: options.communication_disabled_until, flags: options.flags }, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': options?.reason } });

        return new GuildMember(data, this.guild, this.client);
    };

    /**
     * Kick the member's from the guild's
     * @param {string} reason - Reason for kick the member
     * @returns {Promise<GuildMember>}
     */

    async kick(reason?: string): Promise<GuildMember> {
        await api.delete(GuildMemberRoute(this.guild.id, this.id!), { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return this;
    };

    /**
     * Edit member's nikcname
     * @param {string} nick - New nickname
     * @param {string} reason - Reason for edit the nickname
     * @returns {Prpmise<GuildMember>}
     */

    async setNickname(nick: string, reason?: string): Promise<GuildMember> {
        const data: GuildMember = await this.edit({ nick, reason });

        return data;
    };

    /**
     * Edit member's flags
     * @param {GuildMemberFlags} flags - New flags
     * @param {string} reason - Reason for edit the flags
     * @returns {Promise<GuildMember>}
     */

    async setFlags(flags: GuildMemberFlags, reason?: string): Promise<GuildMember> {
        const data: GuildMember = await this.edit({ flags, reason });

        return data;
    };

    /**
     * Times the guild member out
     * @param {number | null} duration - The duration in milisseconds, pass null value to remove the timeout
     * @param {string} reason - Reason for timeout
     * @returns {Promise<GuildMember>}
     */

    async timeout(duration: number | null, reason?: string): Promise<GuildMember> {
        const data: GuildMember = await this.edit({ communication_disabled_until: duration === null ? duration : new Date(duration).toISOString(), reason });

        return data;
    };

    /**
     * Send a message to member's
     * @param {CreateMessageOptions} options - The message options
     * @returns {Promise<Message>}
     */

    async send(options: CreateMessageOptions | string): Promise<Message> {
        const { data }: { data: RawDiscordAPIMessageData } = await api.post(ChannelMessages(this.id!), typeof options === 'string' ? { content: options } : options, this.auth);

        return new Message(data, this.client, this.guild);
    };

    /**
     * Fetch the member
     * @returns {Promise<GuildMember>}
     */

    async fetch(): Promise<GuildMember> {
        const { data }: { data: GuildMemberData } = await api.get(GuildMemberRoute(this.guild.id, this.id!), this.auth);

        return new GuildMember(data, this.guild, this.client);
    };

    /**
     * Set member's deaf
     * @param {boolean} deaf - If must be deaf
     * @param {string} reason - Reason for set deaf
     * @returns {Promise<GuildMember>}
     */

    async setDeaf(deaf: boolean, reason?: string): Promise<GuildMember> {
        const data: GuildMember = await this.edit({ deaf, reason });

        return data;
    };

    /**
     * Check if member's communication is disabled
     * @returns {boolean}
     */

    isComunnicationDisabled(): boolean {
        return this.communication_disabled_until ? true : false;
    };

    /**
     * Stringify member's objecto into member's mention
     * @returns {string}
     */

    toString(): string {
        return `<@${this.id}>`;
    };
};