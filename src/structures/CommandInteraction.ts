import { User } from "./User";
import { Message } from "./Message";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { GuildMember } from "./GuildMember";
import { Snowflake } from "../types/Snowflake";
import { BasicInteraction } from "./BasicInteraction";
import { WebhookMessage, InteractionCallback, Webhook } from "../utils/Routes";
import { InteractionCallbackType, InteractionReplyOptions, InteractionType, Locales, MessageResolvable, RawDiscordAPIChannelData, RawDiscordAPIMessageData, RawInteraction, RawInteractionData, ShowModalOptions } from "../types";

export class CommandInteraction extends BasicInteraction {
    public id: Snowflake;
    public applicationId: Snowflake;
    public type: InteractionType;
    public data: RawInteractionData | undefined;
    public guildId: Snowflake | undefined;
    public channel: Partial<RawDiscordAPIChannelData> | undefined;
    public channelId: Snowflake | undefined;
    public member: GuildMember | undefined;
    public user: User | undefined;
    public token: string;
    public version: number;
    public message: Message | undefined;
    public appPermissions: string | undefined;
    public locale: keyof Locales | undefined;
    public guildLocale: keyof Locales | undefined;
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };

    constructor(data: RawInteraction, client: Client) {
        super(data, client);

        this.id = super.id;
        this.applicationId = super.applicationId;
        this.type = super.type;
        this.data = super.data;
        this.guildId = super.guild.id;
        this.channel = data.channel;
        this.channelId = super.channelId;
        this.member = super.member;
        this.user = super.user;
        this.token = super.token;
        this.version = super.version;
        this.message = super.message;
        this.appPermissions = super.appPermissions;
        this.locale = super.locale;
        this.guildLocale = super.guildLocale;
        this.axiosConfig = { headers: { Authorization: `Bot ${super.client.token}` } };
    };

    /**
     * Deletes a reply to this interaction
     * @param {MessageResolvable} message - The message to delete
     * @returns {Promise<void>}
     * @default '@original'
     */

    async deleteReply(message: MessageResolvable = '@original'): Promise<void> {
        await rest.delete(WebhookMessage(this.id, this.token, typeof message === 'string' ? message : message.id), this.axiosConfig);

        return;
    };

    /**
     * Fetches the original reply
     * @returns {Promise<Message>}
     */

    async fetchReply(): Promise<Message> {
        const { data }: { data: RawDiscordAPIMessageData; } = await rest.get(WebhookMessage(this.id, this.token, '@original'), this.axiosConfig);

        return new Message(data, this.client, this.guild);
    };

    /**
     * Creates a reply to this interaction
     * @param {InteractionReplyOptions | string} options - The options to send
     */

    async reply(options: InteractionReplyOptions | string) {
        const { data } = await rest.post(InteractionCallback(this.id, this.token), { data: typeof options === 'string' ? { content: options } : options, type: InteractionCallbackType.ChannelMessageWithSource }, this.axiosConfig);

        data;
    };
    async showModal(options: ShowModalOptions) {
        const { data } = await rest.post(InteractionCallback(this.id, this.token), { data: options, type: InteractionCallbackType.Modal }, this.axiosConfig);

        return data;
    };
    async followUp(options: InteractionReplyOptions | string) {
        const { data } = await rest.post(Webhook(this.id, this.token), { data: typeof options === 'string' ? { content: options } : options, type: InteractionCallbackType.ChannelMessageWithSource }, this.axiosConfig);

        return data;
    };
};