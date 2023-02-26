import { IGuild } from "../interfaces/IGuild";
import { Group } from "../entities/Group";
import { IRole } from "../interfaces/IRole";
import { IChannel } from "../interfaces/IChannel";
import { IMember } from "../interfaces/IMember";
import { IEmoji } from "../interfaces/IEmoji";

export class Guild implements IGuild {
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

    constructor(props: IGuild) {
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

      Object.assign(this, props)
  }
}