import { Client } from "../entities/Client";
import { Interaction } from "../managers/Interaction";
import { IInteraction } from "../interfaces/IRawInteractionData";
import { Guild } from "../managers/Guild";

export default function (payload: { d: any }, client: Client): void {
  payload.d.guild = client.guilds.get(payload.d.guild_id);

  delete payload.d.guild_id;

  client.emit('interactionCreate', new Interaction(payload.d as IInteraction, client));
};