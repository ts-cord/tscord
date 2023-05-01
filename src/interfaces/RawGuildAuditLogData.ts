import { Snowflake } from "../types/Snowflake";
import { AuditLogTypes } from "../props/AuditLogTypes";
import { OptionAuditEntryInfoData } from "./OptionalAuditEntryInfoData";

export interface RawGuildAuditLogData {
    target_id?: Snowflake;
    changes?: Array<{
        new_value?: unknown; //change later
        old_valud?: unknown; //change too
        key: string;
    }>;
    user_id: Snowflake;
    id: Snowflake;
    action_type: AuditLogTypes;
    options?: OptionAuditEntryInfoData;
    reason?: string;
};