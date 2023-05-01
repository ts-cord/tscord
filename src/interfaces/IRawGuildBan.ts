import { RawUserData } from "./IRawUserData";

export interface IRawGuildBan {
    reason?: string;
    user: RawUserData;
};