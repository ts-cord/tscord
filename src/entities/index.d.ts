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
    public options: ClientOptions["options"];
    public cacheSweepers: ClientOptions["cache_sweepers"];
    public rest: ClientOptions["rest"];
    public app: ClientApplication | undefined;
    public users: UserManager;
    public guilds: GuildManager;
    public channels: ChannelManager;
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };

    constructor(options: ClientOptions): this;

    on<E extends keyof ClientEvents>(event: E, listener: ClientEvents[E]): this;
    once<E extends keyof ClientEvents>(event: E, listener: ClientEvents[E]): this;
    connect(): void;
    async setUsername(username: string): Promise<User>;
    async setAvatar(avatar: string): Promise<User>;
    async edit(options: ClientEditOptions): Promise<User>;
}

declare class ClientApplication implements RawApplication {
    private readonly client: Client;
    public readonly rpc_origins: string[];
    public readonly summary: string;
    public readonly installParams: InstallParams;
    public readonly id: Snowflake;
    public readonly name: string;
    public readonly commands: ApplicationCommandManager;
    public readonly icon: string | undefined;
    public readonly description: string;
    public readonly rcpOrigins: string[] | undefined;
    public readonly botPublic: boolean;
    public readonly botRequireCodeGrant: boolean;
    public readonly termsOfServiceURL: string | undefined;
    public readonly privaciPolicyURL: string | undefined;
    public readonly owner: User | undefined;
    public readonly verifyKey: string;
    public readonly team: ApplicationTeam;
    public readonly guildId: Snowflake | undefined;
    public readonly primarySkuId: Snowflake | undefined;
    public readonly slug: string | undefined;
    public readonly cover_image: string | undefined;
    public readonly flags: number | undefined;
    public readonly tags: string[] | undefined;
    public readonly customInstallURL: string | undefined;
    public readonly roleConnectionsVerificationURL: string | undefined;
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };

    constructor(app: RawApplication, client: Client): this;

    iconURL(options?: ViewOptions): string | undefined;
    toString(): string;
    async fetchRoleConnectionMetadataRecords(): Promise<ApplicationRoleConnectionMetadata[]>;
    async updateRoleConnectionMetadataRecords(options: ApplicationRoleConnectionMetadataEditOptions): Promise<ApplicationRoleConnectionMetadata[]>;
    coverURL(options?: ViewOptions): string | undefined;
}

declare class WebSocketStructure {
    readonly ws: Websocket;
    private readonly props: ClientWebSocketOptions;
    private readonly client: { token: string; intents: number; };

    public heartbeatInterval: number | undefined;
    public connectedInterval: any | undefined;
    public lastHelloTimestamp: number | undefined;

    constructor(props: ClientWebSocketOptions, token: string, intents: number): this;

    setup(): void;
    private identify(token: string, intents: number): void;
    private stay_connected(): void;
    private async message(message: any): Promise<void>;
    private close(code: number, reason: string): void;
}