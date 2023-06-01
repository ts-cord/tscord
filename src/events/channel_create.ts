import { Client } from "../entities/Client";
import { Channel } from "../managers/Channel";

export default function(payload: any, client: Client): void {
	client.emit("channelCreate", new Channel(payload.d, client));
}