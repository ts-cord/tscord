import { Events } from "../types";
import { User } from "../structures/User";
import { Client } from "../entities/Client";
import type { RawDiscordAPIUserData, ReadyEventPayload } from "../types";

export default function (payload: ReadyEventPayload, client: Client): void {
    const user: RawDiscordAPIUserData = {
        id: payload.d.user.id,
        username: payload.d.user.username,
        discriminator: payload.d.user.discriminator,
        bot: payload.d.user.bot,
        avatar: payload.d.user.avatar
    };

    client.user = new User(user, client);

    client.emit(Events.Connect, client.user, payload.d.guilds);
}