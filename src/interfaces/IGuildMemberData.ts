import { RawUserData } from "./IRawUserData";

export interface GuildMemberData {
    user?: RawUserData;
    nick?: string;
    avatar?: string;
    roles: string[];
    joined_at: number;
    premium_sice?: number;
    deaf: boolean;
    mute: boolean;
    flags: number;
    pending?: boolean;
    permissions?: string;
    communication_disabled_until?: number;
};