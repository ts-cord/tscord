import { Client } from "../entities/Client";
import { Message } from "../managers/Message";
import { IMessage } from "../interfaces/IMessage";
import { Guild } from "../managers/Guild";
import { Channel } from "../managers/Channel";

export default function (payload: any, client: Client): void {
	const guild: Guild | undefined = client.guilds.get(payload.d.guild_id);

	payload.d.guild = guild;

	delete payload.d.guild_id;

	const channel: Channel | undefined = guild?.channels.get(payload.d.channel_id);

	payload.d.channel = channel;

	delete payload.d.channel_id;

	client.emit("messageCreate", new Message(payload.d as IMessage, client));
}