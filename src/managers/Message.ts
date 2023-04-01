import { Guild } from './Guild';
import { Channel } from './Channel';
import { Client } from '../entities/Client';
import { IUser } from '../interfaces/IUser';
import { IRole } from '../interfaces/IRole';
import { IEmbed } from '../interfaces/IEmbed';
import { IMessage } from '../interfaces/IMessage';
import { ISticker } from '../interfaces/ISticker';
import { api } from '../constants/Api';
import { Group } from '../entities/Group';
import { IMessageCallbackDataStructure } from './interfaces/IMessageCallbackDataStructure';

export class Message implements IMessage {
  #client: Client;
  public readonly id: string;
  public readonly channel: Channel;
  public readonly author: IUser;
  public readonly timestamp: number;
  public readonly tts: boolean;
  public readonly mention_everyone: boolean;
  public readonly mentions: IUser[];
  public readonly mention_roles: Pick<IRole, 'id'>[];
  public readonly embeds: IEmbed[];
  public readonly pinned: boolean;
  public readonly type: number;
  public readonly stickers: ISticker[];
  public readonly guild: Guild;
  public readonly reference;

  constructor(data: IMessage, client: Client) {
    this.#client = client;
    this.id = data.id;
    this.channel = data.channel;
    this.author = data.author;
    this.timestamp = data.timestamp;
    this.tts = data.tts;
    this.mentions = data.mentions;
    this.mention_everyone = data.mention_everyone;
    this.mention_roles = data.mention_roles;
    this.pinned = data.pinned;
    this.embeds = data.embeds;
    this.stickers = data.stickers;
    this.type = data.type;
    this.guild = data.guild;
    this.reference = data.message_reference;

    Object.assign(this, data);
  };

  /**
   * @description Delete a message
   * @param reason - Add a reason for the audit log
   * @returns {Promise<void>}
   */

  async delete(reason?: string): Promise<void> {
    const d = await api.delete(`/channels/${this.channel.id}/messages/${this.id}`, { headers: { Authorization: `Bot ${this.#client.token}`, 'X-Audit-Log-Reason': reason ?? null } });

    return void d.data;
  };

  /**
   * @description Fetch the actual message
   * @returns {Promise<IMessage>}
   */

  async fetch(): Promise<IMessage> {
    const d = await api.get(`/channels/${this.channel.id}/messages/${this.id}`, { headers: { Authorization: `Bot ${this.#client.token}` } });

    return d.data;
  };

  /**
   * @description Fetch the message reference
   * @returns {Promise<IMessagee>}
   */

  async fetchMessageReference(): Promise<IMessage> {
    const d = await api.get(`/channels/${this.channel.id}/messages/${this.reference?.message_id}`, { headers: { Authorization: `Bot ${this.#client.token}` } });

    return d.data;
  };

  /**
   * @description Pin a message in a channel
   * @param reason - Add a reason for the audit log
   * @returns {Promise<void>}
   */

  async pin(reason?: string): Promise<void> {
    const d = await api.put(`/channels/${this.channel.id}/pins/${this.id}`, null, { headers: { Authorization: `Bot ${this.#client.token}`, 'X-Audit-Log-Reason': reason } });

    return void d.data;
  };

  /**
   * @description Unpin a message in a channel
   * @param reason - Add a reason for the audit log
   * @returns {Promise<void>}
   */

  async unpin(reason?: string): Promise<void> {
    const d = await api.delete(`/channels/${this.channel.id}/pins/${this.id}`, { headers: { Authorization: `Bot ${this.#client.token}`, 'X-Audit-Log-Reason': reason } });

    return void d.data;
  };

  /**
   * @description Send a message replicating to the message that triggered
   * @param data - The message data that will be sent
   * @returns {Promise<IMessage>}
   */

  async reply(data: IMessageCallbackDataStructure | string): Promise<IMessage | void> {
    if (!data) return;

    typeof data === 'string' ? data = { content: data, message_reference: { message_id: this.id } } : Object.defineProperty(data.message_reference, 'message_id', { value: this.id, enumerable: true });

    const d = await api.post(`/channels/${this.channel.id}/messages`, data, { headers: { Authorization: `Bot ${this.#client.token}` } });

    return d.data;
  };

  /**
   * @description Edit a previously sent message
   * @param {IMessageCallbackDataStructure | string} data - The data that will be changed 
   * @returns {Promise<IMessage>}
   */

  async edit(data: IMessageCallbackDataStructure | string): Promise<IMessage> {
    const d = await api.patch(`/channels/${this.channel.id}/messages/${this.id}`, typeof data === 'string' ? { content: data } : data, { headers: { Authorization: `Bot ${this.#client.token}` } });

    return new Promise((resolve: Function) => resolve(d.data));
  };
  async post(): Promise<IMessage> {
    const d = await api.post(`/channels/${this.channel.id}/messages/${this.id}/crosspost`, null, { headers: { Authorization: `Bot ${this.#client.token}` } });

    return new Promise((resolve) => resolve(d.data));
  };
  async deleteReactions(): Promise<{ channel_id: string, message_id: string, guild_id?: string }> {
    const d = await api.delete(`/channels/${this.channel.id}/messages/${this.id}/reactions`, { headers: { Authorization: `Bot ${this.#client.token}` } });

    return d.data;
  };
  async bulkDeleteMessages(messagesId: string[], reason?: string) {
    const d = await api.post(`/channels/${this.channel.id}/messages/bulk-delete`, { messages: messagesId }, { headers: { Authorization: `Bot ${this.#client.token}`, 'X-Audit-Log-Reason': reason } });

    return d.data;
  };
};