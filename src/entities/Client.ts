import { Group } from "./Group";
import EventEmitter from "events";
import { IUser } from "../interfaces/IUser";
import { IGuild } from "../interfaces/IGuild";
import constants from '../constants/constants.json';
import { ClientApplication } from './ClientApplication'
import { IApplication } from "../interfaces/IApplication";
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
  
  public readonly guilds: Group<string, IGuild> = new Group();
  public readonly users: Group<string, IUser> = new Group();
  
  constructor(props: ClientProps) {
    super();
    
    this.token = props.token;
    this.intents = props.intents;

    const ws_props: WebSocketProps = {
      url: constants.wss,
      events: ['READY','INTERACTION_CREATE','GUILD_CREATE'],
      client: this
    };

    this.ws = new WebSocketStructure(ws_props, this.token, this.intents);
  };

  connect() {
    this.ws.setup();
  };
};