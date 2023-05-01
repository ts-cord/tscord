import { User } from "./User";
import { Basic } from "./Basic";
import { Guild } from "./Guild";
import { api } from "../constants/Api";
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
    public role_id: Snowflake | undefined;
    public enable_emoticoins: boolean | undefined;
    public expire_behavior: IntegrationExpireBehaviors | undefined;
    public expire_grace_period: number | undefined;
    public user: User | undefined;
    public account: IntegrationAccountData;
    public synced_at: number | undefined;
    public subscriber_count: number | undefined;
    public revoked: boolean | undefined;
    public application: IntegrationApplicationData;
    public scopes: Array<string> | undefined;
    public guild: Guild;


    constructor(data: RawIntegrationData, client: Client, guild: Guild) {
        super(client);

        this.id = data.id;
        this.name = data.name;
        this.enabled = data.enabled;
        this.type = data.type;
        this.syncing = data.syncing;
        this.role_id = data.role_id;
        this.enable_emoticoins = data.enable_emoticoins;
        this.expire_behavior = data.expire_behavior;
        this.expire_grace_period = data.expire_grace_period;
        this.user = data.user ? new User(data.user, this.client) : void 0;
        this.account = data.account;
        this.synced_at = data.synced_at;
        this.subscriber_count = data.subscriber_count;
        this.revoked = data.revoked;
        this.application = data.application;
        this.scopes = data.scopes;
        this.guild = guild;

        Object.assign(this, data);
    };

    async delete(reason?: string): Promise<Integration> {
        await api.delete(GuildIntegration(this.guild.id, this.id), { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return this;
    };
};