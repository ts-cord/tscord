import { IMember } from "./IMember";

export interface IVoiceUserState {
    guild_id?: string,
    channel_id?: string,
    user_id: string,
    member?: IMember,
    session_id?: string,
    deaf: boolean,
    mute: boolean,
    self_deaf: boolean,
    self_mute: boolean,
    self_stream?: boolean,
    self_video: boolean,
    suppress: boolean,
    request_to_speak_timestamp: number
};