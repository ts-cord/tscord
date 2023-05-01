import { GuildMemberData } from "./IGuildMemberData";
import { Snowflake } from "../types/Snowflake";

export interface VoiceUserStateData {
    guild_id?: Snowflake;
    channel_id?: Snowflake;
    user_id: Snowflake;
    member?: GuildMemberData;
    session_id?: Snowflake;
    deaf: boolean;
    mute: boolean;
    self_deaf: boolean;
    self_mute: boolean;
    self_stream?: boolean;
    self_video: boolean;
    suppress: boolean;
    request_to_speak_timestamp: number;
};