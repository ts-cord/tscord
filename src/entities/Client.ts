import EventEmitter from "events";
import { Group } from "../utils/Group";
import { api } from "../constants/Api";
import { User } from "../structures/User";
//import { Channel } from "../managers/Channel";
import { Snowflake } from "../types/Snowflake";
import { WebSocketStructure } from "./WebSocket";
import { OauthCurrentUser } from "../utils/Routes";
import { UserManager } from "../managers/UserManager";
//import { GuildManager } from "../structures/GuildManager";
import { ClientApplication } from "./ClientApplication";
import { ClientProps } from "../interfaces/IClientProps";
import { RawUserData } from "../interfaces/IRawUserData";
import { ClientEvents } from "../interfaces/IClientEvents";
import { wss as DiscordWss } from "../constants/constants.json";
import { ClientEditOptions } from "../interfaces/IClientEditOptions";
import { ClientWebSocketProps } from "../interfaces/IClientWebSocketProps";

export class Client extends EventEmitter {
  public user: User | undefined;
  public readonly token: string;
  public readonly intents: number;
  public readonly ws: WebSocketStructure;
  public readonly options: ClientProps['options'];
  public readonly sweepers: ClientProps['sweepers'];
  public readonly app: ClientApplication | undefined;
  public readonly users: UserManager = new UserManager(this);
  //public readonly guilds: GuildManager = new GuildManager(this);
  //public readonly channels: Group<Snowflake, Channel> = new Group<Snowflake, Channel>();

  constructor(data: ClientProps) {
    super();

    this.token = data.token;
    this.intents = data.intents;
    this.sweepers = data.sweepers;
    this.options = { default_image_format: data.options?.default_image_format ?? 'png', default_image_size: data.options?.default_image_size ?? 1024 };

    const wsProps: ClientWebSocketProps = {
      url: DiscordWss,
      events: ['READY', 'INTERACTION_CREATE', 'GUILD_CREATE', 'MESSAGE_CREATE', 'CHANNEL_DELETE', 'CHANNEL_CREATE', 'CHANNEL_PINS_UPDATE'],
      client: this
    };

    this.ws = new WebSocketStructure(wsProps, this.token, this.intents);
  };

  on<E extends keyof ClientEvents>(event: E, listener: ClientEvents[E]): this {
    return super.on(event, listener);
  };

  once<E extends keyof ClientEvents>(event: E, listener: ClientEvents[E]): this {
    return super.once(event, listener);
  };

  /**
   * Connect the client to Discord
   * @returns {void}
   */

  connect(): void {
    return this.ws.setup();
  };

  /**
   * Set the client username
   * @param {string} name - The name that will be set 
   * @returns {Promise<User>}
   */

  /* async setName(name: string): Promise<User> {
    const { data }: { data: RawUserData } = await api.patch(OauthCurrentUser, { username: name }, { headers: { Authorization: `Bot ${this.token}` } });

    this.user = new User(data, this);

    return this.user;
  }; */

  /**
   * @ Set the client avatar
   * @param {string} avatarURL - The avatar URL that will be set 
   * @returns {Promise<User>}
   */

  /* async setAvatar(avatarURL: string): Promise<User> {
    const { data }: { data: RawUserData } = await api.patch(OauthCurrentUser, { avatar: avatarURL }, { headers: { Authorization: `Bot ${this.token}` } });

    this.user = new User(data, this);

    return this.user;
  }; */

  /**
   * Edit the client options
   * @param {ClientEditOptions} options - The options that will be changed
   * @returns {Promise<User>}
   */

  /* async edit(options: ClientEditOptions): Promise<User> {
    const { data }: { data: RawUserData } = await api.patch(OauthCurrentUser, options, { headers: { Authorization: `Bot ${this.token}` } });

    this.user = new User(data, this);

    return this.user;
  }; */
};