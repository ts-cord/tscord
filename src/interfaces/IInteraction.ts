import { IUser } from "./IUser";
import { IMember } from "./IMember";
import { IMessage } from "./IMessage";
import { IInteractionData } from "./IInteractionData";
import { Guild } from '../managers/Guild';

export interface IInteraction {
    id: string,
    application_id: string,
    type: number,
    data?: IInteractionData,
    guild: Guild,
    channel_id?: string,
    member?: IMember,
    user?: IUser,
    token: string,
    version: number,
    message?: IMessage,
    app_permissions?: string,
    locale?: string,
    guild_locale?: string
};