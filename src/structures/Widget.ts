import { Basic } from "./Basic";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import { GuildWidgetJSON } from "../utils/Routes";
import type { DiscordAuth, GuildWidgetData, RawDiscordAPIChannelData, RawDiscordAPIUserData } from "../types";

export class Widget extends Basic {
    public id: Snowflake;
    public name: string;
    public instantInvite: string | undefined;
    public channels: Partial<RawDiscordAPIChannelData>[];
    public members: Partial<RawDiscordAPIUserData>[];
    public presenceCount: number;
    private readonly axiosConfig: { headers: { Authorization: DiscordAuth; } };

    constructor(data: GuildWidgetData, client: Client) {
        super(client);

        this.id = data.id;
        this.name = data.name;
        this.instantInvite = data.instant_invite;
        this.channels = data.channels;
        this.members = data.members;
        this.presenceCount = data.presence_count;
        this.axiosConfig = {  headers: { Authorization: this.client.auth } };

        Object.assign(this, data);
    }

    /**
     * Fetch guild's widget
     * @returns {Promise<Widget>}
     */

    async fetch(): Promise<Widget> {
        const { data }: { data: GuildWidgetData } = await rest.get(GuildWidgetJSON(this.id), this.axiosConfig);

        return new Widget(data, this.client);
    }
}