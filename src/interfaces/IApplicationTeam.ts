import { IApplicationTeamMember } from "./IApplicationTeamMember";

export interface IApplicationTeam {
    icon: string,
    id: string,
    members: IApplicationTeamMember[],
    name: string,
    owner_user_id: string
};