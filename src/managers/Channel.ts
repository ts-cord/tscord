import { api } from "../constants/Api";
import { Client } from "../entities/Client";
import { IInvite } from "../interfaces/IInvite";
import { IWebhook } from "../interfaces/IWebhook";
import { IChannel } from "../interfaces/IChannel";
import { IMessage } from "../interfaces/IMessage";
import { ChannelType } from "../properties/ChannelType";
import { IInviteOptions } from "./interfaces/IInviteOptions";
import { IFollowedChannel } from "./interfaces/IFollowedChannel";
import { IEditThreadOptions } from "./interfaces/IEditThreadOptions";
import { IEditChannelOptions } from "./interfaces/IEditChannelOptions";
import { IMessageCallbackDataStructure } from "./interfaces/IMessageCallbackDataStructure";


export class Channel implements IChannel {
  #client: Client;
  public readonly id: string;
  public readonly type: number;

  constructor(data: IChannel, client: Client) {
    this.id = data.id;
    this.type = data.type;
    this.#client = client;

    Object.assign(this, data);
  };

  /**
   * @description Send a message to a guild text or DM channel
   * @param {IMessageCallbackDataStructure | string} data - The message content or the data that will be sent 
   * @returns {Promise<IMessage | void>}
   */

  async send(data: IMessageCallbackDataStructure | string): Promise<IMessage | void> {
    if (!data) return;

    const d = await api.post(`/channels/${this.id}/messages`, typeof data === 'string' ? { content: data } : data, {
      headers: {
        'Authorization': `Bot ${this.#client.token}`
      }
    });

    const guild = this.#client.guilds.get(d?.data?.guild_id);
    const message = d?.data;

    delete message.guild_id;
    delete message.channel_id;

    message.guild = guild;
    message.channel = this;

    return message;
  };

  /**
   * Returns boolean if the channel is a text channel
   * @returns {boolean}
   */

  isTextChannel(): boolean {
    return this.type === ChannelType.GuildText;
  };

  /**
   * Returns boolean if the channel is a voice channel
   * @returns {boolean}
   */

  isVoiceChannel(): boolean {
    return this.type === ChannelType.GuildVoice
  };

  /**
   * Returns boolean if a channel is a DM
   * @returns {boolean}
   */

  isDMChannel(): boolean {
    return this.type === ChannelType.DM;
  };

  /**
   * Returns boolean if the channel is a group DM
   * @returns {boolean}
   */

  isGroupDMChannel(): boolean {
    return this.type === ChannelType.GroupDM
  };

  /**
   * Returns boolean if the channel is a stage voice channel
   * @returns {boolean}
   */

  isStageVoiceChannel(): boolean {
    return this.type === ChannelType.GuildStageVoice
  };

  /**
   * Returns boolean if the channels is a category channel
   * @returns {boolean}
   */

  isCategory(): boolean {
    return this.type === ChannelType.GuildCategory
  };

  /**
   * Returns boolean if the channel is a forum channel
   * @returns {boolean}
   */

  isGuildForumChannel(): boolean {
    return this.type === ChannelType.GuildForum;
  };

  /**
   * Returns boolean if the channel is guild directory
   * @returns {boolean}
   */

  isGuildDirectoryChannel(): boolean {
    return this.type === ChannelType.GuildDirectory;
  };

  /**
   * Delete a channel, or close a private message
   * @returns {Promise<IChannel>}
   */

  async delete(reason?: string): Promise<IChannel> {
    const d = await api.delete(`/channels/${this.id}`, { headers: { Authorization: `Bot ${this.#client.token}`, 'X-Audit-Log-Reason': reason } });

    return d.data;
  };

  /**
   * @description Edit a channel
   * @param {IEditChannelOptions | IEditThreadOptions} options - The options that will be changed
   * @returns {Promise<IChannel>}
   */

  async edit(options: IEditChannelOptions | IEditThreadOptions, reason?: string): Promise<IChannel> {
    const req = await api.patch(`/channels/${this.id}`, [ChannelType.PublicThread, ChannelType.PrivateThread, ChannelType.AnnouncementThread].includes(this.type) ? options as IEditThreadOptions : options as IEditChannelOptions, { headers: { Authorization: `Bot ${this.#client.token}`, 'X-Audit-Log-Reason': reason } });

    return req.data;
  };

