import { User } from "../managers/User";
import { Snowflake } from "../types/Snowflake";
import { GuildRole } from "../managers/GuildRole";

export interface GuildEmojiData {
    id: Snowflake;
    name: string;
    roles?: Array<GuildRole>;
    user?: User;
    required_colons?: boolean;
    managed?: boolean;
    animated?: boolean;
    available?: boolean;
};