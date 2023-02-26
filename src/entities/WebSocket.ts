import WebSocket from 'ws';
import { Client } from './Client';

export interface WebSocketProps {
  readonly url: string;
  readonly events: string[];
  readonly client: Client;
};

export class WebSocketStructure {
  private readonly props: WebSocketProps;
  private readonly ws: WebSocket;
  private readonly bot = { token: '', intents: 0 };

  public heartbeat_interval?: number;
  public connected_interval?: any;
  public last_hello_timestamp?: number;

  constructor(props: WebSocketProps, token: string, intents: number) {
    this.props = props;
    this.bot.token = token;
    this.bot.intents = intents;
    this.ws = new WebSocket(props.url);
  };

  setup() {
    if (!this.ws) return; //error: ws not connected

    this.ws.on('message', this.message);
    this.ws.on('close', this.close);
  };

  private identify(token: string, intents: number) {
    if (!token) return //error: token?
    if (!intents) return //error: intents?

    const properties = { os: 'linux', browser: 'typecord', device: 'typecord' };

    const ido = {
      op: 2, d: { token: token, intents: intents, properties }
    };

    this.ws.send(JSON.stringify(ido));
  };

  private message = async (message: any) => {
    const data = JSON.parse(message);

    if (data.op == 10) {
      this.heartbeat_interval = data.d.heartbeat_interval;

      this.stay_connected();
      this.identify(this.bot.token, this.bot.intents);
    };

    if (data.op == 11) {
      this.last_hello_timestamp = Date.now();
    };

    if (this.props.events.includes(data.t)) {
      const { default: event } = await import(`../events/${data.t.toLowerCase()}.ts`)

      event(data, this.props.client)
    };
  };
  private close = (code: number) => { };

  private stay_connected = () => {
    this.last_hello_timestamp = Date.now();

    this.connected_interval = setInterval(() => {
      const hello = { op: 1, d: null };

      this.ws.send(JSON.stringify(hello));
    }, this.heartbeat_interval);
  };
};