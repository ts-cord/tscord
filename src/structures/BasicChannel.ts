import { Basic } from "./Basic";
import { rest } from "../constants/Api";
import { ChannelTypes } from "../types";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import type { BasicChannelData } from "../types";
import { Channel as ChannelRoute } from "../utils/Routes";

export class BasicChannel extends Basic implements BasicChannelData {
    public id: Snowflake;
    public type: ChannelTypes;
    public flags: number;
    public creation_timestamp: number;
    public creation_date: Date;
    public readonly route: string;
    private readonly axios_config: { headers: { Authorization: `Bot ${string}` } };

    constructor(data: BasicChannelData, client: Client) {
        super(client);

        this.id = data.id;
        this.type = data.type;
        this.flags = data.flags;
        this.route = ChannelRoute(this.id);
        this.creation_timestamp = (+this.id / 4194304) + 1420070400000;
        this.creation_date = new Date(this.creation_timestamp);
        this.axios_config = { headers: { Authorization: `Bot ${this.client.token}` } };

        Object.assign(this, data);
    };

    /**
     * Delete the channel's
     * @param {string} reason - The reason that goes into the audit log
     * @returns {Promise<BasicChannel>}
     */

    async delete(reason?: string): Promise<BasicChannel> {
        await rest.delete(this.route, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return this;
    };

    /**
     * Fetch the channel's
     * @returns {Promise<BasicChannel>}
     */

    async fetch(): Promise<BasicChannel> {
        const { data }: { data: BasicChannelData } = await rest.get(this.route, this.axios_config);

        return new BasicChannel(data, this.client);
    };

    /**
     * Check if the channel is a DM channel
     * @returns {boolean}
     */

    isDMChannel(): boolean {
        return this.type === ChannelTypes.DM;
    };

    /**
     * Check if the channel is a text channel
     * @returns {boolean}
     */

    isTextChannel(): boolean {
        return this.type === ChannelTypes.GuildText;
    };

    /**
     * Check if the channel is a voice channel
     * @returns {boolean}
     */

    isVoiceChannel(): boolean {
        return this.type === ChannelTypes.GuildVoice;
    };

    /**
     * Check if the channel is any thread (Public, Private or Announcement)
     * @returns {boolean}
     */

    isAnyThreadChannel(): boolean {
        return [ChannelTypes.PublicThread, ChannelTypes.PrivateThread, ChannelTypes.AnnouncementThread].includes(this.type);
    };

    /**
     * Check if the channel is a guild forum channel
     * @returns {boolean}
     */

    isGuildForumChannel(): boolean {
        return this.type === ChannelTypes.GuildForum;
    };

    /**
     * Check if the channel is a category channel
     * @returns {boolean}
     */

    isGuildCategoryChannel(): boolean {
        return this.type === ChannelTypes.GuildCategory;
    };

    /**
     * Check if the channel is a group DM channel
     * @returns {boolean}
     */

    isGroupDMChannel(): boolean {
        return this.type === ChannelTypes.GroupDM;
    };

    /**
     * Check if the channel is a guild directory channel
     * @returns {boolean}
     */

    isGuildDirectoryChannel(): boolean {
        return this.type === ChannelTypes.GuildDirectory;
    };

    /**
     * Stringify the channel object into a channel's mention
     * @returns {string}
     */

    toString(): string {
        return `<#${this.id}>`;
    };

    /**
     * Jsonfiy the channel into a JSON
     * @returns {object}
     */

    toJSON(): object {
        return {
            id: this.id,
            type: this.type,
            flags: this.flags,
            creation_date: this.creation_date,
            creation_timestamp: this.creation_timestamp
        };
    };
};