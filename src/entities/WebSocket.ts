import WebSocket from "ws";
import { TypeCordError } from "../utils/TypeCordError";
import { WEBSOCKET_NOT_CONNECTED } from "../constants/errors.json";
import type { BasicEventPayload, ClientWebSocketOptions } from "../types";

export class WebSocketStructure {
    public readonly ws: WebSocket;
    private readonly props: ClientWebSocketOptions;
    private readonly client: { token: string; intents: number; } = { token: "", intents: 0 };

    public heartbeatInterval: number | undefined;
    public connectedInterval: unknown | undefined;
    public lastHelloTimestamp: number | undefined;

    constructor(props: ClientWebSocketOptions, token: string, intents: number) {
        this.props = props;
        this.client.token = token;
        this.client.intents = intents;
        this.ws = new WebSocket(props.url);
    }

    setup(): void {
        if (!this.ws) throw new TypeCordError({ message: WEBSOCKET_NOT_CONNECTED, code: 404 });

        this.ws.on("message", this.message.bind(this));
        this.ws.on("close", this.close.bind(this));
    }

    private identify(token: string, intents: number): void {
        const properties: { os: string; browser: string; device: string; } = { os: "linux", browser: "typecord", device: "typecord" };

        const ido: { op: number; d: { token: string; intents: number; properties: { os: string; browser: string; device: string; }; }; } = {
            op: 2, d: { token, intents, properties }
        };

        this.ws.send(JSON.stringify(ido));
    }

    private stay_connected(): void {
        this.lastHelloTimestamp = Date.now();

        this.connectedInterval = setInterval((): void => {
            const hello: { op: number; d: null; } = { op: 1, d: null };

            this.ws.send(JSON.stringify(hello));
        }, this.heartbeatInterval);
    }

    private async message(message: string): Promise<void> {
        const data: BasicEventPayload<{ heartbeat_interval: number; }> = JSON.parse(message);

        if (data.op === 10) {
            this.heartbeatInterval = data.d.heartbeat_interval;

            this.stay_connected();
            this.identify(this.client.token, this.client.intents);
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (data.op === 11) {
            this.lastHelloTimestamp = Date.now();
        }

        if (this.props.events.includes(data.t as string)) {
            const { default: event } = await import(`../events/${data.t?.toLowerCase()}.ts`);

            event(data, this.props.client);
        }
    }
    private close(code: number, message: string): void {
        throw new TypeCordError({ message, code });
    }
}