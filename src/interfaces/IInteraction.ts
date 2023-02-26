import { IUser } from "./IUser";
import { IMember } from "./IMember";
import { IMessage } from "./IMessage";
import { IInteractionData } from "./IInteractionData";

export interface IInteraction {
    id: string,
    application_id: string,
    type: number,
    data?: IInteractionData,
    guild_id?: string,
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