import { IInteraction } from "../interfaces/IInteraction";
import { api } from '../constants/Api';
import { Client } from "../entities/Client";
import { IInteractionCallbackDataStructure } from "./interfaces/IInteractionCallbackDataStructure";
import { Guild } from "./Guild";

export class Interaction implements IInteraction {
  #client: Client;
  public readonly id: string;
  public readonly application_id: string;
  public readonly type: number;
  public readonly token: string;
  public readonly version: number;
  public readonly channel_id?: string;
  public readonly guild: Guild;
  
  constructor(props: IInteraction, client: Client) {
    this.id = props.id;
    this.application_id = props.application_id;
    this.type = props.type;
    this.token = props.token;
    this.version = props.version;
    this.guild = props.guild;
    this.#client = client;

    Object.assign(this, props);
  };

  reply(data: IInteractionCallbackDataStructure | string): Promise<any> | undefined {
    if (!data) return;

    return api.post(`interactions/${this.id}/${this.token}/callback`, {
      "type": 4,
      "data": typeof data === 'string' ? { "content": data } : data
    }, {
      headers: {
        'Authorization': `Bot ${this.#client.token}`
      }
    });
  };
  delete() {
    return api.delete(`/webhooks/${this.#client.user?.id}/${this.token}/messages/@original`, { headers: { Authorization: `Bot ${this.#client.token}` } });
  };
  async fetchReply(): Promise<any> {
    const d = await api.get(`/webhooks/${this.#client.user?.id}/${this.token}/messages/@original`, { headers: { Authorization: `Bot ${this.#client.token}` } });

    return d?.data;
  };
};