import { IAttachment } from "../../interfaces/IAttachment";
import { IEmbed } from "../../interfaces/IEmbed";

export interface IInteractionCallbackDataStructure {
    tts?: boolean,
    content?: string,
    embeds?: IEmbed[],
    allowed_mentions?: any[], //fazer interface depois
    flags?: number,
    components?: any[], //fazer também
    attachments?: IAttachment[],
};