import { User } from "../managers/User";
import { Snowflake } from "../types/Snowflake";
import { IFetchOptions } from "../managers/interfaces/IFetchOptions";

export interface FetchBanOptions extends IFetchOptions {
    after?: Snowflake;
    before?: Snowflake;
    limit?: number;
    user?: User | Snowflake;
};