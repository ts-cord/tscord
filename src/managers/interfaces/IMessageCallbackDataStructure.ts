import { IEmbed } from "../../interfaces/IEmbed";
import { IAttachment } from "../../interfaces/IAttachment";

export interface IMessageCallbackDataStructure {
    tts?: boolean,
    content?: string,
    embeds?: IEmbed[],
    message_reference?: {
      message_id?: string,
      guild_id?: string,
      channel_id?: string
    },
    sticker_ids?: string[],
    allowed_mentions?: any[], 
    flags?: number,
    components?: any[], 
    attachments?: IAttachment[],
};