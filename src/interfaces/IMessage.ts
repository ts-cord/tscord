import { IEmbed } from "./IEmbed";
import { IRole } from "./IRole";
import { IUser } from "./IUser";
import { IChannel } from "./IChannel";
import { ISticker } from "./ISticker";
import { IReaction } from "./IReaction";
import { Guild } from '../managers/Guild';
import { IAttachment } from "./IAttachment";
import { IApplication } from "./IApplication";
import { Channel } from "../managers/Channel";
import { IChannelMention } from "./IChannelMention";
import { IMessageActivity } from './IMessageActivity';
import { IMessageReference } from "./IMessageReference";
import { IMessageInteraction } from "./IMessageInteraction";
import { IRoleSubscriptionData } from "./IRoleSubscriptionData";

export interface IMessage {
    id: string,
    guild: Guild,
    channel: Channel,
    author: IUser,
    content?: string,
    timestamp: number,
    edited_timestamp?: number,
    tts: boolean,
    mention_everyone: boolean,
    mentions: IUser[],
    mention_roles: Pick<IRole, 'id'>[],
    mention_channels?: IChannelMention[],
    attachments?: IAttachment[],
    embeds: IEmbed[],
    reactions?: IReaction[],
    nonce?: string | number,
    pinned: boolean,
    webhook_id?: string,
    type: number,
    activity?: IMessageActivity,
    application?: IApplication,
    application_id?: string,
    message_reference?: IMessageReference,
    flags?: number,
    referenced_message?: IMessage,
    interaction?: IMessageInteraction,
    thread?: IChannel,
    components?: any[],
    sticker_items?: Pick<ISticker, 'id' | 'name' | 'format_type'>[],
    stickers: ISticker[],
    position?: number,
    role_subscription_data?: IRoleSubscriptionData
};