import { User } from "./User";
import { Basic } from "./Basic";
import { Guild } from "./Guild";
import { Message } from "./Message";
import { Client } from "../entities/Client";
import { GuildMember } from "./GuildMember";
import { Snowflake } from "../types/Snowflake";
import { IInteractionData } from "../interfaces/IInteractionData";
import { RawInteractionData } from "../interfaces/IRawInteractionData";
import { ContextMenuTypes, ComponentTypes, InteractionType } from "../types";

export class BasicInteraction extends Basic implements RawInteractionData {
    public id: Snowflake;
    public application_id: Snowflake;
    public type: InteractionType;
    public data: IInteractionData | undefined;
    public guild: Guild;
    public channel_id: Snowflake | undefined;
    public member: GuildMember | undefined;
    public user: User | undefined;
    public token: string;
    public version: number;
    public message: Message | undefined;
    public app_permissions: string | undefined;
    public locale: string | undefined;
    public guild_locale: string | undefined;
    public component_type: ComponentTypes | undefined;
    public creation_timestamp: number;
    public creation_date: Date;

    /**
     * Represents a basic discord interaction
     * @param {RawInteractionData} data - The minimum data for an interaction
     * @param {Client} client - The client for this interaction
     * @constructor
     */

    constructor(data: RawInteractionData, client: Client) {
        super(client);

        this.id = data.id;
        this.application_id = data.application_id;
        this.type = data.type;
        this.data = data.data;
        this.guild = new Guild(data.guild, this.client);
        this.channel_id = data.channel_id;
        this.member = data.member ? new GuildMember(data.member, this.guild, this.client) : void 0;
        this.user = data.user ? new User(data.user, this.client) : void 0;
        this.token = data.token;
        this.version = data.version;
        this.message = data.message ? new Message(data.message, this.client) : void 0;
        this.app_permissions = data.app_permissions;
        this.locale = data.locale;
        this.guild_locale = data.guild_locale;
        this.component_type = this.data?.component_type;
        this.data?.type;
        this.creation_timestamp = (+this.id / 4194304) + 1420070400000;
        this.creation_date = new Date(this.creation_timestamp);

        Object.assign(this, data);
    };

    /**
     * Check if this interaction was used in a cached guild
     * @returns {boolean}
     */

    inCachedGuild(): boolean {
        return this.client.guilds.cache.has(this.guild.id);
    };

    /**
     * Check if this interaction was used in an uncached guild
     * @returns {boolean}
     */

    inUncachedGuild(): boolean {
        return !this.client.guilds.cache.has(this.guild.id);
    };

    /**
     * Check if this interaction was used in a guild
     * @returns {boolean}
     */

    inGuild(): boolean {
        return this.guild.id ? true : false;
    };

    /**
     * Check if this interaction is an application command autocomplete
     * @returns {boolean}
     */

    isApplicationCommandAutocomplete(): boolean {
        return this.type === InteractionType.ApplicationCommandAutocomplete;
    };

    /**
     * Check if this interaction is a modal submit interaction
     * @returns {boolean}
     */

    isModalSubmit(): boolean {
        return this.type === InteractionType.ModalSubmit;
    };

    /**
     * Check if this interaction is a message component interaction
     * @returns {boolean}
     */

    isMessageComponent(): boolean {
        return this.type === InteractionType.MessageComponent;
    };

    /**
     * Check if this interaction is an application command
     * @returns {boolean}
     */

    isApplicationCommand(): boolean {
        return this.type === InteractionType.ApplicationCommand;
    };

    /**
     * Check if this interaction is a button
     * @returns {boolean}
     */

    isButton(): boolean {
        return this.component_type === ComponentTypes.Button;
    };

    /**
     * Check if this interaction is a channel select menu
     * @returns {boolean}
     */

    isChannelSelectMenu(): boolean {
        return this.component_type === ComponentTypes.ChannelSelectMenu;
    };

    /**
     * Check if this interaction is a string select menu
     * @returns {boolean}
     */

    isStringSelectMenu(): boolean {
        return this.component_type === ComponentTypes.StringSelectMenu;
    };

    /**
     * Check if this interaction is an user select menu
     * @returns {boolean}
     */

    isUserSelectMenu(): boolean {
        return this.component_type === ComponentTypes.UserSelectMenu;
    };

    /**
     * Check if this interaction is a role select menu
     * @returns {boolean}
     */

    isRoleSelectMenu(): boolean {
        return this.component_type === ComponentTypes.RoleSelectMenu;
    };

    /**
     * Check if this interaction is a mentionable select menu
     * @returns {boolean}
     */

    isMentionableSelectMenu(): boolean {
        return this.component_type === ComponentTypes.MentionableSelectMenu;
    };

    /**
     * Check if this interaction is any select menu (String, Channel, Mentionable, Role or User)
     * @returns {boolean}
     */

    isAnySelectMenu(): boolean {
        return [ComponentTypes.StringSelectMenu, ComponentTypes.ChannelSelectMenu, ComponentTypes.MentionableSelectMenu, ComponentTypes.RoleSelectMenu, ComponentTypes.UserSelectMenu].includes(this.component_type!);
    };

    /**
     * Check if this interaction is a text input
     * @returns {boolean}
     */

    isTextInput(): boolean {
        return this.component_type === ComponentTypes.TextInput;
    };

    /**
     * Check if this interaction is message context menu
     * @returns {boolean}
     */

    isMessageContextMenu(): boolean {
        return this.data?.target_id && this.data.type === ContextMenuTypes.Message ? true : false;
    };

    /**
     * Check if this interaction is user context menu
     * @returns {boolean}
     */

    isUserContextMenu(): boolean {
        return this.data?.target_id && this.data.type === ContextMenuTypes.User ? true : false;
    };

    /**
     * Check if this interaction is any context menu (User or Message)
     * @returns {boolean}
     */

    isAnyContextMenu(): boolean {
        return this.data?.target_id ? true : false;
    };
};