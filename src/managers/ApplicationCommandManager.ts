import { api } from "../constants/Api";
import { Group } from "../utils/Group";
import * as Routes from "../utils/Routes";
import { Client } from "../entities/Client";
import { BasicManager } from "./BasicManager";
import { Snowflake } from "../types/Snowflake";
import { ApplicationCommand } from "../structures/ApplicationCommand";
import type { ApplicationCommandData, ApplicationCommandResolvable, CreateApplicationCommandOptions, EditApplicationCommandOptions } from "../types/interaction";

export class ApplicationCommandManager extends BasicManager {
    private readonly auth: { headers: { Authorization: `Bot ${string}` } };
    override cache: Group<Snowflake, ApplicationCommand> = new Group<Snowflake, ApplicationCommand>();

    constructor(client: Client) {
        super(client);

        this.auth = { headers: { Authorization: `Bot ${this.client.token}` } };
    };

    /**
     * Resolve an ApplicationCommandResolvable to an ApplicationCommand id
     * @param {ApplicationCommandResolvable} command - The application command resolvable
     * @returns {Snowflake}
     */

    resolveId(command: ApplicationCommandResolvable): Snowflake {
        return command instanceof ApplicationCommand ? command.id : command;
    };

    /**
     * Create a new application command
     * @param {CreateApplicationCommandOptions} command - Raw application command structure
     * @param {Snowflake} guildId - Create the app command in this guild
     * @returns {Promise<ApplicationCommand>}
     */

    async create(command: CreateApplicationCommandOptions, guildId?: Snowflake): Promise<ApplicationCommand> {
        const { data }: { data: ApplicationCommandData } = await api.post(guildId ? Routes.GuildApplicationCommands(this.client.app!.id, guildId) : Routes.ApplicationCommands(this.client.app!.id), command, this.auth);

        this.cache.set(data.id, new ApplicationCommand(data, this.client));

        return this.cache.get(data.id)!;
    };

    /**
     * Delete an application command
     * @param {ApplicationCommandResolvable} command - The application command to delete
     * @param {Snowflake} guildId - The guild id to the application command, if it is not global
     * @returns {Promise<ApplicationCommand | void>}
     */

    async delete(command: ApplicationCommandResolvable, guildId?: Snowflake): Promise<ApplicationCommand | void> {
        const { data }: { data: void } = await api.delete(guildId ? Routes.GuildApplicationCommand(this.client.app!.id, guildId, this.resolveId(command)) : Routes.ApplicationCommands(this.client.app!.id), this.auth);

        this.cache.delete(this.resolveId(command));

        return command instanceof ApplicationCommand ? command : data;
    };

    /**
     * Edit an application command
     * @param {EditApplicationCommandOptions} options - New options to the application command
     * @param {ApplicationCommandResolvable} command - The application command to edit
     * @param {Snowflake} guildId - The guild id to the application command, if it is not global
     * @returns {Promise<ApplicationCommand>}
     */

    async edit(options: EditApplicationCommandOptions, command: ApplicationCommandResolvable, guildId?: Snowflake): Promise<ApplicationCommand> {
        const { data }: { data: ApplicationCommandData } = await api.patch(guildId ? Routes.GuildApplicationCommand(this.client.app!.id, guildId, this.resolveId(command)) : Routes.ApplicationCommand(this.client.app!.id, this.resolveId(command)), options, this.auth);

        this.cache.set(data.id, new ApplicationCommand(data, this.client));

        return this.cache.get(data.id)!;
    };

    /**
     * Bulk rewrite the application commands
     * @param {Array<EditApplicationCommandOptions>} commands - The new commands
     * @param {Snowflake} guildId - The guild id to be set
     * @example ```ts
     * appCommandManager.bulkOverwrite([]); // Delete all application commands
     * appCommandManager.bulkOverwrite([{ name: 'potato', description: 'potato2' }]); // Set the client application commands to this
     * @returns {Promise<Group<Snowflake, ApplicationCommand>>}
     */

    async bulkOverwrite(commands: Array<EditApplicationCommandOptions>, guildId?: string): Promise<Group<Snowflake, ApplicationCommand>> {
        const { data }: { data: Array<ApplicationCommandData> } = await api.put(guildId ? Routes.GuildApplicationCommands(this.client.app!.id, guildId) : Routes.ApplicationCommands(this.client.app!.id), commands, this.auth);
        const applicationCommandGroup: Group<Snowflake, ApplicationCommand> = new Group<Snowflake, ApplicationCommand>();

        data.forEach((command: ApplicationCommandData) => applicationCommandGroup.set(command.id, new ApplicationCommand(command, this.client)));

        this.cache = applicationCommandGroup;

        return applicationCommandGroup;
    };
};