import { User } from "./User";
import { Basic } from "./Basic";
import { Guild } from "./Guild";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import { GuildIntegration } from "../utils/Routes";
import type { IntegrationAccountData, IntegrationApplicationData, RawIntegrationData, IntegrationExpireBehaviors, IntegrationType } from "../types";

export class Integration extends Basic {
	public id: Snowflake;
	public name: string;
	public type: IntegrationType;
	public enabled: boolean;
	public syncing: boolean | undefined;
	public roleId: Snowflake | undefined;
	public enableEmoticoins: boolean | undefined;
	public expireBehavior: IntegrationExpireBehaviors | undefined;
	public expireGracePeriod: number | undefined;
	public user: User | undefined;
	public account: IntegrationAccountData;
	public syncedAt: number | undefined;
	public subscriberCount: number | undefined;
	public revoked: boolean | undefined;
	public application: IntegrationApplicationData;
	public scopes: string[] | undefined;
	public guild: Guild;


	constructor(data: RawIntegrationData, client: Client, guild: Guild) {
		super(client);

		this.id = data.id;
		this.name = data.name;
		this.enabled = data.enabled;
		this.type = data.type;
		this.syncing = data.syncing;
		this.roleId = data.role_id;
		this.enableEmoticoins = data.enable_emoticoins;
		this.expireBehavior = data.expire_behavior;
		this.expireGracePeriod = data.expire_grace_period;
		this.user = data.user ? new User(data.user, this.client) : void 0;
		this.account = data.account;
		this.syncedAt = data.synced_at;
		this.subscriberCount = data.subscriber_count;
		this.revoked = data.revoked;
		this.application = data.application;
		this.scopes = data.scopes;
		this.guild = guild;

		Object.assign(this, data);
	}

	/**
     * Delete the integration
     * @param {string} reason - Reason for delete the integration
     * @returns {Promise<Integration>}
     */

	async delete(reason?: string): Promise<Integration> {
		await rest.delete(GuildIntegration(this.guild.id, this.id), { headers: { Authorization: `Bot ${this.client.token}`, "X-Audit-Log-Reason": reason } });

		return this;
	}
}