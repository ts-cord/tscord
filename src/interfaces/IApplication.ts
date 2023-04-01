import { IUser } from "./IUser";
import { IInstallParams } from "./IInstallParams";
import { IApplicationTeam } from "./IApplicationTeam";

export interface IApplication {
    id: string,
    name?: string,
    icon?: string,
    description?: string,
    rpc_origins?: string[],
    bot_public?: boolean,
    bot_require_code_grant?: boolean,
    terms_of_service_url?: string,
    privacy_policy_url?: string,
    owner?: IUser,
    verify_key?: string,
    team?: IApplicationTeam,
    guild_id?: string,
    primary_sku_id?: string,
    slug?: string,
    cover_image?: string,
    flags?: number,
    tags?: string[],
    install_params?: IInstallParams,
    custom_install_url?: string,
    role_connections_verification_url?: string
};