import { Guild } from "./Guild";
import { Message } from "./Message";
import { rest } from "../constants/Api";
import { ChannelTypes } from "../types";
import { Client } from "../entities/Client";
import { BasicChannel } from "./BasicChannel";
import { Snowflake } from "../types/Snowflake";
import { Channel, ChannelMessages } from "../utils/Routes";
import type { CreateMessageOptions, GuildChannelData, GuildChannelEditOptions, OverwriteData, RawDiscordAPIMessageData } from "../types";

export class GuildChannel extends BasicChannel implements GuildChannelData {
    public id: Snowflake;
    public type: ChannelTypes;
    public flags: number;
    public creation_timestamp: number;
    public creation_date: Date;
    public guild_id: Snowflake;
    public position: number;
    public permission_overwrites: OverwriteData[];
    public name: string;
    public parent_id: string | undefined;
    public guild: Guild;
    private readonly axios_auth: { headers: { Authorization: `Bot ${string}` } };

    constructor(data: GuildChannelData, client: Client, guild: Guild) {
        super(data, client);

        this.id = super.id;
        this.type = super.type;
        this.flags = data.flags;
        this.creation_timestamp = super.creation_timestamp;
        this.creation_date = super.creation_date;
        this.guild = guild;
        this.guild_id = data.guild_id;
        this.position = data.position;
        this.permission_overwrites = data.permission_overwrites;
        this.name = data.name;
        this.parent_id = data.parent_id;
        this.axios_auth = { headers: { Authorization: `Bot ${this.client.token}` } };

        Object.assign(this, data);
    };

    /**
     * Create a new message in the channel's
     * @param {CreateMessageOption} options - The message options
     * @returns {Promise<Message>}
     */

    async send(options: CreateMessageOptions): Promise<Message> {
        const { data }: { data: RawDiscordAPIMessageData } = await rest.post(ChannelMessages(this.id), options, this.axios_auth);

        return new Message(data, this.client, this.guild);
    };

    /**
     * Edit the channel's
     * @param {GuildChannelEditOptions} options - The options to edit
     * @param {string} reason - Reason for edit the channel
     * @returns {Promise<GuildChannel>}
     */

    async edit(options: GuildChannelEditOptions, reason?: string): Promise<GuildChannel> {
        const { data }: { data: GuildChannelData } = await rest.patch(Channel(this.id), options, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return new GuildChannel(data, this.client, this.guild);
    };

    /**
     * Edit channel's name
     * @param {string} name - New name
     * @param {string} reason - Reason for edit the name
     * @returns {Promise<GuildChannel>}
     */

    async setName(name: string, reason?: string): Promise<GuildChannel> {
        const data: GuildChannel = await this.edit({ name }, reason);

        return data;
    };

    /**
     * Edit channel's topic
     * @param {string} topic - New topic content
     * @param {string} reason - Reason for edit the topic
     * @returns {Promise<GuildChannel>}
     */

    async setTopic(topic: string, reason?: string): Promise<GuildChannel> {
        const data: GuildChannel = await this.edit({ topic }, reason);

        return data;
    };
};