import { User } from "./User";
import { Message } from "./Message";
import { GuildMember } from "./GuildMember";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import { CommandInteraction } from "./CommandInteraction";
import { CommandInteractionOptionResolver } from "./CommandInteractionOptionResolver";
import { DiscordAuth, InteractionType, Locales, RawDiscordAPIChannelData, RawInteraction, RawInteractionData } from "../types";

export class ChatInputCommandInteraction extends CommandInteraction {
    public id: Snowflake;
    public applicationId: Snowflake;
    public type: InteractionType;
    public guildId: Snowflake | undefined;
    public channel: Partial<RawDiscordAPIChannelData> | undefined;
    public channelId: Snowflake | undefined;
    public member: GuildMember | undefined;
    public user: User;
    public token: string;
    public version: number;
    public message: Message | undefined;
    public appPermissions: string | undefined;
    public locale: keyof Locales | undefined;
    public guildLocale: keyof Locales | undefined;
    public creationTimestamp: number;
    public creationDate: Date;
    public options: CommandInteractionOptionResolver;
    private readonly superAxiosConfig: { headers: { Authorization: DiscordAuth; } };

    constructor(data: RawInteraction, client: Client) {
        super(data, client);

        this.id = super.id;
        this.applicationId = super.applicationId;
        this.type = super.type;
        this.data = super.data;
        this.guildId = super.guildId;
        this.channel = super.channel;
        this.channelId = super.channelId;
        this.member = super.member;
        this.user = super.user as User;
        this.token = super.token;
        this.version = super.version;
        this.message = super.message;
        this.appPermissions = super.appPermissions;
        this.locale = super.locale;
        this.guildLocale = super.guildLocale;
        this.creationTimestamp = super.creationTimestamp;
        this.creationDate = super.creationDate;
        this.options = new CommandInteractionOptionResolver(data.data as RawInteractionData, client);
        this.superAxiosConfig = { headers: { Authorization: this.client.auth } };
    }
}