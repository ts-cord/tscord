import { BasicSelectMenuBuilder } from "./BasicSelectMenuBuilder";
import { ChannelSelectMenuData, ChannelTypes, SelectMenuTypes } from "../types";

export class ChannelSelectMenuBuilder extends BasicSelectMenuBuilder {
	data: Partial<ChannelSelectMenuData>;

	constructor(data: Partial<ChannelSelectMenuData>) {
		super(data);

		this.data = { ...data, type: SelectMenuTypes.ChannelSelect as SelectMenuTypes.ChannelSelect };
	}

	/**
     * Sets channel types to this select menu channel types
     * @param {ChannelTypes[]} types - The channel types do set
     * @returns {this}
     */

	setChannelTypes(types: ChannelTypes[]): this {
		this.data.channel_types = types;

		return this;
	}

	/**
     * Add channel types to this select menu channel types
     * @param {ChannelTypes[]} types - The channel types to add
     * @returns {this}
     */

	addChannelTypes(types: ChannelTypes[]): this {
		this.data.channel_types ? this.data.channel_types.push(...types) : this.data.channel_types = types;

		return this;
	}
}