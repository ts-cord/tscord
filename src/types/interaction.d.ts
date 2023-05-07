import { ChannelTypes, Locales } from "./index";
import { Snowflake } from "./Snowflake";
import { RawDiscordAPIUserData } from "./user";
import type { GuildMemberData } from "./index";
import type { BasicFetchOptions, Locales } from "./misc";
import { ApplicationCommand } from "../structures/ApplicationCommand";

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
    components: (ButtonData | TextInputData | SelectMenuData)[];
};

export interface SelectMenuData {
    type: SelectMenuTypes;
    custom_id: string;
    options?: SelectMenuOptionsData[];
    channel_types?: ChannelTypes[];
    placeholder?: string;
    min_values?: number;
    max_values?: number;
    disabled?: boolean;
};

export interface StringSelectMenuData extends Omit<SelectMenuData, 'channel_types'> {
    type: SelectMenuTypes.StringSelect;
};

export interface RoleSelectMenuData extends Omit<SelectMenuData, 'options' | 'channel_types'> {
    type: SelectMenuTypes.RoleSelect;
};

export interface UserSelectMenuData extends Omit<SelectMenuData, 'options' | 'channel_types'> {
    type: SelectMenuTypes.UserSelect;
};

export interface MentionableSelectMenuData extends UserSelectMenuData {
    type: SelectMenuTypes.MentionableSelect;
};

export interface ChannelSelectMenuData extends Omit<SelectMenuData, 'options'> {
    type: SelectMenuTypes.ChannelSelect;
};

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
};

export enum SelectMenuTypes {
    StringSelect = 3,
    UserSelect = 5,
    RoleSelect,
    MentionableSelect,
    ChannelSelect
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
};

export enum ButtonStyles {
    Primary = 1,
    Secondary,
    Success,
    Danger,
    Link
};

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
};

export enum TextInputStyles {
    Short = 1,
    Paragraph
};