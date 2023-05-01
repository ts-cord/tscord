import { EmbedImage } from "./IEmbedImage";
import { EmbedField } from "./IEmbedField";
import { EmbedVideo } from "./IEmbedVideo";
import { EmbedFooter } from "./IEmbedFooter";
import { EmbedAuthor } from "./IEmbedAuthor";
import { EmbedProvider } from "./IEmbedProvider";
import { EmbedThumbnail } from "./IEmbedThumbnail";

export interface EmbedData {
    title?: string;
    type?: string;
    description?: string;
    url?: string;
    timestamp?: number;
    color?: string;
    footer?: EmbedFooter;
    image?: EmbedImage;
    thumbnail?: EmbedThumbnail;
    video?: EmbedVideo;
    provider?: EmbedProvider;
    author?: EmbedAuthor;
    fields?: EmbedField[];
};