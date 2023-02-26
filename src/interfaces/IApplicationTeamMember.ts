import { IUser } from "./IUser";

export interface IApplicationTeamMember {
    membership_state: number,
    permissions?: string[],
    team_id: string,
    user: IUser
};