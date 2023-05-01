import { Client } from "../entities/Client";
import { ChannelPinsUpdate } from "../managers/channelPinsUpdate";

export default function(payload: { d: { guild_id?: string; channel_id: string; last_pin_timestamp?: number; } }, client: Client): void {
    client.emit('channelPinsUpdate', new ChannelPinsUpdate(payload.d, client));
};