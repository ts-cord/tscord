import { BasicBuilder } from "./BasicBuilder";
import type { ContextMenuData, ContextMenuTypes, Locales } from "../types";

export class ContextMenuBuilder extends BasicBuilder<ContextMenuData> {
	/**
     * Create context menu data by the constructor
     * @param {ContextMenuData} data - Data to be set
     * @see https://discord.com/developers/docs/interactions/application-commands
     */

	constructor(data?: ContextMenuData) {
		super(data);
	}

	/**
     * Set the name of the Context's Menu
     * @param {string} name - Name to be set
     * @returns {this}
     */

	setName(name: string): this {
		this.data.name = name;

		return this;
	}

	/**
     * Set the type (User or Message) of the Context's Menu
     * @param {ContextMenuTypes} type - Type to be set
     * @returns {this}
     */

	setType(type: ContextMenuTypes): this {
		this.data.type = type;

		return this;
	}

	/**
     * Set whether users can use the Context's Menu in your DMS
     * @param {boolean} dmPermission - Pass true if they can or false if cannot
     * @returns {this}
     */

	setDMPermission(dmPermission: boolean): this {
		this.data.dm_permission = dmPermission;

		return this;
	}

	/**
     * Set the names localizations for this Context's Menu
     * @param {Locales} names - The names localizations
     * @returns {this}
     */

	setNameLocalizations(names: Locales): this {
		this.data.name_localizations = names;

		return this;
	}

	/**
     * Set default permissions for this Context's Menu
     * @param {string} permissions - The default permissions
     * @returns {this}
     */

	setDefaultMemberPermissions(permissions: string): this {
		this.data.default_member_permissions = permissions;

		return this;
	}

	/**
     * The max USER context menu per a discord application
     */

	static readonly MaxUserContextMenuPerApplication: number = 5;

	/**
     * The max MESSAGE context menu per a discord application
     */

	static readonly MaxMessageContextMenuPerApplication: number = 5;
}