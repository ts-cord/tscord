import { Group } from "../utils/Group";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { Guild } from "../structures/Guild";
import { Invite } from "../structures/Invite";
import { BasicManager } from "./BasicManager";
import { Snowflake } from "../types/Snowflake";
import { Inviter, ChannelInvites } from "../utils/Routes";
import type { ChannelInviteCreateOptions, InviteResolvable, RawInviteData } from "../types";

export class GuildInviteManager extends BasicManager {
    public guild: Guild;
    override cache: Group<string, Invite> = new Group<string, Invite>();

    constructor(client: Client, guild: Guild) {
        super(client);

        this.guild = guild;
    };

    /**
     * Resolves a InviteResolvable into invite's URL
     * @param {InviteResolvable} invite - The invite
     * @returns {Snowflake}
     */

    resolveId(invite: InviteResolvable): Snowflake {
        return invite.replace(Invite.InvitePattern, '');
    };

    /**
     * Delete a guild invite
     * @param {InviteResolvable} invite - The invite
     * @param {string} reason - Reason for delete the invite
     * @returns {Promise<void>}
     */

    async delete(invite: InviteResolvable, reason?: string): Promise<void> {
        await rest.delete(Inviter(this.resolveId(invite)), { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return;
    };

    /**
     * Create a new invite to the channel
     * @param {Snowflake} channel - The channel ID
     * @param {ChannelInviteCreateOptions} options - The options to create
     * @param {string} reason - Reason for create the invite
     * @returns {Promise<Invite>}
     */

    async create(channel: Snowflake, options: ChannelInviteCreateOptions = {}, reason?: string): Promise<Invite> {
        const { data }: { data: RawInviteData } = await rest.post(ChannelInvites(channel), options, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        this.cache.set(data.code, new Invite(data, this.client));

        return this.cache.get(data.code)!;
    };
};