import { Client } from "../entities/Client";

export interface ClientWebSocketProps {
    readonly url: string;
    readonly events: string[];
    readonly client: Client;
};