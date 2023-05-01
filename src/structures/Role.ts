import { Basic } from "./Basic";
import { api } from "../constants/Api";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import { GuildRole, RoleIcon } from "../utils/Routes";
import { ViewOptions } from "../interfaces/IViewOptions";
import type { EditRoleOptions, GuildRoleTags, RawGuildRole, RawRole } from "../types";

export class Role extends Basic implements RawRole {
    public id: Snowflake;
    public name: string;
    public color: number;
    public hoist: boolean;
    public icon: string | undefined;
    public unicode_emoji: string | undefined;
    public position: number;
    public permissions: string;
    public managed: boolean;
    public mentionable: boolean;
    public tags?: GuildRoleTags | undefined;
    public creation_date: Date;
    public creation_timestamp: number;
    public readonly guildId: Snowflake;

    constructor(data: RawGuildRole, client: Client, guildId: Snowflake) {
        super(client);

        this.id = data.id;
        this.guildId = guildId;
        this.name = data.name;
        this.color = data.color;
        this.hoist = data.hoist;
        this.icon = data.icon;
        this.unicode_emoji = data.unicode_emoji;
        this.position = data.position;
        this.permissions = data.permissions;
        this.managed = data.managed;
        this.mentionable = data.mentionable;
        this.tags = data.tags;
        this.creation_date = new Date((+this.id / 4194304) + 1420070400000);
        this.creation_timestamp = this.creation_date.getTime();

        Object.assign(this, data);
    };

    async delete(reason?: string): Promise<Role> {
        await api.delete(GuildRole(this.guildId, this.id), { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return this;
    };
    async edit(options: EditRoleOptions): Promise<Role> {
        const { data }: { data: RawRole } = await api.patch(GuildRole(this.guildId, this.id), { name: options.name, permissions: options.permissions, color: options.color, hoist: options.hoist, icon: options.icon, unicode_emoji: options.unicode_emoji, mentionable: options.mentionable }, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': options.reason } });

        return new Role(data, this.client, this.guildId);
    };
    comparePosition(role: Role): number {
        return this.position > role.position ? this.position - role.position : role.position - this.position;
    };
    toString(): string {
        return `<@&${this.id}>`;
    };
    iconURL(options: ViewOptions): string | undefined {
        return this.icon && RoleIcon(this.id, this.icon) + `.${options.format ?? this.client.options?.default_image_format}?size=${options.size ?? this.client.options?.default_image_size}`;
    };
};