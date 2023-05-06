import { Group } from "../utils/Group";
import { api } from "../constants/Api";
import { Channel } from "../utils/Routes";
import { Client } from "../entities/Client";
import { BasicManager } from "./BasicManager";
import { Snowflake } from "../types/Snowflake";
import { BasicChannel } from "../structures/BasicChannel";
import type { ChannelResolvable, RawDiscordAPIChannelData } from "../types";

export class ChannelManager extends BasicManager {
    private readonly axios_config: { headers: { Authorization: `Bot ${string}` } };
    override cache: Group<Snowflake, BasicChannel> = new Group<Snowflake, BasicChannel>();

    constructor(client: Client) {
        super(client);

        this.axios_config = { headers: { Authorization: `Bot ${this.client.token}` } };
    };

    /**
     * Resolves a ChannelResolvable to the Channel ID
     * @param {ChannelResolvable} channel - The channel
     * @returns {Snowflake}
     */

    resolveId(channel: ChannelResolvable): Snowflake {
        return typeof channel === 'string' ? channel : channel.id;
    };

    /**
     * Fetch a Discord Channel
     * @param {Snowflake} channel - The channel ID
     * @returns {Promise<BasicChannel>}
     */

    async fetch(channel: Snowflake): Promise<BasicChannel> {
        const { data }: { data: RawDiscordAPIChannelData } = await api.get(Channel(channel), this.axios_config);

        this.cache.set(data.id, new BasicChannel(data, this.client));

        return this.cache.get(data.id)!;
    };
};