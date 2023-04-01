import { Group } from "../entities/Group";
import { Client } from "../entities/Client";
import { IRole } from "../interfaces/IRole";
import { IEmoji } from "../interfaces/IEmoji";
import { IGuild } from "../interfaces/IGuild";
import { IMember } from "../interfaces/IMember";
import { IChannel } from "../interfaces/IChannel";
import { IViewOptions } from "../interfaces/IViewOptions";

import { api } from "../constants/Api";
import * as constants from '../constants/constants.json';

import { ViewsType } from "../types/ViewsType";

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
  public channels: Group<string, IChannel>;
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
    this.id = props.id
    this.owner_id = props.owner_id
    this.afk_timeout = props.afk_timeout
    this.name = props.name
    this.widget_enabled = props.widget_enabled
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
    this.#client = client
    this.#auth = {
      headers: {
        'Authorization': `Bot ${this.#client.token}`
      }
    };

    Object.assign(this, props);
  };
  getViewURL({ type, options }: { type: ViewsType, options: IViewOptions }) {
    if (!type || typeof type !== 'string') return;
    const format = options?.format ? options.format : 'png'
    const url = `https://cdn.discordapp.com/${this.id}/${this[type]}s`
    const formated_url = `${url}.${format}`
    
    return formated_url
  };

  bannerImageURL(options?: IViewOptions) {
    if (!this.banner) return null
    const format = options?.format ? options?.format : 'webp'
    const size = options?.size ? `?size=${options?.size}` : ''
    const url = `https://cdn.discord.app/${this.id}/banners/${this.banner}.${format}${size}}`

    return url
  };

  async disableInvites() { };
  
  async fetchAudiLogs() { };
  
  async leave() {
    return await api.delete(`/users/@me/guilds/${this.id}`, this.#auth);
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
};