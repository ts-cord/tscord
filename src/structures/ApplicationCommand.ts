import { Basic } from "./Basic";
import { Locales } from "../types";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import type { RawApplicationCommandData, ApplicationCommandOptionsData, ApplicationCommandTypes, EditApplicationCommandOptions } from "../types";

export class ApplicationCommand extends Basic implements RawApplicationCommandData {
    public id: Snowflake;
    public type: ApplicationCommandTypes;
    public application_id: Snowflake;
    public guild_id: Snowflake | undefined;
    public name: string;
    public name_localizations: Locales | undefined;
    public description: string;
    public description_localizations: Locales | undefined;
    public options: Array<ApplicationCommandOptionsData> | undefined;
    public default_member_permissions: string | undefined;
    public default_permission: boolean | undefined;
    public dm_permission: boolean | undefined;
    public nsfw: boolean | undefined;
    public version: string;
    public creationTimestamp: number;
    public creationDate: Date;
    private readonly auth: { headers: { Authorization: `Bot ${string}` } };
    private readonly url: string;

    constructor(data: RawApplicationCommandData, client: Client) {
        super(client);

        this.id = data.id;
        this.type = data.type;
        this.application_id = data.application_id;
        this.guild_id = data.guild_id;
        this.name = data.name;
        this.name_localizations = data.name_localizations;
        this.description = data.description;
        this.description_localizations = data.description_localizations;
        this.options = data.options;
        this.default_member_permissions = data.default_member_permissions;
        this.default_permission = data.default_permission;
        this.dm_permission = data.dm_permission;
        this.nsfw = data.nsfw;
        this.version = data.version;
        this.creationTimestamp = new Date((+this.id / 4194304) + 1420070400000).getTime();
        this.creationDate = new Date(this.creationTimestamp);
        this.auth = { headers: { Authorization: `Bot ${this.client.token}` } };
        this.url = this.guild_id ? `/applications/${this.client.app?.id}/guilds/${this.guild_id}/commands/${this.id}` : `/applications/${this.client.app?.id}/commands/${this.id}`;

        Object.assign(this, data);
    };

    /**
     * Delete the application command
     * @returns {Promise<void>}
     */

    async delete(): Promise<void> {
        const { data }: { data: void } = await rest.delete(this.url, this.auth);

        return data;
    };

    /**
     * Edit the application command options
     * @param {EditApplicationCommandOptions} options - New options to the application command
     * @returns {Promise<ApplicationCommand>}
     */

    async edit(options: EditApplicationCommandOptions): Promise<ApplicationCommand> {
        const { data }: { data: RawApplicationCommandData } = await rest.patch(this.url, options, this.auth);

        return new ApplicationCommand(data, this.client);
    };
};