import { IMessage } from "./IMessage";
import { RawUserData } from "./IRawUserData";
import { Snowflake } from "../types/Snowflake";
import { GuildRoleData } from "./IGuildRoleData";
import { AttachmentData } from "./IAttachmentData";
import { GuildMemberData } from "./IGuildMemberData";
import { GuildChannelData } from "./IGuildChannelData";

export interface InteractionPayloadResolvedData {
    users?: {
        [userId: Snowflake]: RawUserData;
    };
    members?: {
        [memberId: Snowflake]: Omit<GuildMemberData, 'user' | 'deaf' | 'mute'>;
    };
    roles?: {
        [roleId: Snowflake]: GuildRoleData;
    };
    channels?: {
        [channelId: Snowflake]: Pick<GuildChannelData, 'id' | 'name' | 'type' | 'permissions' | 'parent_id'>;
    };
    messages?: {
        [messageId: Snowflake]: Partial<IMessage>;
    };
    attachments?: {
        [attachmentId: Snowflake]: AttachmentData;
    };
};