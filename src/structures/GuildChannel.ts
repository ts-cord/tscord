import { Guild } from "./Guild";
import { Message } from "./Message";
import { api } from "../constants/Api";
import { Client } from "../entities/Client";
import { BasicChannel } from "./BasicChannel";
import { Snowflake } from "../types/Snowflake";
import { ChannelTypes } from "../props/ChannelTypes";
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

    async send(options: CreateMessageOptions): Promise<Message> {
        const { data }: { data: RawDiscordAPIMessageData } = await api.post(ChannelMessages(this.id), options, this.axios_auth);

        return new Message(data, this.client, this.guild);
    };
    async edit(options: GuildChannelEditOptions, reason?: string): Promise<GuildChannel> {
        const { data }: { data: GuildChannelData } = await api.patch(Channel(this.id), options, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return new GuildChannel(data, this.client, this.guild);
    };
    async setName(name: string, reason?: string): Promise<GuildChannel> {
        const data: GuildChannel = await this.edit({ name }, reason);

        return data;
    };
    async setTopic(topic: string, reason?: string): Promise<GuildChannel> {
        const data: GuildChannel = await this.edit({ topic }, reason);

        return data;
    };
};