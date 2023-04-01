import { IInteractionOptions } from "./IInteractionOptions"

export interface IInteractionData {
    id: string,
    name: string,
    type: number,
    resolved?: object,
    options?: IInteractionOptions[],
    guild_id?: string,
    target_id?: string,
    custom_id?: string,
    component_type?: number
};