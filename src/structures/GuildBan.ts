import { User } from "./User";
import { Basic } from "./Basic";
import { Guild } from "./Guild";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import type { RawGuildBanData } from "../types";
import { GuildBan as GuildBanRoute } from "../utils/Routes";

export class GuildBan extends Basic implements RawGuildBanData {
    public user: User;
    public guild: Guild;
    public reason: string | undefined;
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };

    constructor(data: RawGuildBanData, guild: Guild, client: Client) {
        super(client);

        this.guild = guild;
        this.reason = data.reason;
        this.user = new User(data.user, this.client);
        this.axiosConfig = { headers: { Authorization: `Bot ${this.client.token}` } };
    };

    /**
     * Fetches the GuildBan
     * @returns {Promise<GuildBan>}
     */

    async fetch(): Promise<GuildBan> {
        const { data }: { data: RawGuildBanData; } = await rest.get(GuildBanRoute(this.guild.id, this.user.id), this.axiosConfig);

        return new GuildBan(data, this.guild, this.client);
    };
};