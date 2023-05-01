import { Snowflake } from "../types/Snowflake";
import { ComponentTypes } from "../props/ComponentTypes";
import { InteractionOptions } from "./IInteractionOptions";
import { InteractionPayloadResolvedData } from "./IInteractionPayloadResolvedData";

export interface IInteractionData {
    id: Snowflake;
    name: string;
    type: number;
    resolved?: InteractionPayloadResolvedData;
    options?: Array<InteractionOptions>;
    guild_id?: Snowflake;
    target_id?: Snowflake;
    custom_id?: string;
    component_type?: ComponentTypes;
};