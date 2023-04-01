import { Client } from "../entities/Client";
import { IChannel } from "../interfaces/IChannel";
import { ChannelDelete } from "../managers/ChannelDelete";

export default function(payload: any, client: Client) {
    delete payload.d.guild_hashes, delete payload.d.hashes;

    client.emit('channelDelete', new ChannelDelete(payload.d as IChannel, client));
};