import { Basic } from "./Basic";
import { rest } from "../constants/Api";
import { Inviter } from "../utils/Routes";
import { Client } from "../entities/Client";
import type { GuildScheduledEvent, InviteTargetTypes, RawApplication, RawDiscordAPIChannelData, RawInviteData, RawDiscordAPIUserData, RawGuild } from "../types";

export class Invite extends Basic implements RawInviteData {
    code: string;
    guild: Partial<RawGuild> | undefined;
    channel: Partial<RawDiscordAPIChannelData> | undefined;
    inviter: Partial<RawDiscordAPIUserData> | undefined;
    target_type: InviteTargetTypes;
    target_user: RawDiscordAPIUserData | undefined;
    target_application: Partial<RawApplication> | undefined;
    approximate_member_count: number | undefined;
    approximate_presence_count: number | undefined;
    expires_at: number | undefined;
    guild_scheduled_event: GuildScheduledEvent | undefined;
    uses: number;
    max_age: number;
    max_uses: number;
    temporary: boolean;
    created_at: number;

    constructor(data: RawInviteData, client: Client) {
        super(client);

        this.code = data.code;
        this.guild = data.guild;
        this.channel = data.channel;
        this.inviter = data.inviter;
        this.target_type = data.target_type;
        this.target_user = data.target_user;
        this.target_application = data.target_application;
        this.approximate_member_count = data.approximate_member_count;
        this.approximate_presence_count = data.approximate_presence_count;
        this.expires_at = data.expires_at ? new Date(data.expires_at).getTime() : void 0;
        this.guild_scheduled_event = data.guild_scheduled_event;
        this.uses = data.uses;
        this.max_age = data.max_age;
        this.max_uses = data.max_uses;
        this.temporary = data.temporary;
        this.created_at = new Date(data.created_at).getTime();

        Object.assign(this, data);
    };

    /**
     * Delete the invite
     * @param {string} reason - Reason for delete this invite
     * @returns 
     */

    async delete(reason?: string): Promise<Invite> {
        await rest.delete(Inviter(this.code), { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return this;
    };

    /**
     * Stringify the invite object into a invite's code
     * @returns {string}
     * @example 
     * // Console: Invite: https://discord.gg/bpTKU5a5Zb
     * 
     * console.log('Invite: ' + invite.toString());
     */

    toString(): string {
        return `https://discord.gg/${this.code}`;
    };

    static InvitePattern: RegExp = /(https?)?:\/\/discord\.gg\//i;
};