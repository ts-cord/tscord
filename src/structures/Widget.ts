import { Basic } from "./Basic";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import { GuildWidgetJSON } from "../utils/Routes";
import type { GuildWidgetData, RawDiscordAPIChannelData, RawDiscordAPIUserData } from "../types";

export class Widget extends Basic implements GuildWidgetData {
    public id: Snowflake;
    public name: string;
    public instant_invite: string | undefined;
    public channels: Partial<RawDiscordAPIChannelData>[];
    public members: Partial<RawDiscordAPIUserData>[];
    public presence_count: number;

    constructor(data: GuildWidgetData, client: Client) {
        super(client);

        this.id = data.id;
        this.name = data.name;
        this.instant_invite = data.instant_invite;
        this.channels = data.channels;
        this.members = data.members;
        this.presence_count = data.presence_count;

        Object.assign(this, data);
    };

    /**
     * Fetch guild's widget
     * @returns {Promise<Widget>}
     */

    async fetch(): Promise<Widget> {
        const { data }: { data: GuildWidgetData } = await rest.get(GuildWidgetJSON(this.id), { headers: { Authorization: `Bot ${this.client.token}` } });

        return new Widget(data, this.client);
    };
};