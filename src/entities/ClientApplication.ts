import { Client } from './Client';
import { IApplication } from '../interfaces/IApplication';
import { ClientApplicationCommands } from './ClientApplicationCommands';
import { IUser } from '../interfaces/IUser';
import { IApplicationTeam } from '../interfaces/IApplicationTeam';

export class ClientApplication implements IApplication {
  public readonly id: string;
  public readonly name?: string;
  public readonly commands: ClientApplicationCommands;
  public readonly icon?: string;
  public readonly description?: string;
  public readonly rcp_origins?: string[];
  public readonly bot_public?: boolean;
  public readonly bot_require_code_grant?: boolean;
  public readonly terms_of_service_url?: string;
  public readonly privaci_policy_url?: string;
  public readonly owner?: IUser;
  public readonly verify_key?: string;
  public readonly team?: IApplicationTeam;
  public readonly guild_id?: string;
  public readonly primary_sku_id?: string;
  public readonly slug?: string;
  public readonly cover_image?: string;
  public readonly flags?: number;
  public readonly tags?: string[];
  public readonly custom_install_url?: string;
  public readonly role_connections_verification_url?: string;

  constructor(app: IApplication, client: Client) {
    this.id = app.id;
    this.commands = new ClientApplicationCommands(client);
    this.name = app.name;
    this.icon = app.icon;
    this.description = app.description;
    this.rcp_origins = app.rpc_origins;
    this.bot_public = app.bot_public;
    this.bot_require_code_grant = app.bot_require_code_grant;
    this.terms_of_service_url = app.terms_of_service_url;
    this.privaci_policy_url = app.privacy_policy_url;
    this.owner = app.owner;
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

    Object.assign(this, app);
  };
  iconURL(params?: { format?: 'png' | 'webp' | 'jepg', size?: number }) {
    return `https://cdn.discordapp.com/${this.id}/icons/${this.icon}.${params?.format ?? 'png'}?size=${params?.size ?? 1024}`;
  };
};