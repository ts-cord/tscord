import { Locales } from "./index";
import { ApplicationCommand } from "../structures/ApplicationCommand";
import { ChannelTypes } from "../props/ChannelTypes";
import { Snowflake } from "./Snowflake";
import type { BasicFetchOptions, Locales } from "./misc";
import { RawDiscordAPIUserData } from "./user";
import { GuildMemberData } from ".";

export enum ComponentTypes {
    ActionRow = 1,
    Button,
    StringSelectMenu,
    TextInput,
    UserSelectMenu,
    RoleSelectMenu,
    MentionableSelectMenu,
    ChannelSelectMenu
};

export interface MessageComponentData {
    type: ComponentTypes.ActionRow;
    components: Array<object> //do later
};

export enum MessageFlags {
    Crossposted = 1 << 0,
    IsCrossposted = 1 << 1,
    SuppressEmbed = 1 << 2,
    SourceMessageDeleted = 1 << 3,
    Urgent = 1 << 4,
    HasThread = 1 << 5,
    Ephemeral = 1 << 6,
    Loading = 1 << 7,
    FailedToMentionSomeRolesInThread = 1 << 8,
    SuppressNotifications = 1 << 12
};

export enum ApplicationCommandTypes {
    ChatInput = 1,
    User,
    Message
};

export type ApplicationCommandResolvable = ApplicationCommand | Snowflake;

export interface ApplicationCommandData {
    id: Snowflake;
    type: ApplicationCommandTypes;
    application_id: Snowflake;
    guild_id?: Snowflake;
    name: string;
    name_localizations?: Locales;
    description: string;
    description_localizations?: Locales;
    options?: Array<ApplicationCommandOptionsData>;
    default_member_permissions?: string;
    dm_permission?: boolean;
    default_permission?: boolean;
    nsfw?: boolean;
    version: string;
};

export interface MessageInteractionData {
    id: Snowflake;
    type: InteractionType;
    name: string;
    user: RawDiscordAPIUserData;
    member?: Partial<GuildMemberData>;
};

export enum InteractionType {
    Ping = 1,
    ApplicationCommand,
    MessageComponent,
    ApplicationCommandAutocomplete,
    ModalSubmit
};

export interface CreateApplicationCommandOptions extends EditApplicationCommandOptions {};
export interface EditApplicationCommandOptions extends Pick<ApplicationCommandData, 'name' | 'name_localizations' | 'description' | 'description_localizations' | 'options' | 'default_member_permissions' | 'default_permission' | 'nsfw'> {};

export enum ApplicationCommandOptionType {
    SubCommand = 1,
    SubCommandGroup,
    String,
    Integer,
    Boolean,
    User,
    Channel,
    Role,
    Mentionable,
    Number,
    Attachment
};

export interface FetchApplicationCommandOptions extends BasicFetchOptions {
    guild_id?: Snowflake;
    with_localizations?: boolean;
};

export interface ApplicationCommandOptionChoicesData {
    name: string;
    value: string | number;
    name_localizations?: Locales;
};

export interface ApplicationCommandOptionsData {
    type: ApplicationCommandOptionType;
    name: string;
    name_localizations?: Locales;
    description: string;
    description_localizations?: Locales;
    required?: boolean;
    choices?: Array<ApplicationCommandOptionChoicesData>;
    options?: Array<ApplicationCommandOptionsData>;
    channel_types?: Array<ChannelTypes>;
    min_value?: ApplicationCommandOptionsData['type'] extends ApplicationCommandOptionType.Number | ApplicationCommandOptionType.Integer ? number : never;
    max_value?: ApplicationCommandOptionsData['type'] extends ApplicationCommandOptionType.Number | ApplicationCommandOptionType.Integer ? number : never;
    min_length?: ApplicationCommandOptionsData['type'] extends ApplicationCommandOptionType.String ? number : never;
    max_length?: ApplicationCommandOptionsData['type'] extends ApplicationCommandOptionType.String ? number : never;
    autocomplete?: number;
};