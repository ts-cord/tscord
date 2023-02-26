import { IUser } from "./IUser";
import { IGuild } from "./IGuild";
import { IChannel } from "./IChannel";
import { IApplication } from "./IApplication";
import { iGuildScheduledEvent } from "./iGuildScheduledEvent";
import { IInviteStageInstance } from "./IInviteStageInstance";

export interface IInvite {
    code: string,
    guild?: IGuild,
    channel?: IChannel,
    invites?: IUser,
    target_type?: number,
    target_user?: IUser,
    target_application?: IApplication,
    approximate_presence_count?: number,
    approximate_member_count?: number,
    expires_at: number,
    stage_instace?: IInviteStageInstance,
    guild_scheduled_event?: iGuildScheduledEvent
};