import { EmbedTypes } from "../props/EmbedTypes";
import { EmbedData } from "../interfaces/IEmbedData";
import { EmbedField } from "../interfaces/IEmbedField";
import { EmbedImage } from "../interfaces/IEmbedImage";
import { EmbedVideo } from "../interfaces/IEmbedVideo";
import { EmbedFooter } from "../interfaces/IEmbedFooter";
import { EmbedAuthor } from "../interfaces/IEmbedAuthor";
import { EmbedProvider } from "../interfaces/IEmbedProvider";
import { EmbedThumbnail } from "../interfaces/IEmbedThumbnail";

export class EmbedBuilder {
    data: EmbedData = { type: undefined };

    constructor(data?: EmbedData) {
        this.data = data ?? this.data;
    };
    
    setColor(color: string): this {
        this.data.color = color;

        return this;
    };
    setDescription(description: string): this {
        this.data.description = description;

        return this;
    };
    setTitle(title: string): this {
        this.data.title = title;

        return this;
    };
    setURL(URL: string): this {
        this.data.url = URL;

        return this;
    };
    setTimestamp(timestamp: number): this {
        this.data.timestamp = timestamp;

        return this;
    };
    setFooter(footer: EmbedFooter | string): this {
        this.data.footer = typeof footer === 'string' ? { text: footer } : footer;

        return this;
    };
    setImage(image: EmbedImage | string): this {
        this.data.image = typeof image === 'string' ? { url: image } : image;

        return this;
    };
    setThumbail(thumbnail: EmbedThumbnail | string): this {
        this.data.thumbnail = typeof thumbnail === 'string' ? { url: thumbnail } : thumbnail;

        return this;
    };
    setVideo(video: EmbedVideo | string): this {
        this.data.video = typeof video === 'string' ? { url: video } : video;

        return this;
    };
    setAuthor(author: EmbedAuthor | string): this {
        this.data.author = typeof author === 'string' ? { name: author } : author;

        return this;
    };
    addFields(...fields: Array<EmbedField>): this {
        this.data.fields ? this.data.fields.push(...fields) : this.data.fields = fields;

        return this;
    };
    setFields(...fields: Array<EmbedField>): this {
        this.data.fields = fields;

        return this;
    };
    JSON(): this['data'] {
        return this.data;
    };
    setType(type: EmbedTypes): this {
        this.data.type = type;

        return this;
    };
    setProvider(provider: EmbedProvider | string): this {
        this.data.provider = typeof provider === 'string' ? { name: provider } : provider;

        return this;
    };
    setDataFrom(JSONData: EmbedData): this {
        this.data = JSONData;

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