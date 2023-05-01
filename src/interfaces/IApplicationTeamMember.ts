import { RawUserData } from "./IRawUserData";
import { Snowflake } from "../types/Snowflake";

export interface TeamMember {
    membership_state: number;
    permissions?: string[];
    team_id: Snowflake;
    user: RawUserData;
};