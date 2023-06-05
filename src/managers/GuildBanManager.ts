import { Group } from "../utils/Group";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { Guild } from "../structures/Guild";
import { BasicManager } from "./BasicManager";
import { Snowflake } from "../types/Snowflake";
import { GuildBan } from "../structures/GuildBan";
import { GuildBan as GuildBanRoute } from "../utils/Routes";

export class GuildBanManager extends BasicManager {
    public guild: Guild;
    override cache: Group<Snowflake, GuildBan> = new Group<Snowflake, GuildBan>();

    constructor(guild: Guild, client: Client) {
        super(client);

        this.guild = guild;
    }

    /**
     * Remove a ban from an user
     * @param {Snowflake} user - The user to be unbanned
     * @param {string} reason - Reason for remove the ban
     * @returns {Promise<void>}
     */

    async remove(user: Snowflake, reason?: string): Promise<void> {
        const { data }: { data: void } = await rest.delete(GuildBanRoute(this.guild.id, user), { headers: { Authorization: `Bot ${this.client.token}`, "X-Audit-Log-Reason": reason } });

        return data;
    }
}