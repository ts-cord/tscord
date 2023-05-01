import { Snowflake } from "../types/Snowflake";
import { AuditLogTypes } from "../props/AuditLogTypes";

export interface OptionAuditEntryInfoData<T extends AuditLogTypes = AuditLogTypes> {
    application_id: T extends AuditLogTypes.ApplicationCommandPermissionUpdate ? Snowflake : undefined;
    auto_moderation_rule_name: T extends AuditLogTypes.AutoModerationBlockMessage | AuditLogTypes.AutoModerationFlagToChannel | AuditLogTypes.AutoModerationUserCommunicationDisabled ? string : undefined;
    auto_moderation_rule_trigger_type: T extends AuditLogTypes.AutoModerationBlockMessage | AuditLogTypes.AutoModerationFlagToChannel | AuditLogTypes.AutoModerationUserCommunicationDisabled ? string : undefined;
    channel_id: T extends AuditLogTypes.MemberMove | AuditLogTypes.MessagePin | AuditLogTypes.MessageUnpin | AuditLogTypes.MessageDelete | AuditLogTypes.StageInstanceCreate | AuditLogTypes.StageInstanceDelete | AuditLogTypes.StageInstanceUpdate | AuditLogTypes.AutoModerationBlockMessage | AuditLogTypes.AutoModerationFlagToChannel | AuditLogTypes.AutoModerationUserCommunicationDisabled ? Snowflake : undefined;
    count: T extends AuditLogTypes.MessageDelete | AuditLogTypes.MessageBulkDelete | AuditLogTypes.MemberDisconnect | AuditLogTypes.MemberMove ? string : undefined;
    delete_member_days: T extends AuditLogTypes.MemberPrune ? string : undefined;
    id: T extends AuditLogTypes.ChannelOverwriteCreate | AuditLogTypes.ChannelOverwriteDelete | AuditLogTypes.ChannelOverwriteUpdate ? Snowflake : undefined;
    members_removed: T extends AuditLogTypes.MemberPrune ? string : undefined;
    message_id: T extends AuditLogTypes.MessagePin | AuditLogTypes.MessageUnpin ? Snowflake : undefined;
    role_name: T extends AuditLogTypes.ChannelOverwriteCreate | AuditLogTypes.ChannelOverwriteDelete | AuditLogTypes.ChannelOverwriteUpdate ? string : undefined;
    type: T extends AuditLogTypes.ChannelOverwriteCreate | AuditLogTypes.ChannelOverwriteDelete | AuditLogTypes.ChannelOverwriteUpdate ? string : undefined;
};