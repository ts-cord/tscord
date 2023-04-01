import { Client } from "../entities/Client";
import { ChannelPinsUpdate } from "../managers/channelPinsUpdate";

export default function(payload: any, client: Client) {
    client.emit('channelPinsUpdate', new ChannelPinsUpdate(payload.d, client));
};