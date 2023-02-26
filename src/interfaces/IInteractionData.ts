import { IInteractionOptions } from "./IInteractionOptions"

export interface IInteractionData {
    id: string,
    name: string,
    type: number,
    resolved?: object //tem q fazer,
    options?: IInteractionOptions[],
    guild_id?: string,
    target_id?: string
};