  /**
   * @description Create a channel invite
   * @param {IInviteOptions} options - The invite options
   * @returns {Promise<IInvite>}
   */

  async createInvite(options: IInviteOptions): Promise<IInvite> {
    const req = await api.put(`/channels/${this.id}/invites`, options, { headers: { Authorization: `Bot ${this.#client.token}` } });

    return req.data;
  };

  /**
   * @description Create a new webhook
   * @param options - The data that will be sent
   * @returns {Promise<IWebhook>}
   */

  async createWebhook(options: { name: string, avatar?: string, reason?: string }): Promise<IWebhook> {
    const d = await api.post(`/channels/${this.id}/webhooks`, { name: options.name, avatar: options.avatar }, { headers: { Authorization: `Bot ${this.#client.token}`, 'X-Audit-Log-reason': options.reason } });

    return d.data;
  };

  /**
   * @description Returns an array of channel webhooks
   * @returns {Promise<IWebhook[] | void>}
   */

  async fetchWebhooks(): Promise<IWebhook[] | void> {
    const d = await api.get(`/channels/${this.id}/webhooks`, { headers: { Authorization: `Bot ${this.#client.token}` } });

    return d.data;
  };

  /**
   * @description Fetch all channel pinned messages
   * @returns {Promise<any | void>}
   */

  async fetchPinnedMessages(): Promise<any | void> {
    const d = await api.get(`/channels/${this.id}/pins`, { headers: { Authorization: `Bot ${this.#client.token}` } });

    return d.data;
  };

  /**
   * @description Follow an Announcement Channel to send messages to a target channel
   * @param {object} params - The params that will be provided 
   * @returns {Promise<IFollowedChannel>} 
   */

  async follow(params: { webhook_channel_id: string }): Promise<IFollowedChannel> {
    const d = await api.post(`/channels/${this.id}/followers`, params, { headers: { Authorization: `Bot ${this.#client.token}` } });

    return new Promise((resolve) => resolve(d.data));
  };

  /**
   * @description Set channel rate limit per user (slowmode)
   * @param {number | null} duration - The channel slowmode, pass null value to remove
   * @param {string} reason - The reason to edit the channel slowmode 
   * @returns {Promise<IChannel>}
   */

  async setSlowmode(duration: number | null, reason?: string): Promise<IChannel> {
    const d = await api.patch(`/channels/${this.id}`, { rate_limit_per_user: duration }, { headers: { Authorization: `Bot ${this.#client.token}`, 'X-Audit-Log-Reason': reason ?? null } });

    return new Promise((resolve) => resolve(d.data));
  };

  /**
   * @description Set the channel NSFW
   * @param {boolean} nsfw - Boolean value to set the channel nsfw 
   * @param {string} reason - The reason to edit the channel nsfw
   * @returns {Promise<IChannel>}
   */

  async setNSFW(nsfw: boolean, reason?: string): Promise<IChannel> {
    const d = await api.patch(`/channels/${this.id}`, { nsfw: nsfw }, { headers: { Authorization: `Bot ${this.#client.token}`, 'X-Audit-Log-Reason': reason ?? null } });

    return new Promise((resolve) => resolve(d.data));
  };

  /**
   * @description Set the channel topic
   * @param {string} topic - The topic that will be set
   * @param {string} reason - The reason to edit the channel topic
   * @returns {Promise<IChannel>}
   */

  async setTopic(topic: string, reason?: string): Promise<IChannel> {
    const d = await api.patch(`/channels/${this.id}`, { topic: topic }, { headers: { Authorization: `Bot ${this.#client.token}`, 'X-Audit-Log-Reason': reason ?? null } });

    return new Promise((resolve) => resolve(d.data));
  };

  /**
   * @description Fetch the channel invites
   * @returns {Promise<IInvite[]>}
   */

  async fetchInvites(): Promise<IInvite[]> {
    const d = await api.get(`/channels/${this.id}/invites`, { headers: { Authorization: `Bot ${this.#client.token}` } });

    return d.data;
  };

  /**
   * @description Set channel parent
   * @param {string} parent - The channel parent id
   * @returns {Promise<IChannel>}
   */

  async setParent(parentId: string, reason?: string): Promise<IChannel> {
    const d = await api.patch(`/channels/${this.id}`, { parent_id: parentId }, { headers: { Authorization: `Bot ${this.#client.token}` } });

    return new Promise((resolve) => resolve(d.data));
  };
};