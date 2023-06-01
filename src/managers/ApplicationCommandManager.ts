import { Group } from "../utils/Group";
import { rest } from "../constants/Api";
import * as Routes from "../utils/Routes";
import { Client } from "../entities/Client";
import { BasicManager } from "./BasicManager";
import { Snowflake } from "../types/Snowflake";
import { ApplicationCommand } from "../structures/ApplicationCommand";
import type { ApplicationCommandResolvable, CreateApplicationCommandOptions, EditApplicationCommandOptions, RawApplicationCommandData } from "../types";

export class ApplicationCommandManager extends BasicManager {
	private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };
	override cache: Group<Snowflake, ApplicationCommand> = new Group<Snowflake, ApplicationCommand>();

	constructor(client: Client) {
		super(client);

		this.axiosConfig = { headers: { Authorization: `Bot ${this.client.token}` } };
	}

	/**
     * Resolve an ApplicationCommandResolvable to an ApplicationCommand id
     * @param {ApplicationCommandResolvable} command - The application command resolvable
     * @returns {Snowflake}
     */

	resolveId(command: ApplicationCommandResolvable): Snowflake {
		return command instanceof ApplicationCommand ? command.id : command;
	}

	/**
     * Create a new application command
     * @param {CreateApplicationCommandOptions} command - Raw application command structure
     * @param {Snowflake} guildId - Create the app command in this guild
     * @returns {Promise<ApplicationCommand>}
     */

	async create(command: CreateApplicationCommandOptions, guildId?: Snowflake): Promise<ApplicationCommand> {
		const { data }: { data: RawApplicationCommandData } = await rest.post(guildId ? Routes.GuildApplicationCommands(this.client.app!.id, guildId) : Routes.ApplicationCommands(this.client.app!.id), command, this.axiosConfig);

		this.cache.set(data.id, new ApplicationCommand(data, this.client));

		return this.cache.get(data.id)!;
	}

	/**
     * Delete an application command
     * @param {ApplicationCommandResolvable} command - The application command to delete
     * @param {Snowflake} guildId - The guild id to the application command, if it is not global
     * @returns {Promise<ApplicationCommand | void>}
     */

	async delete(command: ApplicationCommandResolvable, guildId?: Snowflake): Promise<ApplicationCommand | void> {
		const { data }: { data: void } = await rest.delete(guildId ? Routes.GuildApplicationCommand(this.client.app!.id, guildId, this.resolveId(command)) : Routes.ApplicationCommands(this.client.app!.id), this.axiosConfig);

		this.cache.delete(this.resolveId(command));

		return command instanceof ApplicationCommand ? command : data;
	}

	/**
     * Edit an application command
     * @param {EditApplicationCommandOptions} options - New options to the application command
     * @param {ApplicationCommandResolvable} command - The application command to edit
     * @param {Snowflake} guildId - The guild id to the application command, if it is not global
     * @returns {Promise<ApplicationCommand>}
     */

	async edit(options: EditApplicationCommandOptions, command: ApplicationCommandResolvable, guildId?: Snowflake): Promise<ApplicationCommand> {
		const { data }: { data: RawApplicationCommandData } = await rest.patch(guildId ? Routes.GuildApplicationCommand(this.client.app!.id, guildId, this.resolveId(command)) : Routes.ApplicationCommand(this.client.app!.id, this.resolveId(command)), options, this.axiosConfig);

		this.cache.set(data.id, new ApplicationCommand(data, this.client));

		return this.cache.get(data.id)!;
	}

	/**
     * Bulk rewrite the application commands
     * @param {Array<EditApplicationCommandOptions>} commands - The new commands
     * @param {Snowflake} guildId - The guild id to be set
     * @example
     * appCommandManager.bulkOverwrite([]); // Delete all application commands
     * appCommandManager.bulkOverwrite([{ name: 'potato', description: 'potato2' }]); // Set the client application commands to this
     * @returns {Promise<Group<Snowflake, ApplicationCommand>>}
     */

	async bulkOverwrite(commands: Array<EditApplicationCommandOptions>, guildId?: Snowflake): Promise<Group<Snowflake, ApplicationCommand>> {
		const { data }: { data: Array<RawApplicationCommandData> } = await rest.put(guildId ? Routes.GuildApplicationCommands(this.client.app!.id, guildId) : Routes.ApplicationCommands(this.client.app!.id), commands, this.axiosConfig);
		const applicationCommandGroup: Group<Snowflake, ApplicationCommand> = new Group<Snowflake, ApplicationCommand>();

		data.forEach((command: RawApplicationCommandData): Group<Snowflake, ApplicationCommand> => applicationCommandGroup.set(command.id, new ApplicationCommand(command, this.client)));

		this.cache = applicationCommandGroup;

		return applicationCommandGroup;
	}
}