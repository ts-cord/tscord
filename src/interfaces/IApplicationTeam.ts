import { Snowflake } from "../types/Snowflake";
import { TeamMember } from "./IApplicationTeamMember";

export interface ApplicationTeam {
    icon: string;
    id: Snowflake;
    members: TeamMember[];
    name: string;
    owner_user_id: Snowflake;
};