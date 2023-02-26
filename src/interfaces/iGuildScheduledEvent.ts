import { IUser } from "./IUser"

export interface iGuildScheduledEvent {
    id: string,
    guild_id: string,
    channel_id?: string,
    creator_id?: string,
    name: string,
    description?: string,
    scheduled_start_time: number,
    scheduled_end_time: number,
    privacy_level: number
    status: number
    entity_type: number,
    entity_id?: string,
    entity_metadata: {
        location?: string
    },
    creator?: IUser,
    user_count?: number,
    image?: string
};