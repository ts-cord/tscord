import { IDefaultReaction } from "../../interfaces/IDefaultReaction";
import { IForumChannelTag } from "../../interfaces/IForumChannelTag";
import { IOverwrite } from "../../interfaces/IOverwrite";

export interface IEditChannelOptions {
    name?: string,
    type?: number,
    position?: number,
    topic?: string,
    nsfw?: boolean,
    rate_limit_per_user?: number,
    bitrate?: number,
    user_limit?: number,
    permission_overwrites?: IOverwrite[],
    parent_id?: string,
    rtc_region?: string,
    video_quality_mode?: number,
    default_auto_archive_duration?: number,
    flags?: {
        PINNED?: number,
        REQUIRE_TAG?: number
    },
    available_tags?: IForumChannelTag[],
    default_reaction_emoji?: IDefaultReaction,
    default_thread_rate_limit_per_user?: number,
    default_sort_order?: number,
    default_forum_layout?: number
};