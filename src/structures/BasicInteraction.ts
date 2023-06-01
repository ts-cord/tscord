import { User } from "./User";
import { Basic } from "./Basic";
import { Guild } from "./Guild";
import { Message } from "./Message";
import { Client } from "../entities/Client";
import { GuildMember } from "./GuildMember";
import { Snowflake } from "../types/Snowflake";
import { ComponentTypes, InteractionType, RawInteraction, RawInteractionData, ApplicationCommandTypes, Locales } from "../types";

export class BasicInteraction extends Basic {
	public id: Snowflake;
	public applicationId: Snowflake;
	public type: InteractionType;
	public data: RawInteractionData | undefined;
	public guild: Guild;
	public channelId: Snowflake | undefined;
	public member: GuildMember | undefined;
	public user: User | undefined;
	public token: string;
	public version: number;
	public message: Message | undefined;
	public appPermissions: string | undefined;
	public locale: keyof Locales | undefined;
	public guildLocale: keyof Locales | undefined;
	public creationTimestamp: number;
	public creationDate: Date;

	/**
     * Represents a basic discord interaction
     * @param {RawInteraction} data - The minimum data for an interaction
     * @param {Client} client - The client for this interaction
     * @constructor
     */

	constructor(data: RawInteraction, client: Client) {
		super(client);

		this.id = data.id;
		this.applicationId = data.application_id;
		this.type = data.type;
		this.data = data.data;
		this.guild = new Guild(data.guild, this.client);
		this.channelId = data.channel_id;
		this.member = data.member ? new GuildMember(data.member, this.guild, this.client) : void 0;
		this.user = data.user ? new User(data.user, this.client) : void 0;
		this.token = data.token;
		this.version = data.version;
		this.message = data.message ? new Message(data.message, this.client) : void 0;
		this.appPermissions = data.app_permissions;
		this.locale = data.locale;
		this.guildLocale = data.guild_locale;
		this.data?.type;
		this.creationTimestamp = (+this.id / 4194304) + 1420070400000;
		this.creationDate = new Date(this.creationTimestamp);

		Object.assign(this, data);
	}

	/**
     * Check if this interaction was used in a cached guild
     * @returns {boolean}
     */

	inCachedGuild(): boolean {
		return this.client.guilds.cache.has(this.guild.id);
	}

	/**
     * Check if this interaction was used in an uncached guild
     * @returns {boolean}
     */

	inUncachedGuild(): boolean {
		return !this.client.guilds.cache.has(this.guild.id);
	}

	/**
     * Check if this interaction was used in a guild
     * @returns {boolean}
     */

	inGuild(): boolean {
		return this.guild.id ? true : false;
	}

	/**
     * Check if this interaction is an application command autocomplete
     * @returns {boolean}
     */

	isApplicationCommandAutocomplete(): boolean {
		return this.type === InteractionType.ApplicationCommandAutocomplete;
	}

	/**
     * Check if this interaction is a modal submit interaction
     * @returns {boolean}
     */

	isModalSubmit(): boolean {
		return this.type === InteractionType.ModalSubmit;
	}

	/**
     * Check if this interaction is a message component interaction
     * @returns {boolean}
     */

	isMessageComponent(): boolean {
		return this.type === InteractionType.MessageComponent;
	}

	/**
     * Check if this interaction is an application command
     * @returns {boolean}
     */

	isApplicationCommand(): boolean {
		return this.type === InteractionType.ApplicationCommand;
	}

	/**
     * Check if this interaction is a button
     * @returns {boolean}
     */

	isButton(): boolean {
		return this.componentType === ComponentTypes.Button;
	}

	/**
     * Check if this interaction is a channel select menu
     * @returns {boolean}
     */

	isChannelSelectMenu(): boolean {
		return this.componentType === ComponentTypes.ChannelSelectMenu;
	}

	/**
     * Check if this interaction is a string select menu
     * @returns {boolean}
     */

	isStringSelectMenu(): boolean {
		return this.componentType === ComponentTypes.StringSelectMenu;
	}

	/**
     * Check if this interaction is an user select menu
     * @returns {boolean}
     */

	isUserSelectMenu(): boolean {
		return this.componentType === ComponentTypes.UserSelectMenu;
	}

	/**
     * Check if this interaction is a role select menu
     * @returns {boolean}
     */

	isRoleSelectMenu(): boolean {
		return this.componentType === ComponentTypes.RoleSelectMenu;
	}

	/**
     * Check if this interaction is a mentionable select menu
     * @returns {boolean}
     */

	isMentionableSelectMenu(): boolean {
		return this.componentType === ComponentTypes.MentionableSelectMenu;
	}

	/**
     * Check if this interaction is any select menu (String, Channel, Mentionable, Role or User)
     * @returns {boolean}
     */

	isAnySelectMenu(): boolean {
		return [ComponentTypes.StringSelectMenu, ComponentTypes.ChannelSelectMenu, ComponentTypes.MentionableSelectMenu, ComponentTypes.RoleSelectMenu, ComponentTypes.UserSelectMenu].includes(this.componentType!);
	}

	/**
     * Check if this interaction is a text input
     * @returns {boolean}
     */

	isTextInput(): boolean {
		return this.componentType === ComponentTypes.TextInput;
	}

	/**
     * Check if this interaction is message context menu
     * @returns {boolean}
     */

	isMessageContextMenu(): boolean {
		return this.data?.target_id && this.data.type === ApplicationCommandTypes.Message ? true : false;
	}

	/**
     * Check if this interaction is user context menu
     * @returns {boolean}
     */

	isUserContextMenu(): boolean {
		return this.data?.target_id && this.data.type === ApplicationCommandTypes.User ? true : false;
	}

	/**
     * Check if this interaction is any context menu (User or Message)
     * @returns {boolean}
     */

	isAnyContextMenu(): boolean {
		return this.data?.target_id ? true : false;
	}
}