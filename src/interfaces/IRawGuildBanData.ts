import { User } from "../managers/User";
import { Guild } from "../managers/Guild";

export interface RawGuildBanData {
    user: User;
    guild?: Guild;
    reason?: string;
};