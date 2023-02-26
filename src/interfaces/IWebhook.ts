import { IUser } from "./IUser";
import { IGuild } from "./IGuild";
import { IChannel } from "./IChannel";

export interface IWebhook {
    id: string,
    type: number,
    guild_id?: string,
    channel_id?: string,
    user?: IUser,
    name?: string,
    avatar?: string,
    token?: string,
    application_id?: string,
    source_guild?: IGuild,
    source_channel?: IChannel,
    url?: string
};