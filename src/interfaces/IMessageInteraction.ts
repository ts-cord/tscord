import { IUser } from "./IUser";
import { IMember } from "./IMember";

export interface IMessageInteraction {
    id: string,
    type: number,
    name: string,
    user: IUser,
    member?: IMember
};