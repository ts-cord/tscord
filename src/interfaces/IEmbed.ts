import { IEmbedImage } from "./IEmbedImage";
import { IEmbedField } from "./IEmbedField";
import { IEmbedVideo } from "./IEmbedVideo";
import { IEmbedFooter } from "./IEmbedFooter";
import { IEmbedAuthor } from "./IEmbedAuthor";
import { IEmbedProvider } from "./IEmbedProvider";
import { IEmbedThumbnail } from "./IEmbedThumbnail";

export interface IEmbed {
    title?: string,
    type?: string,
    description?: string,
    url?: string,
    timestamp?: number,
    color?: string,
    footer?: IEmbedFooter,
    image?: IEmbedImage,
    thumbnail?: IEmbedThumbnail,
    video?: IEmbedVideo,
    provider?: IEmbedProvider,
    author?: IEmbedAuthor,
    fields?: IEmbedField[]
};