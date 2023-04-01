import { IRole } from "../../interfaces/IRole";
import { IUser } from "../../interfaces/IUser";
import { IMember } from "../../interfaces/IMember";
import { IChannel } from "../../interfaces/IChannel";
import { IMessage } from "../../interfaces/IMessage";
import { IAttachment } from "../../interfaces/IAttachment";

export interface IResolvedData {
    users?: {
        [key: string]: IUser
    },
    members?: {
        [key: string]: IMember
    },
    roles?: {
        [key: string]: IRole
    },
    channels?: {
        [key: string]: IChannel
    },
    messages?: {
        [key: string]: IMessage
    },
    attachments?: {
        [key: string]: IAttachment
    }
};