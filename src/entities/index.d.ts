import { Snowflake } from "../types/Snowflake"
import { ClientProps } from "../interfaces/IClientProps";
import { GuildManager } from "../managers/GuildManager";
import { User } from "../managers/User";
import { UserManager } from "../managers/UserManager";
import { Group } from "../utils/Group";
import { WebSocketStructure } from "./WebSocket";
import Websocket from "ws";
import { Channel } from "../managers/Channel";
import { EventEmitter } from "events";
import { ClientWebSocketProps } from "../interfaces/IClientWebSocketProps";
import { ClientEvents } from "../interfaces/IClientEvents";
import { ClientEditOptions } from "../interfaces/IClientEditOptions";
import { Application } from "../interfaces/IApplication";
import { ClientApplicationCommands } from "../managers/ApplicationCommandManager";
import { ApplicationTeam } from "../interfaces/IApplicationTeam";
import { ViewOptions } from "../interfaces/IViewOptions";
import { ApplicationRoleConnectionMetadata } from "../interfaces/IApplicationRoleConnectionMetadata";
import { ApplicationRoleConnectionMetadataUpdateOptions } from "../interfaces/IApplicationRoleConnectionMetadataUpdateOptions";
import { SlashCommandData } from "../interfaces/ISlashCommandData";

declare class Client extends EventEmitter {
    public user: User | undefined;
    public readonly token: string;
    public readonly intents: number;
    public readonly ws: WebSocketStructure;
    public readonly options: ClientProps['options'];
    public readonly sweepers: ClientProps['sweepers'];
    public readonly app: ClientApplication | undefined;
    public readonly users: UserManager;
    public readonly guilds: GuildManager;
    public readonly channels: Group<Snowflake, Channel>;

    constructor(data: ClientProps) {
        const wsProps: ClientWebSocketProps;
    };

    on<Event extends keyof ClientEvents>(event: Event, listener: ClientEvents[Event]): this;
    once<Event extends keyof ClientEvents>(event: Event, listener: ClientEvents[Event]): this;
    connect(): void;
    async setName(name: string): User;
    async setAvatar(avatarURL: string): User;
    async edit(options: ClientEditOptions): User;
};

declare class ClientApplication implements Application {
    public readonly id: Snowflake;
    public readonly name?: string;
    public readonly commands: ClientApplicationCommands;
    public readonly icon?: string;
    public readonly description?: string;
    public readonly rcp_origins?: string[];
    public readonly bot_public?: boolean;
    public readonly bot_require_code_grant?: boolean;
    public readonly terms_of_service_url?: string;
    public readonly privaci_policy_url?: string;
    public readonly owner?: User;
    public readonly verify_key?: string;
    public readonly team?: ApplicationTeam;
    public readonly guild_id?: Snowflake;
    public readonly primary_sku_id?: Snowflake;
    public readonly slug?: string;
    public readonly cover_image?: string;
    public readonly flags?: number;
    public readonly tags?: string[];
    public readonly custom_install_url?: string;
    public readonly role_connections_verification_url?: string;

    constructor(app: Application, client: Client);

    iconURL(options: ViewOptions): string | undefined;
    toString(): string | undefined;
    async fetchRoleConnectionMetadataRecords(): Promise<Array<ApplicationRoleConnectionMetadata>>;
    async updateRoleConnectionMetadataRecords(options: ApplicationRoleConnectionMetadataUpdateOptions): Promise<Array<ApplicationRoleConnectionMetadata>>;
    appCoverURL(options: ViewOptions): string | undefined;
};

declare class WebSocketStructure {
    private readonly props: ClientWebSocketProps;
    private readonly ws: WebSocket;
    #bot: { token: string; intents: number; };

    public heartbeat_interval?: number;
    public connected_interval?: any;
    public last_hello_timestamp?: number;

    constructor(props: ClientWebSocketProps, token: string, intents: number);

    setup(): void;
    private identify(token: string, intents: number): void;
    private stay_connected(): void;
    private async message(message: any): Promise<void>;
    private close(code: number, reason: string): void
};