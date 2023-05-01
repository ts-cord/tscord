import { Basic } from "./Basic";
import { Guild } from "./Guild";
import { api } from "../constants/Api";
import { Client } from "../entities/Client";
import { GuildWelcomeScreen } from "../utils/Routes";
import type { GuildWelcomeScreenData, GuildWelcomeScreenEditOptions, RawWelcomeScreenChannel } from "../types";

export class WelcomeScreen extends Basic implements GuildWelcomeScreenData {
    public description: string | undefined;
    public welcome_channels: RawWelcomeScreenChannel[] | undefined;
    public guild: Guild;

    constructor(data: GuildWelcomeScreenData, client: Client, guild: Guild) {
        super(client);

        this.description = data.description;
        this.welcome_channels = data.welcome_channels;
        this.guild = guild;

        Object.assign(this, data);
    };
    async edit(options: GuildWelcomeScreenEditOptions): Promise<WelcomeScreen> {
        const { data }: { data: GuildWelcomeScreenData } = await api.patch(GuildWelcomeScreen(this.guild.id), { enabled: options.enabled, welcome_channels: options.welcome_channels, description: options.description }, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': options.reason } });

        return new WelcomeScreen(data, this.client, this.guild);
    };
};