import { AttachmentData } from "../types";
import { Snowflake } from "../types/Snowflake";

export class Attachment {
    public id: Snowflake;
    public name: string;
    public description: string | undefined;
    public contentType: string | undefined;
    public size: number;
    public url: string;
    public proxyURL: string;
    public height: number | undefined;
    public width: number | undefined;
    public ephemeral: boolean | undefined;

    constructor(data: AttachmentData) {
        this.id = data.id;
        this.name = data.filename;
        this.description = data.description;
        this.contentType = data.content_type;
        this.size = data.size;
        this.url = data.url;
        this.proxyURL = data.proxy_url;
        this.height = data.height;
        this.width = data.width;
        this.ephemeral = data.ephemeral;
    };
};