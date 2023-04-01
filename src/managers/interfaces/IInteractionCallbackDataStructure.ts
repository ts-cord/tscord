import { IEmbed } from "../../interfaces/IEmbed";
import { IActionRow } from "../../interfaces/IActionRow";
import { IAttachment } from "../../interfaces/IAttachment";
import { IAllowedMentions } from "../../interfaces/IAllowedMentions";

export interface IInteractionCallbackDataStructure {
    tts?: boolean,
    content?: string,
    embeds?: IEmbed[],
    allowed_mentions?: IAllowedMentions[],
    flags?: number,
    components?: IActionRow[],
    attachments?: IAttachment[],
    ephemeral?: boolean
};