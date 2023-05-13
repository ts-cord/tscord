import { Guild } from "./Guild";
import { Basic } from "./Basic";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import { Guild as GuildRoute } from "../utils/Routes";
import type { RawGuild, UnavailableGuildData } from "../types";

export class UnavailableGuild extends Basic implements UnavailableGuildData {
    public id: Snowflake;
    public unavailable: true;
    public creationDate: Date;
    public creationTimestamp: number;
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };

    constructor(data: UnavailableGuildData, client: Client) {
        super(client);

        this.id = data.id;
        this.unavailable = data.unavailable;
        this.creationDate = new Date((+this.id / 4194304) + 1420070400000);
        this.creationTimestamp = this.creationDate.getTime();
        this.axiosConfig = { headers: { Authorization: `Bot ${this.client.token}` } };

        Object.assign(this, data);
    };

    /**
     * Fetches the guild
     * @returns {Promise<Guild | undefined>}
     */

    async fetch(force: boolean = true): Promise<Guild | undefined> {
        if (force) {
            const { data }: { data: RawGuild } = await rest.get(GuildRoute(this.id), this.axiosConfig);

            return new Guild(data, this.client);
        };

        return this.client.guilds.cache.get(this.id);
    };
};