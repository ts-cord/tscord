import { RawGuildEmoji } from "./IRawGuildEmoji";

export interface RawReactionEmoji {
    count: number;
    me: boolean;
    emoji: RawGuildEmoji;
};