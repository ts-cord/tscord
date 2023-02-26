import { IUser } from "./IUser";
import { IRole } from "./IRole";

export interface IEmoji {
    id: string,
    name: string,
    roles?: IRole[],
    user?: IUser,
    required_colons?: boolean,
    managed?: boolean,
    animanted?: boolean,
    available?: boolean
};