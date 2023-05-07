import { WebSocket } from "ws";
import { EventEmitter } from "events";
import { User } from "../structures/User";
import { Snowflake } from "../types/Snowflake";
import { WebSocketStructure } from "./WebSocket";
import { UserManager } from "../managers/UserManager";
import { ClientApplication } from "./ClientApplication";
import { GuildManager } from "../managers/GuildManager";
import { ChannelManager } from "../managers/ChannelManager";
import { ApplicationCommandManager } from "../managers/ApplicationCommandManager";
import { ApplicationRoleConnectionMetadata, ApplicationRoleConnectionMetadataEditOptions, ApplicationTeam, ClientEditOptions, ClientEvents, ClientOptions, ClientWebSocketOptions, InstallParams, RawApplication, ViewOptions } from "../types";

declare class Client extends EventEmitter {
    public user: User | undefined;
    public token: string;
    public intents: number;
    public ws: WebSocketStructure;
    public options: ClientOptions['options'];
    public cache_sweepers: ClientOptions['cache_sweepers'];
    public rest: ClientOptions['rest'];
    public app: ClientApplication | undefined;
    public users: UserManager;
    public guilds: GuildManager;
    public channels: ChannelManager;
    private readonly axios_config: { headers: { Authorization: `Bot ${string}` } };

    constructor(options: ClientOptions): this;

    on<E extends keyof ClientEvents>(event: E, listener: ClientEvents[E]): this;
    once<E extends keyof ClientEvents>(event: E, listener: ClientEvents[E]): this;
    connect(): void;
    async setUsername(username: string): Promise<User>;
    async setAvatar(avatar: string): Promise<User>;
    async edit(options: ClientEditOptions): Promise<User>;
};

declare class ClientApplication implements RawApplication {
    private readonly client: Client;
    public readonly rpc_origins: string[];
    public readonly summary: string;
    public readonly install_params: InstallParams;
    public readonly id: Snowflake;
    public readonly name: string;
    public readonly commands: ApplicationCommandManager;
    public readonly icon: string | undefined;
    public readonly description: string;
    public readonly rcp_origins: string[] | undefined;
    public readonly bot_public: boolean;
    public readonly bot_require_code_grant: boolean;
    public readonly terms_of_service_url: string | undefined;
    public readonly privaci_policy_url: string | undefined;
    public readonly owner: User | undefined;
    public readonly verify_key: string;
    public readonly team: ApplicationTeam;
    public readonly guild_id: Snowflake | undefined;
    public readonly primary_sku_id: Snowflake | undefined;
    public readonly slug: string | undefined;
    public readonly cover_image: string | undefined;
    public readonly flags: number | undefined;
    public readonly tags: string[] | undefined;
    public readonly custom_install_url: string | undefined;
    public readonly role_connections_verification_url: string | undefined;
    private readonly axios_config: { headers: { Authorization: `Bot ${string}` } };

    constructor(app: RawApplication, client: Client): this;

    iconURL(options?: ViewOptions): string | undefined;
    toString(): string;
    async fetchRoleConnectionMetadataRecords(): Promise<ApplicationRoleConnectionMetadata[]>;
    async updateRoleConnectionMetadataRecords(options: ApplicationRoleConnectionMetadataEditOptions): Promise<ApplicationRoleConnectionMetadata[]>;
    coverURL(options?: ViewOptions): string | undefined;
};

declare class WebSocketStructure {
    readonly ws: Websocket;
    private readonly props: ClientWebSocketOptions;
    private readonly client: { token: string; intents: number; };

    constructor(props: ClientWebSocketOptions, token: string, intents: number): this;

    setup(): void;
    private identify(token: string, intents: number): void;
    private stay_connected(): void;
    private async message(message: any): Promise<void>;
    private close(code: number, reason: string): void;
};