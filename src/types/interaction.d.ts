import { Snowflake } from "./Snowflake";
import { ApplicationCommand } from "../structures/ApplicationCommand";
import type { GuildMemberData, Locales, BasicFetchOptions, RawDiscordAPIUserData, ChannelTypes, RawGuildRole, RawDiscordAPIChannelData, RawDiscordAPIMessageData, AttachmentData, ApplicationCommandInteractionOptionData, BasicMessageOptions } from "./index";

export enum ComponentTypes {
    ActionRow = 1,
    Button,
    StringSelectMenu,
    TextInput,
    UserSelectMenu,
    RoleSelectMenu,
    MentionableSelectMenu,
    ChannelSelectMenu
}

export interface InteractionReplyOptions extends BasicMessageOptions {
    flags?: MessageFlags.SuppressEmbed | MessageFlags.Ephemeral;
    tts?: boolean;
}

export interface MessageComponentData {
    type: ComponentTypes.ActionRow;
    components: (ButtonData | TextInputData | SelectMenuData)[];
}

export interface SelectMenuData {
    type: SelectMenuTypes;
    custom_id: string;
    options?: SelectMenuOptionsData[];
    channel_types?: ChannelTypes[];
    placeholder?: string;
    min_values?: number;
    max_values?: number;
    disabled?: boolean;
}

export interface StringSelectMenuData extends Omit<SelectMenuData, "channel_types"> {
    type: SelectMenuTypes.StringSelect;
}

export interface RoleSelectMenuData extends Omit<SelectMenuData, "options" | "channel_types"> {
    type: SelectMenuTypes.RoleSelect;
}

export interface UserSelectMenuData extends Omit<SelectMenuData, "options" | "channel_types"> {
    type: SelectMenuTypes.UserSelect;
}

export interface MentionableSelectMenuData extends UserSelectMenuData {
    type: SelectMenuTypes.MentionableSelect;
}

export interface ChannelSelectMenuData extends Omit<SelectMenuData, "options"> {
    type: SelectMenuTypes.ChannelSelect;
}

export interface SelectMenuOptionsData {
    label: string;
    value: string;
    description?: string;
    emoji?: {
        name: string;
        id?: string;
        animated?: boolean;
    };
    default?: boolean;
}

export enum SelectMenuTypes {
    StringSelect = 3,
    UserSelect = 5,
    RoleSelect,
    MentionableSelect,
    ChannelSelect
}

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
}

export enum ApplicationCommandTypes {
    ChatInput = 1,
    User,
    Message
}

export type ApplicationCommandResolvable = ApplicationCommand | Snowflake;

export interface MessageInteractionData {
    id: Snowflake;
    type: InteractionType;
    name: string;
    user: RawDiscordAPIUserData;
    member?: Partial<GuildMemberData>;
}

export enum InteractionType {
    Ping = 1,
    ApplicationCommand,
    MessageComponent,
    ApplicationCommandAutocomplete,
    ModalSubmit
}

export interface ButtonData {
    type: ComponentTypes.Button;
    style: ButtonStyles;
    label?: string;
    emoji?: {
        name?: string;
        id?: string;
        animated: boolean;
    };
    custom_id?: string;
    url?: string;
    disabled?: boolean;
}

export enum ButtonStyles {
    Primary = 1,
    Secondary,
    Success,
    Danger,
    Link
}

export interface TextInputData {
    type: ComponentTypes.TextInput;
    custom_id: string;
    style: TextInputStyles;
    label: string;
    min_length?: number;
    max_length?: number;
    required?: boolean;
    value?: string;
    placeholder?: string;
}

export enum TextInputStyles {
    Short = 1,
    Paragraph
}

export interface RawInteraction {
    id: Snowflake;
    application_id: Snowflake;
    type: InteractionType;
    data?: RawInteractionData;
    guild_id?: Snowflake;
    channel?: Partial<RawDiscordAPIChannelData>;
    channel_id?: Snowflake;
    member?: GuildMemberData;
    user?: RawDiscordAPIUserData;
    token: string;
    version: number;
    message?: RawDiscordAPIMessageData;
    app_permissions?: string;
    locale?: keyof Locales;
    guild_locale?: keyof Locales;
}

export interface RawInteractionData {
    id: Snowflake;
    name: string;
    type: ApplicationCommandTypes;
    resolved?: {
        users?: { [ID: Snowflake]: RawDiscordAPIUserData; };
        members?: { [ID: Snowflake]: Partial<GuildMemberData>; };
        roles?: { [ID: Snowflake]: RawGuildRole; };
        channels?: { [ID: Snowflake]: Partial<RawDiscordAPIChannelData>; };
        messages?: { [ID: Snowflake]: Partial<RawDiscordAPIMessageData>; };
        attachments?: { [ID: Snowflake]: AttachmentData; };
    };
    options?: ApplicationCommandInteractionOptionData[];
    guild_id?: Snowflake;
    target_id?: Snowflake;
}

export enum InteractionCallbackType {
    Pong = 1,
    ChannelMessageWithSource = 4,
    DeferredChannelMessageWithSource,
    DeferredUpdateMessage,
    UpdateMessage,
    ApplicationCommandAutocompleteResult,
    Modal
}

export interface ShowModalOptions extends Omit<MessageComponentData, "type"> {
    title: string;
    custom_id: string;
}