import { Client } from "../entities/Client";
import { Interaction } from "../managers/Interaction";
import { IInteraction } from "../interfaces/IInteraction";

export default function (payload: any, client: Client) {
  const guild = client.guilds.get(payload.d.guild_id)
  payload.d.guild = guild
  delete payload.d.guild_id
  
  client.emit('interactionRun', new Interaction(payload.d as IInteraction, client))
};