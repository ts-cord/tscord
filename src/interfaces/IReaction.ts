import { IEmoji } from "./IEmoji";

export interface IReaction {
    count: number,
    me: boolean,
    emoji: IEmoji
};