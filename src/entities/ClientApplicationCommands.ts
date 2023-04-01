import { Client } from "./Client";
import { api } from "../constants/Api";
import { ISlashCommand } from "../interfaces/ISlashCommand";

export class ClientApplicationCommands extends Map {
  #client: Client;

  constructor(client: Client) {
    super();
    this.#client = client;
  };

  /**
   * @description Register app commands globally or in a guild
   * @param JSON - The JSON of the app commands that will be registered
   * @param guild_id - Register an application command only in a specific guild's
   * @returns {Promise<any>}
   */

  async register(JSON: ISlashCommand[], guild_id?: string): Promise<any> {
    const headers: object = {
      'Authorization': `Bot ${this.#client.token}`
    };
    const url: string = guild_id ? `applications/${this.#client.app?.id}/guilds/${guild_id}/commands` : `applications/${this.#client.app?.id}/commands`;

    const requests = JSON.map(async (x) => (await api.post(url, x, { headers })).data);

    return await Promise.all(requests);
  };

  /**
   * @description Fetch application commands
   * @param id - Search for a specific app command or search for all
   * @param guild_id - Search app commands for a specific guild
   * @returns {Promise<ISlashCommand>}
   */

  async fetch(id?: string, guild_id?: string): Promise<ISlashCommand> {
    const url: string = id ? `/applications/${this.#client.user?.id}${guild_id ? `/guilds/${guild_id}` : ''}/commands/${id}` : `/applications/${this.#client.user?.id}${guild_id ? `/guilds/${guild_id}` : ''}/commands`;
    const request = await api.get(url, { headers: { Authorization: `Bot ${this.#client.token}` } });

    return request.data;
  };
};