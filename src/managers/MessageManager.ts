import { Group } from "../utils/Group";
import { api } from "../constants/Api";
import { Client } from "../entities/Client";
import { BasicManager } from "./BasicManager";
import { Snowflake } from "../types/Snowflake";
import { Message } from "../structures/Message";
import { GuildChannel } from "../structures/GuildChannel";
import type { EmojiResolvable, MessageResolvable, RawDiscordAPIMessageData } from "../types";
import { ChannelMessageCrosspost, ChannelMessage, ChannelPins, ChannelPinnedMessage, ChannelReactionsUser } from "../utils/Routes";

export class MessageManager extends BasicManager {
    public channel: GuildChannel;
    override cache: Group<Snowflake, Message> = new Group<Snowflake, Message>();
    private readonly axios_config: { headers: { Authorization: `Bot ${string}` } };

    constructor(client: Client, channel: GuildChannel) {
        super(client);

        this.channel = channel;
        this.axios_config = { headers: { Authorization: `Bot ${this.client.token}` } };
    };

    /**
     * Resolves a MessageResolvable into the message ID
     * @param {MessageResolvable} message - The message to resolve
     * @returns {Snowflake}
     */

    resolveId(message: MessageResolvable): Snowflake {
        return typeof message === 'string' ? message : message.id;
    }

    /**
     * Publishes a message in an announcement channel to all channels following it
     * @returns {Promise<Message>}
     */

    async crosspost(message: MessageResolvable): Promise<Message> {
        const { data }: { data: RawDiscordAPIMessageData } = await api.post(ChannelMessageCrosspost(this.channel.id, this.resolveId(message)), null, this.axios_config);

        this.cache.set(data.id, new Message(data, this.client));

        return this.cache.get(data.id)!;
    };

    /**
     * Delete a message
     * @param {MessageResolvable} message - The message
     * @returns {Promise<void>}
     */

    async delete(message: MessageResolvable): Promise<void> {
        await api.delete(ChannelMessage(this.channel.id, this.resolveId(message)), this.axios_config);

        return;
    };

    /**
     * Fetch all pinned message from the message channel
     * @param {boolean} cache - Whetever to cache the fetched messages
     * @returns {Promise<Group<Snowflake, Message>>}
     */

    async fetchPinned(cache?: boolean): Promise<Group<Snowflake, Message>> {
        const groupOfMessages: Group<Snowflake, Message> = new Group<Snowflake, Message>();
        const { data }: { data: RawDiscordAPIMessageData[] } = await api.get(ChannelPins(this.channel.id), this.axios_config);

        data.forEach((message: RawDiscordAPIMessageData) => groupOfMessages.set(message.id, new Message(message, this.client)));

        if (cache) this.cache.merge(groupOfMessages);

        return groupOfMessages;
    };

    /**
     * Pin a message in a channel
     * @param {MessageResolvable} message - The message to pin
     * @param {string} reason - Reason for pin the message
     * @returns {Promise<void>}
     */

    async pin(message: MessageResolvable, reason?: string): Promise<void> {
        await api.put(ChannelPinnedMessage(this.channel.id, this.resolveId(message)), null, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return;
    };

    /**
     * Unpin a message in a channel
     * @param {MessageResolvable} message - The message to unpin
     * @param {string} reason - Reason for unpin the message
     * @returns {Promise<void>}
     */

    async unpin(message: MessageResolvable, reason?: string): Promise<void> {
        await api.delete(ChannelPinnedMessage(this.channel.id, this.resolveId(message)), { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return;
    };

    /**
     * Adds a reaction to a message
     * @param {MessageResolvable} message - The message to react
     * @param {EmojiResolvable} emoji - The emoji to react
     * @returns {Promise<void>}
     */

    async react(message: MessageResolvable, emoji: EmojiResolvable): Promise<void> {
        await api.put(ChannelReactionsUser(this.channel.id, this.resolveId(message), encodeURIComponent(emoji), '@me'), null, this.axios_config);

        return;
    };
};