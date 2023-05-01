import { Snowflake } from "../types/Snowflake";

export interface AttachmentData {
    id: Snowflake;
    filename: string;
    description?: string;
    content_type?: string;
    size: number;
    url: string;
    proxy_url: string;
    height?: number;
    width?: number;
    ephemeral?: boolean;
};