import { IUser } from "./IUser";

export interface ISticker {
    id: string,
    pack_id?: string,
    name: string,
    description?: string,
    tags: string,
    asset?: string,
    type: number,
    format_type: number,
    available?: boolean,
    guild_id?: string,
    user?: IUser,
    sort_value?: number
};