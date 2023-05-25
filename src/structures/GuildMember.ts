import { User } from "./User";
import { Basic } from "./Basic";
import { Guild } from "./Guild";
import { Message } from "./Message";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import { GuildMember as GuildMemberRoute, ChannelMessages, CndURL, GuildAvatar as GuildMemberAvatar } from "../utils/Routes";
import type { BanOptions, CreateMessageOptions, GuildMemberData, GuildMemberEditOptions, GuildMemberFlags, RawDiscordAPIMessageData, ViewOptions } from "../types";

export class GuildMember extends Basic {
    public user: User;
    public readonly nickname: string | undefined;
    public avatar: string | undefined;
    public roles: Snowflake[];
    public readonly joinedAt: Date;
    public readonly premiumSince: number | undefined;
    public deaf: boolean;
    public mute: boolean;
    public readonly flags: GuildMemberFlags;
    public readonly pending: boolean | undefined;
    public permissions: string | undefined;
    public readonly communicationDisabledUntil: number | undefined;
    public guild: Guild;
    public readonly id: Snowflake;
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };
    public readonly joinedTimestamp: number;

    constructor(data: GuildMemberData, guild: Guild, client: Client) {
        super(client);

        this.user = new User(data.user!, this.client);
        this.id = this.user.id;
        this.nickname = data.nick;
        this.avatar = data.avatar;
        this.roles = data.roles;
        this.joinedAt = new Date(data.joined_at);
        this.premiumSince = data.premium_since;
        this.deaf = data.deaf;
        this.mute = data.mute;
        this.flags = data.flags;
        this.pending = data.pending;
        this.permissions = data.permissions;
        this.communicationDisabledUntil = data.communication_disabled_until;
        this.guild = guild;
        this.axiosConfig = { headers: { Authorization: `Bot ${this.client.token}` } };
        this.joinedTimestamp = this.joinedAt.getTime();

        Object.assign(this, data);
    };

    /**
     * Ban the member's from the guild's
     * @param {BanOptions} options - Optional ban options
     * @returns {Promise<GuildMember>}
     */

    async ban(options?: BanOptions): Promise<GuildMember> {
        await rest.put(`/guilds/${this.guild.id}/bans/${this.id}`, { delete_message_seconds: options?.delete_message_seconds }, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': options?.reason } });

        return this;
    };

    /**
     * Edit member's options
     * @param {GuildMemberEditOptions} options - The options to edit
     * @returns {Promise<GuildMember>}
     */

    async edit(options: GuildMemberEditOptions): Promise<GuildMember> {
        const { data }: { data: GuildMemberData; } = await rest.patch(GuildMemberRoute(this.guild.id, this.id!), { nick: options.nick, roles: options.roles, mute: options.mute, deaf: options.deaf, channel_id: options.channel_id, communication_disabled_until: options.communication_disabled_until, flags: options.flags }, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': options?.reason } });

        return new GuildMember(data, this.guild, this.client);
    };

    /**
     * Kick the member's from the guild's
     * @param {string} reason - Reason for kick the member
     * @returns {Promise<GuildMember>}
     */

    async kick(reason?: string): Promise<GuildMember> {
        await rest.delete(GuildMemberRoute(this.guild.id, this.id!), { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

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
        const { data }: { data: RawDiscordAPIMessageData; } = await rest.post(ChannelMessages(this.id!), typeof options === 'string' ? { content: options } : options, this.axiosConfig);

        return new Message(data, this.client, this.guild);
    };

    /**
     * Fetch the member
     * @returns {Promise<GuildMember>}
     */

    async fetch(): Promise<GuildMember> {
        const { data }: { data: GuildMemberData; } = await rest.get(GuildMemberRoute(this.guild.id, this.id!), this.axiosConfig);

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
        return this.communicationDisabledUntil ? true : false;
    };

    /**
     * Stringify member's objecto into member's mention
     * @returns {string}
     */

    toString(): string {
        return `<@${this.id}>`;
    };

    /**
     * Members's avatar URL, if it doesn't have one, the [User#displayAvatarURL](https://github.com/gitpionners/TypeCord/blob/main/src/structures/User.ts#L128) will be returned
     * @returns {string}
     */

    displayAvatarURL(options?: ViewOptions): string {
        return this.avatar ? CndURL + GuildMemberAvatar(this.guild.id, this.id, this.avatar) + `.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}` : this.user.displayAvatarURL(options);
    };
};