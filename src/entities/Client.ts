import EventEmitter from "events";
import { rest } from "../constants/Api";
import { WebSocketStructure } from "./WebSocket";
import { OauthCurrentUser } from "../utils/Routes";
import { ClientUser } from "../structures/ClientUser";
import { UserManager } from "../managers/UserManager";
import { GuildManager } from "../managers/GuildManager";
import { ClientApplication } from "./ClientApplication";
import { ChannelManager } from "../managers/ChannelManager";
import { WSS as DiscordWss } from "../constants/constants.json";
import { ClientOptions, ClientWebSocketOptions, DiscordAuth } from "../types";
import type { ClientEvents, ClientEditOptions, RawDiscordAPIUserData } from "../types";

export class Client extends EventEmitter {
    public user: ClientUser | undefined;
    public auth: DiscordAuth;
    public intents: number;
    public ws: WebSocketStructure;
    public options: ClientOptions["options"];
    public cacheSweepers: ClientOptions["cache_sweepers"];
    public rest: ClientOptions["rest"];
    public app: ClientApplication | undefined;
    public users: UserManager = new UserManager(this);
    public guilds: GuildManager = new GuildManager(this);
    public channels: ChannelManager = new ChannelManager(this);
    private readonly axiosConfig: { headers: { Authorization: DiscordAuth; } };

    constructor(options: ClientOptions) {
        super();

        this.auth = options.auth;
        this.intents = options.intents ?? 0;
        this.axiosConfig = { headers: { Authorization: this.auth } };
        this.rest = { baseURL: options.rest?.baseURL ?? "https://discord.com/api/v10/", request_timeout: options.rest?.request_timeout ?? 15000 };
        this.options = { default_image_format: options.options?.default_image_format ?? "png", default_image_size: options.options?.default_image_size ?? 1024 };

        const wsProps: ClientWebSocketOptions = {
            url: DiscordWss,
            events: ["READY", "INTERACTION_CREATE", "GUILD_CREATE", "MESSAGE_CREATE", "CHANNEL_DELETE", "CHANNEL_CREATE", "CHANNEL_PINS_UPDATE"],
            client: this
        };

        this.ws = new WebSocketStructure(wsProps, this.auth, this.intents);
    }

    /**
   * Listens for an event when triggered
   * @param {E} event - The event to trigger
   * @param {ClientEvents[E]} listener - The listener to the event
   * @returns {this}
   */

    on<E extends keyof ClientEvents>(event: E, listener: ClientEvents[E]): this {
        return super.on(event, listener);
    }

    /**
   * Listens **one-time** an event
   * @param {E} event - The event to trigger
   * @param {ClientEvents[E]} listener - The listener to the event
   * @returns {this}
   */

    once<E extends keyof ClientEvents>(event: E, listener: ClientEvents[E]): this {
        return super.once(event, listener);
    }

    /**
   * Connect the client to Discord
   * @returns {void}
   */

    connect(): void {
        return this.ws.setup();
    }

    /**
   * Set client's username
   * @param {string} username - New username
   * @returns {Promise<ClientUser>}
   */

    async setUsername(username: string): Promise<ClientUser> {
        const data: ClientUser = await this.edit({ username });

        return data;
    }

    /**
   * Set client's avatar
   * @param {string} avatar - New avatar URL
   * @returns {Promise<ClientUser>}
   */

    async setAvatar(avatar: string): Promise<ClientUser> {
        const data: ClientUser = await this.edit({ avatar });

        return data;
    }

    /**
   * Edit client's options
   * @param {ClientEditOptions} options - Options to edit
   * @returns {Promise<ClientUser>}
   */

    async edit(options: ClientEditOptions): Promise<ClientUser> {
        const { data }: { data: RawDiscordAPIUserData; } = await rest.patch(OauthCurrentUser, options, this.axiosConfig);

        this.user = new ClientUser(data, this);

        return this.user;
    }
}