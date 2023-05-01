import { RawUserData } from "./IRawUserData";
import { Snowflake } from "../types/Snowflake";
import { StickerTypes } from "../props/StickerTypes";

export interface RawGuildStickerData {
    id: Snowflake;
    pack_id?: Snowflake;
    name: string;
    description?: string;
    tags: string;
    asset?: string;
    type: StickerTypes;
    format_type: number;
    available?: boolean;
    guild_id?: Snowflake;
    user?: RawUserData;
    sort_value?: number;
};