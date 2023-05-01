import WebSocket from 'ws';
import { TypeCordError } from '../utils/TypeCordError';
import { ClientWebSocketProps } from '../interfaces/IClientWebSocketProps';

export class WebSocketStructure {
  private readonly props: ClientWebSocketProps;
  private readonly ws: WebSocket;
  #bot: { token: string, intents: number } = { token: '', intents: 0 };

  public heartbeat_interval?: number;
  public connected_interval?: any;
  public last_hello_timestamp?: number;

  constructor(props: ClientWebSocketProps, token: string, intents: number) {
    this.props = props;
    this.#bot.token = token;
    this.#bot.intents = intents;
    this.ws = new WebSocket(props.url);
  };

  setup(): void {
    if (!this.ws) throw new TypeCordError('websocked_not_connected');

    this.ws.on('message', this.message);
    this.ws.on('close', this.close);
  };

  private identify(token: string, intents: number): void {
    const properties: { os: string, browser: string, device: string } = { os: 'linux', browser: 'typecord', device: 'typecord' };

    const ido: { op: number, d: { token: string, intents: number, properties: { os: string, browser: string, device: string } } } = {
      op: 2, d: { token: token, intents: intents, properties }
    };

    this.ws.send(JSON.stringify(ido));
  };

  private stay_connected(): void {
    this.last_hello_timestamp = Date.now();

    this.connected_interval = setInterval((): void => {
      const hello: { op: number; d: null; } = { op: 1, d: null };

      this.ws.send(JSON.stringify(hello));
    }, this.heartbeat_interval);
  };

  private async message(message: any): Promise<void> {
    const data: any = JSON.parse(message);

    if (data.op === 10) {
      this.heartbeat_interval = data.d.heartbeat_interval;

      this.stay_connected();
      this.identify(this.#bot.token, this.#bot.intents);
    };

    if (data.op === 11) {
      this.last_hello_timestamp = Date.now();
    };

    if (this.props.events.includes(data.t)) {
      const { default: event } = await import(`../events/${data.t.toLowerCase()}.ts`);

      event(data, this.props.client);
    };
  };
  private close(code: number, reason: string): void {
    code;
    
    throw new TypeError(reason);
  };
};