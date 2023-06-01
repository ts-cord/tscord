import { Client } from "./Client";
import { rest } from "../constants/Api";
import { User } from "../structures/User";
import { Snowflake } from "../types/Snowflake";
import { ApplicationCommandManager } from "../managers/ApplicationCommandManager";
import { RoleConnectionMetadata, ApplicationCover, CndURL } from "../utils/Routes";
import type { ViewOptions, RawApplication, ApplicationTeam, InstallParams, ApplicationRoleConnectionMetadata, ApplicationRoleConnectionMetadataEditOptions } from "../types";

export class ClientApplication {
	private readonly client: Client;
	public readonly rpcOrigins: string[];
	public readonly summary: string;
	public readonly installParams: InstallParams;
	public readonly id: Snowflake;
	public readonly name: string;
	public readonly commands: ApplicationCommandManager;
	public readonly icon: string | undefined;
	public readonly description: string;
	public readonly rcpOrigins: string[] | undefined;
	public readonly botPublic: boolean;
	public readonly botRequireCodeGrant: boolean;
	public readonly termsOfServiceURL: string | undefined;
	public readonly privaciPolicyURL: string | undefined;
	public readonly owner: User | undefined;
	public readonly verifyKey: string;
	public readonly team: ApplicationTeam;
	public readonly guildId: Snowflake | undefined;
	public readonly primarySkuId: Snowflake | undefined;
	public readonly slug: string | undefined;
	public readonly coverImage: string | undefined;
	public readonly flags: number | undefined;
	public readonly tags: string[] | undefined;
	public readonly customInstallURL: string | undefined;
	public readonly roleConnectionsVerificationURL: string | undefined;
	private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };

	constructor(app: RawApplication, client: Client) {
		this.client = client;
		this.id = app.id;
		this.commands = new ApplicationCommandManager(client);
		this.name = app.name;
		this.icon = app.icon;
		this.description = app.description;
		this.rpcOrigins = app.rpc_origins;
		this.botPublic = app.bot_public;
		this.botRequireCodeGrant = app.bot_require_code_grant;
		this.termsOfServiceURL = app.terms_of_service_url;
		this.privaciPolicyURL = app.privacy_policy_url;
		this.owner = this.owner ? new User(this.owner, this.client) : void 0;
		this.verifyKey = app.verify_key;
		this.team = app.team;
		this.guildId = app.guild_id;
		this.primarySkuId = app.primary_sku_id;
		this.slug = app.slug;
		this.coverImage = app.cover_image;
		this.flags = app.flags;
		this.customInstallURL = app.custom_install_url;
		this.roleConnectionsVerificationURL = app.role_connections_verification_url;
		this.axiosConfig = { headers: { Authorization: `Bot ${this.client.token}` } };
		this.summary = app.summary;
		this.installParams = app.install_params;

		Object.assign(this, app);
	}

	/**
   * Returns the client icon URL
   * @param {ViewOptions} options - Optional image options
   * @returns {string | undefined'}
   */

	iconURL(options?: ViewOptions): string | undefined {
		return this.icon && `https://cdn.discordapp.com/${this.id}/icons/${this.icon}.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
	}

	/**
   * Stringify the client application object into client's application's name
   * @returns {string}
   */

	toString(): string {
		return this.name;
	}

	/**
   * Fetch the role connection metadata records
   * @returns {Promise<ApplicationRoleConnectionMetadata[]>}
   */

	async fetchRoleConnectionMetadataRecords(): Promise<Array<ApplicationRoleConnectionMetadata>> {
		const { data }: { data: ApplicationRoleConnectionMetadata[] } = await rest.get(RoleConnectionMetadata(this.id), this.axiosConfig);

		return data;
	}

	/**
   * Update the role connection metadata records
   * @param {ApplicationRoleConnectionMetadataEditOptions} options 
   * @returns {ApplicationRoleConnectionMetadata[]}
   */

	async updateRoleConnectionMetadataRecords(options: ApplicationRoleConnectionMetadataEditOptions): Promise<Array<ApplicationRoleConnectionMetadata>> {
		const { data }: { data: Array<ApplicationRoleConnectionMetadata> } = await rest.put(RoleConnectionMetadata(this.id), options, this.axiosConfig);

		return data;
	}

	/**
   * Returns the client application cover URL
   * @param {ViewOptions} options - Option image options
   * @returns {string | undefined}
   */

	coverURL(options?: ViewOptions): string | undefined {
		return this.coverImage && CndURL + ApplicationCover(this.id, this.coverImage) + `.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
	}
}