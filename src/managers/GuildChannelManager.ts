import { Group } from "../utils/Group";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { Guild } from "../structures/Guild";
import { BasicManager } from "./BasicManager";
import { Snowflake } from "../types/Snowflake";
import { Webhook } from "../structures/Webhook";
import { GuildChannel } from "../structures/GuildChannel";
import { Channel, ChannelWebhooks, GuildChannels } from "../utils/Routes";
import type { ChannelPositions, DiscordAuth, GuildChannelCreateOptions, GuildChannelData, GuildChannelEditOptions, GuildChannelResolvable, RawDiscordAPIWebhookData, WebhookCreateOptions } from "../types";

export class GuildChannelManager extends BasicManager {
    public guild: Guild;
    private readonly axiosConfig: { headers: { Authorization: DiscordAuth; } };
    override cache: Group<Snowflake, GuildChannel> = new Group<Snowflake, GuildChannel>();

    constructor(client: Client, guild: Guild) {
        super(client);

        this.guild = guild;
        this.axiosConfig = { headers: { Authorization: this.client.auth } };
    }

    /**
     * Resolves a GuildChannelResolvable to the Channel ID
     * @param {ChannelResolvable} channel - The channel
     * @returns {Snowflake}
     */

    resolveId(channel: GuildChannelResolvable): Snowflake {
        return typeof channel === "string" ? channel : channel.id;
    }

    /**
     * Delete a channel
     * @param {ChannelResolvable} channel - The channel
     * @param {string} reason - Reason for delete this channel
     * @returns {Promise<void>}
     */

    async delete(channel: GuildChannelResolvable, reason?: string): Promise<void> {
        await rest.delete(Channel(this.resolveId(channel)), { headers: { Authorization: this.client.auth, "X-Audit-Log-Reason": reason } });

        return;
    }

    /**
     * Fetch all webhooks from a channel
     * @param {ChannelResolvable} channel - The channel
     * @returns {Promise<Group<Snowflake, Webhook>>}
     */

    async fetchWebhooks(channel: GuildChannelResolvable): Promise<Group<Snowflake, Webhook>> {
        const groupOfWebhooks: Group<Snowflake, Webhook> = new Group<Snowflake, Webhook>();
        const { data }: { data: RawDiscordAPIWebhookData[]; } = await rest.get(ChannelWebhooks(this.resolveId(channel)), this.axiosConfig);

        data.forEach((webhook: RawDiscordAPIWebhookData) => groupOfWebhooks.set(webhook.id, new Webhook(webhook, this.client)));

        return groupOfWebhooks;
    }

    /**
     * Bulk edit guild's channel's positions
     * @param {ChannelPositions[]} options - Channel options to update
     * @returns {Promise<Guild>}
     */

    async setPositions(options: ChannelPositions[]): Promise<Guild> {
        await rest.patch(GuildChannels(this.guild.id), options.map((option: ChannelPositions) => ({ channel: this.resolveId(option.channel), position: option.position, lock_permissions: option.lock_permissions, parent_id: option.parent_id })), this.axiosConfig);

        return this.guild;
    }

    /**
     * Edit a guild channel
     * @param {GuildChannelResolvable} channel - The channel 
     * @param {GuildChannelEditOptions} options - The options to edit
     * @param {string} reason - Reason for edit this channel
     * @returns {Promise<GuildChannel>}
     */

    async edit(channel: GuildChannelResolvable, options: GuildChannelEditOptions, reason?: string): Promise<GuildChannel> {
        const { data }: { data: GuildChannelData; } = await rest.patch(Channel(this.resolveId(channel)), options, { headers: { Authorization: this.client.auth, "X-Audit-Log-Reason": reason } });

        this.cache.set(data.id, new GuildChannel(data, this.client, this.guild));

        return this.cache.get(data.id) as GuildChannel;
    }

    /**
     * Create a webhook from a channel
     * @param {WebhookCreateOptions} options - The options to create
     * @returns {Promise<Webhook>}
     */

    async createWebhook(options: WebhookCreateOptions): Promise<Webhook> {
        const { data }: { data: RawDiscordAPIWebhookData; } = await rest.post(ChannelWebhooks(this.resolveId(options.channel)), { name: options.name, avatar: options.avatar }, { headers: { Authorization: this.client.auth } });

        return new Webhook(data, this.client);
    }

    /**
     * Create new guild channel
     * @param {GuildChannelCreateOptions} options - The options to create
     * @param {string} reason - Reason for create the channel
     * @returns {Promise<GuildChannel>}
     * @example 
     * import { ChannelTypes } from 'typecord';
     * 
     * guild.channels.create({ name: 'new-support', type: ChannelTypes.GuildForum }, 'Need a new support channel').then(({ name }) => console.log('Guild forum name: ' + name)).catch(console.error);
     */

    async create(options: GuildChannelCreateOptions, reason?: string): Promise<GuildChannel> {
        const { data }: { data: GuildChannelData; } = await rest.post(GuildChannels(this.guild.id), options, { headers: { Authorization: this.client.auth, "X-Audit-Log-Reason": reason } });

        this.cache.set(data.id, new GuildChannel(data, this.client, this.guild));

        return this.cache.get(data.id) as GuildChannel;
    }
}