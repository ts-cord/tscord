import { Group } from "../utils/Group";
import { rest } from "../constants/Api";
import { User } from "../structures/User";
import { Role } from "../structures/Role";
import { Client } from "../entities/Client";
import { Guild } from "../structures/Guild";
import { BasicManager } from "./BasicManager";
import { Snowflake } from "../types/Snowflake";
import { Message } from "../structures/Message";
import { GuildMember } from "../structures/GuildMember";
import { GuildBan, GuildMember as GuildMemberRoute, GuildMembers, GuildPrune, GuildSearchMembers } from "../utils/Routes";
import type { AddGuildMemberOptions, BanOptions, GuildListMembersOptions, GuildMemberData, GuildMemberEditOptions, GuildMemberResolvable, GuildPruneMembersOptions, GuildSearchMembersOptions, UserResolvable } from "../types";

export class GuildMemberManager extends BasicManager {
    public guild: Guild;
    public me: GuildMember | undefined;
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };
    override cache: Group<Snowflake, GuildMember> = new Group<Snowflake, GuildMember>();

    constructor(client: Client, guild: Guild) {
        super(client);

        this.guild = guild;
        this.me = this.cache.get(client.user!.id);
        this.axiosConfig = { headers: { Authorization: `Bot ${this.client.token}` } };
    };

    /**
     * Resolves a GuildMemberResolvable into user's ID
     * @param {GuildMemberResolvable} member - The user/member
     * @returns {Snowflake}
     */

    resolveId(member: GuildMemberResolvable): Snowflake {
        return member instanceof User || member instanceof GuildMember ? member.id : member instanceof Message ? member.author.id : member;
    };

    /**
     * Ban a member from the server
     * @param {GuildMemberResolvable} user - The member
     * @param {BanOptions} options - Optional ban options
     * @returns {Promise<GuildMember | User | Snwoflake>}
     */

    async ban(user: GuildMemberResolvable, options?: BanOptions): Promise<GuildMember | User | Snowflake> {
        await rest.put(GuildBan(this.guild.id, this.resolveId(user)), { delete_message_seconds: options?.delete_message_seconds }, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': options?.reason } });

        return user instanceof User || user instanceof GuildMember ? user : user instanceof Message ? user.author : user;
    };

    /**
     * Fetches the client member
     * @returns {Promise<GuildMember>}
     */

    async fetchMe(): Promise<GuildMember> {
        const { data }: { data: GuildMemberData } = await rest.get(GuildMemberRoute(this.guild.id, this.client.user!.id), this.axiosConfig);

        this.me = new GuildMember(data, this.guild, this.client);

        return this.me;
    };

    /**
     * Kick a member from the server
     * @param {GuildMemberResolvable} member - The member
     * @param {string} reason - Reason for kick
     * @returns {Promise<GuildMember | User | Snowflake>}
     */

    async kick(member: GuildMemberResolvable, reason?: string): Promise<GuildMember | User | Snowflake> {
        await rest.delete(GuildMemberRoute(this.guild.id, this.resolveId(member)), { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return member instanceof User || member instanceof GuildMember ? member : member instanceof Message ? member.author : member;
    };

    /**
     * Lists up to 1000 members of the guild
     * @param {GuildListMembersOptions} options - The options
     * @returns {Promise<Group<Snowflake, GuildMember>>}
     */

    async list(options?: GuildListMembersOptions): Promise<Group<Snowflake, GuildMember>> {
        const membersGroup: Group<Snowflake, GuildMember> = new Group<Snowflake, GuildMember>();
        const queryStringParams: string = new URLSearchParams({ limit: options?.limit, after: options?.after } as {}).toString();
        const { data }: { data: GuildMemberData[] } = await rest.get(GuildMembers(this.guild.id) + (queryStringParams.length > 0 ? `?${queryStringParams}` : ''), this.axiosConfig);

        data.forEach((member: GuildMemberData) => membersGroup.set(member.user!.id, new GuildMember(member, this.guild, this.client)));

        options?.cache ? this.cache.merge(membersGroup) : void 0;

        return membersGroup;
    };

    /**
     * Add a new member to the server (Only available for bots with less than 10 servers)
     * @param {UserResolvable} user - The user to add
     * @param {AddGuildMemberOptions} options - Optional options to add
     * @returns {Promise<GuildMember>}
     */

    async add(user: UserResolvable, options: AddGuildMemberOptions): Promise<GuildMember> {
        const { data }: { data: GuildMemberData } = await rest.put(GuildMemberRoute(this.guild.id, this.resolveId(user)), options, this.axiosConfig);

        this.cache.set(data.user!.id, new GuildMember(data, this.guild, this.client));

        return this.cache.get(data.user!.id)!;
    };

    /**
     * Unban an user from the server
     * @param {UserResolvable} user - The user
     * @returns {Promise<User | void>}
     */

    async unban(user: UserResolvable): Promise<User | void> {
        await rest.delete(GuildBan(this.guild.id, this.resolveId(user)), this.axiosConfig);

        return user instanceof User || user instanceof Message ? user instanceof Message ? user.author : user : void 0;
    };

    /**
     * Prunes members from the guild based on how long they have been inactive
     * @param {GuildPruneMembersOptions} options - The options to prune
     * @returns {Promise<number>}
     */

    async prune(options?: GuildPruneMembersOptions): Promise<number> {
        const { data }: { data: { pruned: number; }; } = await rest.post(GuildPrune(this.guild.id), { days: options?.days, compute_prune_count: options?.compute_prune_count, include_roles: options?.include_roles?.map((role: Snowflake | Role) => typeof role === 'string' ? role : role.id) }, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': options?.reason } });

        return data.pruned;
    };

    /**
     * Search for guild members that match the query
     * @param {GuildSearchMembersOptions} options - The options to search
     * @returns {Promise<Group<Snowflake, GuildMember>>}
     */

    async search(options: GuildSearchMembersOptions): Promise<Group<Snowflake, GuildMember>> {
        const queryStringParams: string = new URLSearchParams(('limit' in options ? { query: options.query, limit: options.limit } : { query: options.query }) as {}).toString();
        const membersGroup: Group<Snowflake, GuildMember> = new Group<Snowflake, GuildMember>();
        const { data }: { data: GuildMemberData[] } = await rest.get(GuildSearchMembers(this.guild.id) + `?${queryStringParams}`, this.axiosConfig);

        data.forEach((member: GuildMemberData) => membersGroup.set(member.user!.id, new GuildMember(member, this.guild, this.client)));

        options.cache ? this.cache.merge(membersGroup) : void 0;

        return membersGroup;
    };

    /**
     * Edit a guild member
     * @param {GuildMemberResolvable} member - The member
     * @param {GuildListMembersOptions} options - The options to edit
     * @returns {Promise<GuildMember>}
     */

    async edit(member: GuildMemberResolvable, options: GuildMemberEditOptions): Promise<GuildMember> {
        const { data }: { data: GuildMemberData } = await rest.patch(GuildMemberRoute(this.guild.id, this.resolveId(member)), { nick: options.nick, roles: options.roles, mute: options.mute, deaf: options.deaf, channel_id: options.channel_id, communication_disabled_until: options.communication_disabled_until, flags: options.flags }, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': options.reason } });

        this.cache.set(data.user!.id, new GuildMember(data, this.guild, this.client));

        return this.cache.get(data.user!.id)!;
    };
};