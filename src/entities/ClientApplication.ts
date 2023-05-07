import { Client } from './Client';
import { rest } from '../constants/Api';
import { User } from '../structures/User';
import { Snowflake } from '../types/Snowflake';
import { ApplicationCommandManager } from '../managers/ApplicationCommandManager';
import { RoleConnectionMetadata, ApplicationCover, CndURL } from '../utils/Routes';
import type { ViewOptions, RawApplication, ApplicationTeam, InstallParams, ApplicationRoleConnectionMetadata, ApplicationRoleConnectionMetadataEditOptions } from '../types';

export class ClientApplication implements RawApplication {
  private readonly client: Client;
  public readonly rpc_origins: string[];
  public readonly summary: string;
  public readonly install_params: InstallParams;
  public readonly id: Snowflake;
  public readonly name: string;
  public readonly commands: ApplicationCommandManager;
  public readonly icon: string | undefined;
  public readonly description: string;
  public readonly rcp_origins: string[] | undefined;
  public readonly bot_public: boolean;
  public readonly bot_require_code_grant: boolean;
  public readonly terms_of_service_url: string | undefined;
  public readonly privaci_policy_url: string | undefined;
  public readonly owner: User | undefined;
  public readonly verify_key: string;
  public readonly team: ApplicationTeam;
  public readonly guild_id: Snowflake | undefined;
  public readonly primary_sku_id: Snowflake | undefined;
  public readonly slug: string | undefined;
  public readonly cover_image: string | undefined;
  public readonly flags: number | undefined;
  public readonly tags: string[] | undefined;
  public readonly custom_install_url: string | undefined;
  public readonly role_connections_verification_url: string | undefined;
  private readonly axios_config: { headers: { Authorization: `Bot ${string}` } };

  constructor(app: RawApplication, client: Client) {
    this.client = client;
    this.id = app.id;
    this.commands = new ApplicationCommandManager(client);
    this.name = app.name;
    this.icon = app.icon;
    this.description = app.description;
    this.rpc_origins = app.rpc_origins;
    this.bot_public = app.bot_public;
    this.bot_require_code_grant = app.bot_require_code_grant;
    this.terms_of_service_url = app.terms_of_service_url;
    this.privaci_policy_url = app.privacy_policy_url;
    this.owner = this.owner ? new User(this.owner, this.client) : void 0;
    this.verify_key = app.verify_key;
    this.team = app.team;
    this.guild_id = app.guild_id;
    this.primary_sku_id = app.primary_sku_id;
    this.slug = app.slug;
    this.cover_image = app.cover_image;
    this.flags = app.flags;
    this.custom_install_url = app.custom_install_url;
    this.role_connections_verification_url = app.role_connections_verification_url;
    this.axios_config = { headers: { Authorization: `Bot ${this.client.token}` } };
    this.summary = app.summary;
    this.install_params = app.install_params;

    Object.assign(this, app);
  };

  /**
   * Returns the client icon URL
   * @param {ViewOptions} options - Optional image options
   * @returns {string | undefined'}
   */

  iconURL(options?: ViewOptions): string | undefined {
    return this.icon && `https://cdn.discordapp.com/${this.id}/icons/${this.icon}.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
  };

  /**
   * Stringify the client application object into client's application's name
   * @returns {string}
   */

  toString(): string {
    return this.name;
  };

  /**
   * Fetch the role connection metadata records
   * @returns {Promise<ApplicationRoleConnectionMetadata[]>}
   */

  async fetchRoleConnectionMetadataRecords(): Promise<Array<ApplicationRoleConnectionMetadata>> {
    const { data }: { data: ApplicationRoleConnectionMetadata[] } = await rest.get(RoleConnectionMetadata(this.id), this.axios_config);

    return data;
  };

  /**
   * Update the role connection metadata records
   * @param {ApplicationRoleConnectionMetadataEditOptions} options 
   * @returns {ApplicationRoleConnectionMetadata[]}
   */

  async updateRoleConnectionMetadataRecords(options: ApplicationRoleConnectionMetadataEditOptions): Promise<Array<ApplicationRoleConnectionMetadata>> {
    const { data }: { data: Array<ApplicationRoleConnectionMetadata> } = await rest.put(RoleConnectionMetadata(this.id), options, this.axios_config);

    return data;
  };

  /**
   * Returns the client application cover URL
   * @param {ViewOptions} options - Option image options
   * @returns {string | undefined}
   */

  coverURL(options?: ViewOptions): string | undefined {
    return this.cover_image && CndURL + ApplicationCover(this.id, this.cover_image) + `.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
  };
};