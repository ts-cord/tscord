import { ISlashCommand } from "../interfaces/ISlashCommand";
import { Client } from "./Client";
import { api } from "../constants/Api";

export class ClientApplicationCommands extends Map {
  private readonly client: Client;

  constructor(client: Client) {
    super();
    this.client = client
  };

  async register(JSON: ISlashCommand[], guild_id?: string) {
    const headers: object = {
      'Authorization': `Bot ${this.client.token}`
    };
    const url: string = guild_id ? `applications/${this.client.app?.id}/guilds/${guild_id}/commands` : `applications/${this.client.app?.id}/commands`

    const requests = JSON.map(async x => await api.post(url, x, { headers }));

    return await Promise.all(requests);
  };
};