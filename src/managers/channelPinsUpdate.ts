import { Channel } from "./Channel";
import { Message } from "./Message";
import { api } from "../constants/Api";
import { Client } from "../entities/Client";

export class ChannelPinsUpdate {
    #client: Client;
    #auth: object;

    public guild_id?: Readonly<string>;
    public channel_id: Readonly<string>;
    public last_pin_timestamp?: Readonly<number>;

    constructor(props: { guild_id?: Readonly<string>, channel_id: Readonly<string>, last_pint_timestamp?: Readonly<number> }, client: Client) {
        this.guild_id = props.guild_id;
        this.channel_id = props.channel_id;
        this.last_pin_timestamp = props.last_pint_timestamp;
        this.#client = client;
        this.#auth = {
            headers: {
                Authorization: `Bot ${this.#client.token}`
            }
        };

        Object.assign(this, props);
    };

    /**
     * @description Fetch all channel pinned messages
     * @returns {Promise<Message[]>}
     */

    async fetchPinnedMessages(): Promise<Message[]> {
        const d = await api.get(`/channels/${this.channel_id}/pins`, this.#auth);

        return d.data;
    };

    /**
     * @description Fetch the channel that triggered the event
     * @returns {Promise<Channel>}
     */

    async fetchChannel(): Promise<Channel> {
        const d = await api.get(`/channels/${this.channel_id}`, this.#auth);

        return new Channel(d.data, this.#client);
    };
};