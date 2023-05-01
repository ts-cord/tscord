import { RawUserData } from "./IRawUserData";
import { RawGuildData } from "./IRawGuildData";
import { IApplication } from "./IApplication";
import { GuildChannelData } from "./IGuildChannelData";
import { GuildScheduledEvent } from "./IGuildScheduledEvent";
import { RawInviteStageInstance } from "./IRawInviteStageInstance";

export interface RawGuildInviteData {
    code: string;
    guild?: RawGuildData;
    channel?: GuildChannelData;
    invites?: RawUserData;
    target_type?: number;
    target_user?: RawUserData;
    target_application?: IApplication;
    approximate_presence_count?: number;
    approximate_member_count?: number;
    expires_at: number;
    stage_instace?: RawInviteStageInstance;
    guild_scheduled_event?: GuildScheduledEvent;
};