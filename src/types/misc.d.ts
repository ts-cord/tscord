import { Snowflake } from "./Snowflake";
import { Events, MessageComponentData, ApplicationCommandData, ContextMenuData, SelectMenuData, ButtonData, EmbedData, TextInputData } from "./index";

export type GenericBuilderTypes = ButtonData | TextInputData | SelectMenuData | MessageComponentData | ContextMenuData | ApplicationCommandData | EmbedData;

export interface ViewOptions {
    format?: 'png' | 'jpeg' | 'webp' | 'gif';
    size?: number;
};

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

export interface BasicFetchOptions {
    forceFetch?: boolean;
    cache?: boolean;
};

export interface Locales {
    id?: string;
    da?: string;
    de?: string;
    "en-GB"?: string;
    UK?: string;
    "en-US"?: string;
    US?: string;
    "es-ES"?: string;
    fr?: string;
    hr?: string;
    it?: string;
    lt?: string;
    hu?: string;
    nl?: string;
    no?: string;
    pl?: string;
    "pt-BR"?: string;
    ro?: string;
    fi?: string;
    "sv-SE"?: string;
    vi?: string;
    tr?: string;
    cs?: string;
    el?: string;
    bg?: string;
    ru?: string;
    uk?: string;
    hi?: string;
    th?: string;
    "zh-CN"?: string;
    ja?: string;
    "zh-TW"?: string;
    ko?: string;
};

export type SnakeCase<S> = S extends `${infer T}${infer U}`
    ? `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${SnakeCase<U>}`
    : "";

export type DeepSnakeCase<T> = T extends object
    ? { [K in keyof T as SnakeCase<string & K>]: DeepSnakeCase<T[K]> }
    : T;