import { Client } from "../entities/Client";
import { Message } from "../managers/Message";
import { IMessage } from "../interfaces/IMessage";

export default function (payload: any, client: Client) {
  const guild = client.guilds.get(payload.d.guild_id);

  payload.d.guild = guild;

  delete payload.d.guild_id;

  const channel = guild?.channels.get(payload.d.channel_id);

  payload.d.channel = channel;

  delete payload.d.channel_id;

  client.emit('receiveMessage', new Message(payload.d as IMessage, client));
};