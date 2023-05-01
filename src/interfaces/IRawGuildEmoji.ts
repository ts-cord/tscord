import { RawUserData } from "./IRawUserData";
import { Snowflake } from "../types/Snowflake";
import { GuildRoleData } from "./IGuildRoleData";

export interface RawGuildEmoji {
    id: Snowflake;
    name: string;
    roles?: GuildRoleData[];
    user?: RawUserData;
    required_colons?: boolean;
    managed?: boolean;
    animated?: boolean;
    available?: boolean;
};