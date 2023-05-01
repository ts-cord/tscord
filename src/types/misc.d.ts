import { ActionRowData } from "../interfaces/IActionRowData";
import { ButtonData } from "../interfaces/IButtonData";
import { ContextMenuData } from "../interfaces/IContextMenuData";
import { EmbedData } from "../interfaces/IEmbedData";
import { SelectMenuData } from "../interfaces/ISelectMenuData";
import { SlashCommandData } from "../interfaces/ISlashCommandData";
import { TextInputData } from "../interfaces/ITextInputData";
import { Snowflake } from "./Snowflake";

export type GenericBuilderTypes = ButtonData | TextInputData | SelectMenuData | ActionRowData | ContextMenuData | SlashCommandData | EmbedData;

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