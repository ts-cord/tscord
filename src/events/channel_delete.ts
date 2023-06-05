import { Client } from "../entities/Client";
import { ChannelDelete } from "../managers/ChannelDelete";
import { GuildChannelData } from "../interfaces/IGuildChannelData";

export default function(payload: { d: GuildChannelData }, client: Client): void {
    client.emit("channelDelete", new ChannelDelete(payload.d));
}