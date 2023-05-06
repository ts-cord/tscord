import type { Locales } from "./misc";
import { Snowflake } from "./Snowflake";
import type { RawDiscordAPIUserData } from "./user";

export interface RawApplication {
    id: Snowflake;
    name: string;
    icon?: string;
    description: string;
    rpc_origins: Array<string>;
    bot_public: boolean;
    bot_require_code_grant: boolean;
    terms_of_service_url?: string;
    privacy_policy_url?: string;
    owner?: Partial<RawDiscordAPIUserData>;
    // Summary is deprecated and will be removed in v11
    summary: string;
    verify_key: string;
    team: ApplicationTeam;
    guild_id?: Snowflake;
    primary_sku_id?: Snowflake;
    slug?: string;
    cover_image?: string;
    flags?: ApplicationFlags;
    install_params: InstallParams;
    custom_install_url?: string;
    role_connections_verification_url?: string;
};

export interface InstallParams {
    scopes: Array<string>;
    permissions: string;
};

export enum ApplicationFlags {
    ApplicationAutoModerationRuleCreateBadge = 1 << 6,
    GatewayPresence = 1 << 12,
    GateawyPresenceLimited = 1 << 13,
    GatewayGuildMembers = 1 << 14,
    GatewayGuildMembersLimited = 1 << 15,
    VerificationPendingGuildLimit = 1 << 16,
    Embedded = 1 << 17,
    GatewayMessageContent = 1 << 18,
    GatewayMessageContentLimited = 1 << 19,
    ApplicationCommandBadge = 1 << 23
};

export interface ApplicationTeam {
    icon?: string;
    id: Snowflake;
    members: Array<ApplicationTeamMember>;
    name: string;
    owner_user_id: Snowflake;
};

export enum MemberShipStateEnum {
    Invited = 1,
    Accepted
};

export interface ApplicationTeamMember {
    membership_state: MemberShipStateEnum;
    permissions: Array<'*'>;
    team_id: Snowflake;
    user: Pick<RawDiscordAPIUserData, 'avatar' | 'discriminator' | 'id' | 'username'>;
};

export interface ApplicationRoleConnectionMetadata {
    type: ApplicationRoleConnectionMetadataType;
    key: string;
    name: string;
    name_localizations?: Locales;
    description: string;
    description_localizations?: Locales;
};

export enum ApplicationRoleConnectionMetadataType {
    IntegerLessThanOrEqual = 1,
    IntegerGreaterThanOrEqual,
    IntegerEqual,
    IntegerNotEqual,
    DatetimeLessThanOrEqual,
    DatetimeGreaterThanOrEqual,
    BooleanEqual,
    BooleanNotEqual
};

export interface ApplicationRoleConnectionMetadataEditOptions extends ApplicationRoleConnectionMetadata {};