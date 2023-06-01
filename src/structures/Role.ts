import { Basic } from "./Basic";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import { GuildRole, RoleIcon } from "../utils/Routes";
import type { EditRoleOptions, GuildRoleTags, RawGuildRole, RawRole, ViewOptions } from "../types";

export class Role extends Basic {
	public id: Snowflake;
	public name: string;
	public color: number;
	public hoist: boolean;
	public icon: string | undefined;
	public unicodeEmoji: string | undefined;
	public position: number;
	public permissions: string;
	public managed: boolean;
	public mentionable: boolean;
	public tags: GuildRoleTags | undefined;
	public creationDate: Date;
	public creationTimestamp: number;
	public readonly guildId: Snowflake;

	constructor(data: RawGuildRole, client: Client, guildId: Snowflake) {
		super(client);

		this.id = data.id;
		this.guildId = guildId;
		this.name = data.name;
		this.color = data.color;
		this.hoist = data.hoist;
		this.icon = data.icon;
		this.unicodeEmoji = data.unicode_emoji;
		this.position = data.position;
		this.permissions = data.permissions;
		this.managed = data.managed;
		this.mentionable = data.mentionable;
		this.tags = data.tags;
		this.creationDate = new Date((+this.id / 4194304) + 1420070400000);
		this.creationTimestamp = this.creationDate.getTime();

		Object.assign(this, data);
	}

	/**
     * Delete the role
     * @param {string} reason - Reason for delete the role
     * @returns {Promise<Role>}
     */

	async delete(reason?: string): Promise<Role> {
		await rest.delete(GuildRole(this.guildId, this.id), { headers: { Authorization: `Bot ${this.client.token}`, "X-Audit-Log-Reason": reason } });

		return this;
	}

	/**
     * Edit role's options
     * @param {EditRoleOptions} options - Options to edit
     * @returns {Promise<Role>}
     */

	async edit(options: EditRoleOptions): Promise<Role> {
		const { data }: { data: RawRole } = await rest.patch(GuildRole(this.guildId, this.id), { name: options.name, permissions: options.permissions, color: options.color, hoist: options.hoist, icon: options.icon, unicode_emoji: options.unicode_emoji, mentionable: options.mentionable }, { headers: { Authorization: `Bot ${this.client.token}`, "X-Audit-Log-Reason": options.reason } });

		return new Role(data, this.client, this.guildId);
	}

	/**
     * Compare the positions between role's and other role
     * @param {Role} role - The other role to compare
     * @returns {number}
     */

	comparePosition(role: Role): number {
		return this.position > role.position ? this.position - role.position : role.position - this.position;
	}

	/**
     * Stringify role's object into role's mention
     * @returns {string}
     */

	toString(): string {
		return `<@&${this.id}>`;
	}

	/**
     * Returns role's icon URL
     * @param {ViewOptions} options - Optional image options
     * @returns {string | undefined}
     */

	iconURL(options: ViewOptions): string | undefined {
		return this.icon && RoleIcon(this.id, this.icon) + `.${options.format ?? this.client.options?.default_image_format}?size=${options.size ?? this.client.options?.default_image_size}`;
	}
}