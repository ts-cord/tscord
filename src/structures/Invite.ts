import { Basic } from "./Basic";
import { rest } from "../constants/Api";
import { Inviter } from "../utils/Routes";
import { Client } from "../entities/Client";
import type { GuildScheduledEvent, InviteTargetTypes, RawApplication, RawDiscordAPIChannelData, RawInviteData, RawDiscordAPIUserData, RawGuild } from "../types";

export class Invite extends Basic {
	public code: string;
	public guild: Partial<RawGuild> | undefined;
	public channel: Partial<RawDiscordAPIChannelData> | undefined;
	public inviter: Partial<RawDiscordAPIUserData> | undefined;
	public targetType: InviteTargetTypes;
	public targetUser: RawDiscordAPIUserData | undefined;
	public targetApplication: Partial<RawApplication> | undefined;
	public approximateMemberCount: number | undefined;
	public approximatePresenceCount: number | undefined;
	public expiresAt: number | undefined;
	public guildScheduledEvent: GuildScheduledEvent | undefined;
	public uses: number;
	public maxAge: number;
	public maxUses: number;
	public temporary: boolean;
	public createdAt: number;

	constructor(data: RawInviteData, client: Client) {
		super(client);

		this.code = data.code;
		this.guild = data.guild;
		this.channel = data.channel;
		this.inviter = data.inviter;
		this.targetType = data.target_type;
		this.targetUser = data.target_user;
		this.targetApplication = data.target_application;
		this.approximateMemberCount = data.approximate_member_count;
		this.approximatePresenceCount = data.approximate_presence_count;
		this.expiresAt = data.expires_at ? new Date(data.expires_at).getTime() : void 0;
		this.guildScheduledEvent = data.guild_scheduled_event;
		this.uses = data.uses;
		this.maxAge = data.max_age;
		this.maxUses = data.max_uses;
		this.temporary = data.temporary;
		this.createdAt = new Date(data.created_at).getTime();

		Object.assign(this, data);
	}

	/**
     * Delete the invite
     * @param {string} reason - Reason for delete this invite
     * @returns 
     */

	async delete(reason?: string): Promise<Invite> {
		await rest.delete(Inviter(this.code), { headers: { Authorization: `Bot ${this.client.token}`, "X-Audit-Log-Reason": reason } });

		return this;
	}

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
	}

	static InvitePattern = /(https?)?:\/\/discord\.gg\//i;
}