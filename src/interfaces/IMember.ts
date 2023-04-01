import { IRole } from "./IRole";
import { IUser } from "./IUser";

export interface IMember {
    user?: IUser,
    nick?: string,
    avatar?: string,
    roles: string[],
    joined_at: number,
    premium_sice?: number,
    deaf: boolean,
    mute: boolean,
    flags: number,
    pending?: boolean,
    permissions?: string,
    communication_disabled_until?: number
};