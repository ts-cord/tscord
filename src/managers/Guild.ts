import { Channel } from "./Channel";
import { api } from "../constants/Api";
import { Group } from "../entities/Group";
import { Client } from "../entities/Client";
import { IRole } from "../interfaces/IRole";
import { IEmoji } from "../interfaces/IEmoji";
import { IGuild } from "../interfaces/IGuild";
import { IMember } from "../interfaces/IMember";
import { IWebhook } from "../interfaces/IWebhook";
import { IViewOptions } from "../interfaces/IViewOptions";
import { IEditGuildOptions } from "./interfaces/IEditGuildOptions";

export class Guild implements IGuild {
  #client: Client;
  #auth: object;

  public readonly id: string;
  public owner_id: string;
  public afk_timeout: number;
  public name: string;
  public widget_enabled: boolean;
  public verification_level: number;
  public default_message_notifications: number;
  public explicit_content_filter: number;
  public roles: Group<string, IRole>;
  public channels: Group<string, Channel>;
  public emojis: Group<string, IEmoji>;
  public members: Group<string, IMember>;
  public features: string[];
  public mfa_level: number;
  public system_channel_flags: number;
  public premium_tier: number;
  public max_members: number;
  public preferred_locale: string;
  public nsfw_lever: number;
  public premium_progress_bar_enabled: boolean;
  public banner?: string | undefined;
  public splash?: string | undefined;
  public icon?: string | undefined;


  constructor(props: IGuild, client: Client) {
    this.id = props.id;
    this.owner_id = props.owner_id;
    this.afk_timeout = props.afk_timeout;
    this.name = props.name;
    this.widget_enabled = props.widget_enabled;
    this.verification_level = props.verification_level;
    this.default_message_notifications = props.default_message_notifications;
    this.explicit_content_filter = props.explicit_content_filter;
    this.roles = props.roles;
    this.channels = props.channels;
    this.emojis = props.emojis;
    this.members = props.members;
    this.features = props.features;
    this.mfa_level = props.mfa_level;
    this.system_channel_flags = props.system_channel_flags;
    this.premium_tier = props.premium_tier;
    this.max_members = props.max_members;
    this.preferred_locale = props.preferred_locale;
    this.nsfw_lever = props.nsfw_lever;
    this.premium_progress_bar_enabled = props.premium_progress_bar_enabled;
    this.#client = client;
    this.#auth = {
      headers: {
        'Authorization': `Bot ${this.#client.token}`
      }
    };

    Object.assign(this, props);
  };

  bannerImageURL(options?: IViewOptions) {
    if (!this.banner) return null;

    const format = options?.format ? options?.format : 'webp';
    const size = options?.size ? `?size=${options?.size}` : '';
    const url = `https://cdn.discord.app/${this.id}/banners/${this.banner}.${format}${size}`;

    return url;
  };

  /**
   * @description Returns guild audit log
   * @param {object} query - Some parameters can be passed to filter specific audit logs
   * @returns {Promise<object | void>}
   */

  async fetchAuditLogs(query?: { user_id?: string, action_type?: number, before?: string, after?: string, limit?: number }): Promise<object | void> {
    const d = await api.get(`/guilds/${this.id}/audit-logs`, { headers: { Authorization: `Bot ${this.#client.token}` }, data: query });

    return d.data;
  };

  /**
   * @description Leave a guild
   * @returns {Promise<void>}
   */

  async leave(): Promise<void> {
    const d = await api.delete(`/users/@me/guilds/${this.id}`, this.#auth);

    return void d.data;
  };

  async delete() {
    return await api.delete(`/guilds/${this.id}`, this.#auth);
  };

  iconImageURL(options?: IViewOptions): string | null {
    if (!this.icon) return null;

    return `https://cdn.discordapp.com/${this.id}/icons/${this.icon}.${options?.format ?? 'png'}?size=${options?.size ?? 1024}`;
  };

  splashImageURL(options?: IViewOptions): string | null {
    if (!this.splash) return null;

    return `https://cdn.discordapp.com/${this.id}/splashs/${this.splash}.${options?.format ?? 'png'}?size=${options?.size ?? 1024}`;
  };

  /**
   * @description Returns an array of guild webhooks
   * @returns {Promise<IWebhook[] | void>}
   */

  async fetchAllWebhooks(): Promise<IWebhook[] | void> {
    const d = await api.get(`/guilds/${this.id}/webhooks`, this.#auth);

    return d.data;
  };
  async setName(name: string, reason?: string) {
    const d = await api.patch(`/guilds/${this.id}`, { name: name }, { headers: { Authorization: `Bot ${this.#client.token}`, 'X-Audit-Log-Reason': reason ?? null } });

    return new Promise((resolve) => resolve(d.data));
  };
  async setIcon(icon: string, reason?: string) {
    const d = await api.patch(`/guilds/${this.id}`, { icon: icon }, { headers: { Authorization: `Bot ${this.#client.token}`, 'X-Audit-Log-Reason': reason ?? null } });

    return new Promise((resolve) => resolve(d.data));
  };
  async edit(params: IEditGuildOptions, reason?: string) {
    const d = await api.patch(`/guilds/${this.id}`, params, { headers: { Authorization: `Bot ${this.#client.token}`, 'X-Audit-Log-Reason': reason ?? null } });

    return new Promise((resolve) => resolve(d.data));
  };
};