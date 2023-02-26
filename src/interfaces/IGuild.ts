import { IRole } from "./IRole";
import { IEmoji } from "./IEmoji";
import { ISticker } from "./ISticker";
import { IChannel } from "./IChannel";
import { IMember } from "./IMember";
import { IWelcomeScreen } from "./IWelcomeScreen";

import { Group } from "../entities/Group";


export interface IGuild {
    id: string,
    name: string,
    icon?: string,
    icon_hash?: string,
    splash?: string,
    discovery_splash?: string,
    owner_id: string,
    region?: string,
    afk_channel_id?: string,
    afk_timeout: number,
    widget_enabled: boolean,
    widget_channel_id?: string,
    verification_level: number,
    default_message_notifications: number,
    explicit_content_filter: number,
    roles: Group<string, IRole>,
    emojis: Group<string, IEmoji>,
    channels: Group<string, IChannel>,
    members: Group<string, IMember>,
    features: string[],
    mfa_level: number,
    application_id?: string,
    system_channel_id?: string,
    system_channel_flags: number,
    rules_channel_id?: string,
    max_presences?: number,
    max_members: number,
    vanity_url_code?: string,
    description?: string,
    banner?: string,
    premium_tier: number,
    premium_subscription_count?: number,
    preferred_locale: string,
    public_updates_channel_id?: string,
    max_video_channel_users?: number,
    approximate_member_count?: number,
    welcome_screen?: IWelcomeScreen,
    nsfw_lever: number,
    stickers?: Group<string, ISticker>,
    premium_progress_bar_enabled: boolean
};

//cade o channels fez igual o bumbum a interface