import { Locales } from "./index";
import { User } from "../structures/User";
import { Snowflake } from "./Snowflake";

export interface RawDiscordAPIUserData {
    id: Snowflake;
    username: string;
    discriminator: string;
    avatar?: string;
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    banner?: string;
    accent_color?: string;
    locale?: keyof Locales;
    verified?: boolean;
    email?: string;
    flags?: UserFlags;
    premium_type?: UserPremiumTypes;
    public_flags?: UserFlags;
};

export interface ClientUserEditOptions {
    username?: string;
    avatar?: string;
};

export type UserResolvable = User | Snowflake;

export interface RawUser extends RawDiscordAPIUserData {
    creation_timestamp: number;
    creation_date: Date;
};

export enum UserFlags {
    Staff = 1 << 0,
    Partner = 1 << 1,
    Hypesquad = 1 << 2,
    BugHunterLevel1 = 1 << 3,
    HypesquadOnlineHouse1 = 1 << 6,
    HypesquadOnlineHouse2 = 1 << 7,
    HypesquadOnlineHouse3 = 1 << 8,
    PremiumEarlySupporter = 1 << 9,
    TeamPseudoUser = 1 << 10,
    BugHunterLevel2 = 1 << 14,
    VerifiedBot = 1 << 16,
    VerifiedDeveloper = 1 << 17,
    CertifiedModeration = 1 << 18,
    BotHTPPInteractions = 1 << 19,
    ActiveDeveloper = 1 << 22
};

export enum UserPremiumTypes {
    None,
    NitroClassic,
    Nitro,
    NitroBasic
};