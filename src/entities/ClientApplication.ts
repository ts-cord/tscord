import { Client } from './Client';
import { api } from '../constants/Api';
import { User } from '../managers/User';
import { Snowflake } from '../types/Snowflake';
import { ViewOptions } from '../interfaces/IViewOptions';
import { Application } from '../interfaces/IApplication';
import { ApplicationTeam } from '../interfaces/IApplicationTeam';
import { RoleConnectionMetadata, ApplicationCover } from '../utils/Routes';
import { ApplicationCommandManager } from '../managers/ApplicationCommandManager';
import { ApplicationRoleConnectionMetadata } from '../interfaces/IApplicationRoleConnectionMetadata';
import { ApplicationRoleConnectionMetadataUpdateOptions } from '../interfaces/IApplicationRoleConnectionMetadataUpdateOptions';

export class ClientApplication implements Application {
  private readonly client: Client;
  private readonly axios_config: { headers: { Authorization: `Bot ${string}` } };
  public readonly id: Snowflake;
  public readonly name?: string;
  public readonly commands: ApplicationCommandManager;
  public readonly icon?: string;
  public readonly description?: string;
  public readonly rcp_origins?: string[];
  public readonly bot_public?: boolean;
  public readonly bot_require_code_grant?: boolean;
  public readonly terms_of_service_url?: string;
  public readonly privaci_policy_url?: string;
  public readonly owner?: User;
  public readonly verify_key?: string;
  public readonly team?: ApplicationTeam;
  public readonly guild_id?: Snowflake;
  public readonly primary_sku_id?: Snowflake;
  public readonly slug?: string;
  public readonly cover_image?: string;
  public readonly flags?: number;
  public readonly tags?: string[];
  public readonly custom_install_url?: string;
  public readonly role_connections_verification_url?: string;

  constructor(app: Application, client: Client) {
    this.client = client;
    this.id = app.id;
    this.commands = new ApplicationCommandManager(client);
    this.name = app.name;
    this.icon = app.icon;
    this.description = app.description;
    this.rcp_origins = app.rpc_origins;
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
    this.tags = app.tags;
    this.custom_install_url = app.custom_install_url;
    this.role_connections_verification_url = app.role_connections_verification_url;
    this.axios_config = { headers: { Authorization: `Bot ${this.client.token}` } };

    Object.assign(this, app);
  };

  iconURL(options?: ViewOptions): string | undefined {
    return this.icon && `https://cdn.discordapp.com/${this.id}/icons/${this.icon}.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
  };
  toString(): string | undefined {
    return this.name;
  };
  async fetchRoleConnectionMetadataRecords(): Promise<Array<ApplicationRoleConnectionMetadata>> {
    const { data }: { data: ApplicationRoleConnectionMetadata[] } = await api.get(RoleConnectionMetadata(this.id), this.axios_config);

    return data;
  };
  async updateRoleConnectionMetadataRecords(options: ApplicationRoleConnectionMetadataUpdateOptions): Promise<Array<ApplicationRoleConnectionMetadata>> {
    const { data }: { data: Array<ApplicationRoleConnectionMetadata> } = await api.put(RoleConnectionMetadata(this.id), options, this.axios_config);

    return data;
  };
  appCoverURL(options?: ViewOptions): string | undefined {
    return this.cover_image && ApplicationCover(this.id, this.cover_image) + `.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
  };
};