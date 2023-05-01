import { RawUserData } from "./IRawUserData";
import { Snowflake } from "../types/Snowflake";
import { InstallParams } from "./IInstallParams";
import { ApplicationTeam } from "./IApplicationTeam";

export interface Application {
    id: Snowflake;
    name?: string;
    icon?: string;
    description?: string;
    rpc_origins?: string[];
    bot_public?: boolean;
    bot_require_code_grant?: boolean;
    terms_of_service_url?: string;
    privacy_policy_url?: string;
    owner?: RawUserData;
    verify_key?: string;
    team?: ApplicationTeam;
    guild_id?: Snowflake;
    primary_sku_id?: Snowflake;
    slug?: string;
    cover_image?: string;
    flags?: number;
    tags?: string[];
    install_params?: InstallParams;
    custom_install_url?: string;
    role_connections_verification_url?: string;
};