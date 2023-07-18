import { Group } from "@ts-cord/group";
import { rest } from "../constants/Api";
import { Channel } from "../utils/Routes";
import { Client } from "../entities/Client";
import { BasicManager } from "./BasicManager";
import { Snowflake } from "../types/Snowflake";
import { BasicChannel } from "../structures/BasicChannel";
import type { ChannelResolvable, DiscordAuth, RawDiscordAPIChannelData } from "../types";

export class ChannelManager extends BasicManager {
    private readonly axiosConfig: { headers: { Authorization: DiscordAuth; } };
    override cache: Group<Snowflake, BasicChannel> = new Group<Snowflake, BasicChannel>();

    constructor(client: Client) {
        super(client);

        this.axiosConfig = { headers: { Authorization: this.client.auth } };
    }

    /**
     * Resolves a ChannelResolvable to the Channel ID
     * @param {ChannelResolvable} channel - The channel
     * @returns {Snowflake}
     */

    resolveId(channel: ChannelResolvable): Snowflake {
        return typeof channel === "string" ? channel : channel.id;
    }

    /**
     * Fetch a Discord Channel
     * @param {Snowflake} channel - The channel ID
     * @returns {Promise<BasicChannel>}
     */

    async fetch(channel: ChannelResolvable): Promise<BasicChannel> {
        const { data }: { data: RawDiscordAPIChannelData; } = await rest.get(Channel(this.resolveId(channel)), this.axiosConfig);

        this.cache.set(data.id, new BasicChannel(data, this.client));

        return this.cache.get(data.id) as BasicChannel;
    }
}