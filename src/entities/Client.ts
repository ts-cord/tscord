import { Group } from "./Group";
import EventEmitter from "events";
import { api } from "../constants/Api";
import { Guild } from "../managers/Guild";
import { IUser } from "../interfaces/IUser";
import constants from '../constants/constants.json';
import { ClientApplication } from './ClientApplication'
import { WebSocketStructure, WebSocketProps } from "./WebSocket";

interface ClientProps {
  token: string;
  intents: number;
};

export class Client extends EventEmitter {
  public readonly token: string;
  public readonly intents: number;
  public readonly ws: WebSocketStructure;

  public user: IUser | undefined;
  public app: ClientApplication | undefined;

  public readonly guilds: Group<string, Guild> = new Group();
  public readonly users: Group<string, IUser> = new Group();

  constructor(props: ClientProps) {
    super();

    this.token = props.token;
    this.intents = props.intents;

    const ws_props: WebSocketProps = {
      url: constants.wss,
      events: ['READY', 'INTERACTION_CREATE', 'GUILD_CREATE', 'MESSAGE_CREATE', 'CHANNEL_DELETE', 'CHANNEL_CREATE', 'CHANNEL_PINS_UPDATE'],
      client: this
    };

    this.ws = new WebSocketStructure(ws_props, this.token, this.intents);
  };

  /**
   * @description Connect the client
   * @returns {void}
   */

  connect(): void {
    return void this.ws.setup();
  };

  /**
   * @description Fetch client connections
   * @requires `connections` OAuth2 scope
   * @returns {Promise<object>}
   */

  async fetchConnections(): Promise<object> {
    const d = await api.get(`/users/@me/connections`, { headers: { Authorization: `Bot ${this.token}` } });

    return new Promise((resolve) => resolve(d.data));
  };

  /**
   * @description Set the client username
   * @param {string} name - The name that will be set 
   * @returns {Promise<IUser>}
   */

  async setName(name: string): Promise<IUser> {
    const d = await api.patch('/users/@me', { username: name }, { headers: { Authorization: `Bot ${this.token}` } });

    return new Promise((resolve) => resolve(d.data));
  };

  /**
   * @description Set the client avatar
   * @param {string} avatar - The avatar URL that will be set 
   * @returns {Promise<IUser>}
   */

  async setAvatar(avatar: string): Promise<IUser> {
    const d = await api.patch('/users/@me', { avatar: avatar }, { headers: { Authorization: `Bot ${this.token}` } });

    return new Promise((resolve) => resolve(d.data));
  };

  /**
   * @description Edit client options
   * @param {object} params - The options that will be changed
   * @returns {Promise<IUser>}
   */

  async edit(params: { username?: string, avatar?: string }): Promise<IUser> {
    const d = await api.patch('/users/@me', params, { headers: { Authorization: `Bot ${this.token}` } });

    return new Promise((resolve) => resolve(d.data));
  };
};