import { User } from "./User";
import { Basic } from "./Basic";
import { Guild } from "./Guild";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { GuildBan as GuildBanRoute } from "../utils/Routes";
import type { RawGuildBanData, DiscordAuth } from "../types";

export class GuildBan extends Basic {
    public user: User;
    public guild: Guild;
    public reason: string | undefined;
    private readonly axiosConfig: { headers: { Authorization: DiscordAuth; } };

    constructor(data: RawGuildBanData, guild: Guild, client: Client) {
        super(client);

        this.guild = guild;
        this.reason = data.reason;
        this.user = new User(data.user, this.client);
        this.axiosConfig = { headers: { Authorization: this.client.auth } };
    }

    /**
     * Fetches the GuildBan
     * @returns {Promise<GuildBan>}
     */

    async fetch(): Promise<GuildBan> {
        const { data }: { data: RawGuildBanData; } = await rest.get(GuildBanRoute(this.guild.id, this.user.id), this.axiosConfig);

        return new GuildBan(data, this.guild, this.client);
    }
}