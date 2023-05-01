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

export interface RawApplicationCommandData {
    id: Snowflake;
    type: ApplicationCommandTypes | ContextMenuTypes;
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

export interface ApplicationCommandData extends Omit<RawApplicationCommandData, 'version' | 'id' | 'application_id' | 'guild_id'> {};

export enum ContextMenuTypes {
    User = 2,
    Message
};

export interface ContextMenuData extends Omit<ApplicationCommandData, 'description' | 'description_localizations'> {};