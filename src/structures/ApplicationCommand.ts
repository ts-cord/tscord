import { Basic } from "./Basic";
import { Locales } from "../types";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import type { RawApplicationCommandData, ApplicationCommandOptionsData, ApplicationCommandTypes, EditApplicationCommandOptions } from "../types";

export class ApplicationCommand extends Basic {
    public id: Snowflake;
    public type: ApplicationCommandTypes;
    public applicationId: Snowflake;
    public guildId: Snowflake | undefined;
    public name: string;
    public nameLocalizations: Locales | undefined;
    public description: string;
    public descriptionLocalizations: Locales | undefined;
    public options: Array<ApplicationCommandOptionsData> | undefined;
    public defaultMemberPermissions: string | undefined;
    public defaultPermission: boolean | undefined;
    public dmPermission: boolean | undefined;
    public nsfw: boolean | undefined;
    public version: string;
    public creationTimestamp: number;
    public creationDate: Date;
    private readonly url: string;
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };

    constructor(data: RawApplicationCommandData, client: Client) {
        super(client);

        this.id = data.id;
        this.type = data.type;
        this.applicationId = data.application_id;
        this.guildId = data.guild_id;
        this.name = data.name;
        this.nameLocalizations = data.name_localizations;
        this.description = data.description;
        this.descriptionLocalizations = data.description_localizations;
        this.options = data.options;
        this.defaultMemberPermissions = data.default_member_permissions;
        this.defaultPermission = data.default_permission;
        this.dmPermission = data.dm_permission;
        this.nsfw = data.nsfw;
        this.version = data.version;
        this.creationTimestamp = new Date((+this.id / 4194304) + 1420070400000).getTime();
        this.creationDate = new Date(this.creationTimestamp);
        this.axiosConfig = { headers: { Authorization: `Bot ${this.client.token}` } };
        this.url = this.guildId ? `/applications/${this.client.app?.id}/guilds/${this.guildId}/commands/${this.id}` : `/applications/${this.client.app?.id}/commands/${this.id}`;

        Object.assign(this, data);
    }

    /**
     * Delete the application command
     * @returns {Promise<void>}
     */

    async delete(): Promise<void> {
        const { data }: { data: void } = await rest.delete(this.url, this.axiosConfig);

        return data;
    }

    /**
     * Edit the application command options
     * @param {EditApplicationCommandOptions} options - New options to the application command
     * @returns {Promise<ApplicationCommand>}
     */

    async edit(options: EditApplicationCommandOptions): Promise<ApplicationCommand> {
        const { data }: { data: RawApplicationCommandData } = await rest.patch(this.url, options, this.axiosConfig);

        return new ApplicationCommand(data, this.client);
    }
}