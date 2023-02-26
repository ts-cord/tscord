import { IEmbed } from "../interfaces/IEmbed";
import { EmbedTypes } from "../types/EmbedTypes";
import { IEmbedField } from "../interfaces/IEmbedField";
import { IEmbedImage } from "../interfaces/IEmbedImage";
import { IEmbedVideo } from "../interfaces/IEmbedVideo";
import { IEmbedFooter } from "../interfaces/IEmbedFooter";
import { IEmbedAuthor } from "../interfaces/IEmbedAuthor";
import { IEmbedThumbnail } from "../interfaces/IEmbedThumbnail";
import { IEmbedProvider } from "../interfaces/IEmbedProvider";

export class EmbedContructor {
    data: IEmbed = { type: 'rich' };

    constructor(){};
    
    setColor(color: string): EmbedContructor {
        this.data.color = color;

        return this;
    };
    setDescription(description: string): EmbedContructor {
        this.data.description = description;

        return this;
    };
    setTitle(title: string): EmbedContructor {
        this.data.title = title;

        return this;
    };
    setURL(url: string): EmbedContructor {
        this.data.url = url;

        return this;
    };
    setTimestamp(ms: number): EmbedContructor {
        this.data.timestamp = ms;

        return this;
    };
    setFooter(footer: IEmbedFooter): EmbedContructor {
        this.data.footer = footer;

        return this;
    };
    setImage(image: IEmbedImage): EmbedContructor {
        this.data.image = image;

        return this;
    };
    setThumbail(thumbnail: IEmbedThumbnail): EmbedContructor {
        this.data.thumbnail = thumbnail;

        return this;
    };
    setVideo(video: IEmbedVideo): EmbedContructor {
        this.data.video = video;

        return this;
    };
    setAuthor(author: IEmbedAuthor): EmbedContructor {
        this.data.author = author;

        return this;
    };
    addFields(...fields: IEmbedField[]): EmbedContructor {
        this.data.fields?.length ? this.data.fields.concat(fields) : this.data.fields = fields;

        return this;
    };
    setFields(...fields: IEmbedField[]): EmbedContructor {
        this.data.fields = fields;

        return this;
    };
    JSON(): IEmbed {
        return this.data;
    };
    setType(type: EmbedTypes): EmbedContructor {
        this.data.type = type;

        return this;
    };
    setProvider(provider: IEmbedProvider): EmbedContructor {
        this.data.provider = provider;

        return this;
    };

    static MaxTitleLength: number = 256;
    static MaxFieldsLength: number = 25;
    static MaxFieldNameLength: number = 256;
    static MaxAuthorNameLength: number = 256;
    static MaxFieldValueLength: number = 1024;
    static MaxFooterTextLength: number = 2048;
    static MaxDescriptionLength: number = 4096;
};