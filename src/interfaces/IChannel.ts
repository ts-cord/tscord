import { IUser } from "./IUser";
import { IOverwrite } from "./IOverwrite";
import { IDefaultReaction } from "./IDefaultReaction";
import { IForumChannelTag } from "./IForumChannelTag";

export interface IChannel {
    id: string,
    type: number,
    guild_id?: string,
    position?: number,
    permission_overwrites?: IOverwrite[],
    name?: string,
    topic?: string,
    nsfw?: boolean,
    last_message_id?: string,
    bitrate?: number,
    user_limit?: number,
    rate_limit_per_user?: number,
    recipients?: IUser[],
    icon?: string,
    managed?: boolean,
    parent_id?: string,
    last_pin_timestamp?: number,
    rtc_region?: string,
    video_quality_mode?: number,
    message_count?: number,
    member_count?: number,
    default_auto_archive_duration?: number,
    permissions?: string,
    flags?: number,
    total_message_sent?: number,
    available_tags?: IForumChannelTag[],
    applied_tags?: string[],
    default_reaction_emoji?: IDefaultReaction,
    default_thread_rate_limit_per_user?: number,
    default_sort_order?: number,
    default_forum_layout?: number
};