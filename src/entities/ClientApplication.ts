import { IApplication } from '../interfaces/IApplication';
import { ClientApplicationCommands } from './ClientApplicationCommands';
import { Client } from './Client';

export class ClientApplication implements IApplication {
  public readonly id: string;
  public readonly commands: ClientApplicationCommands;

  constructor(app: IApplication, client: Client) {
    this.id = app.id;
    this.commands = new ClientApplicationCommands(client);

    Object.assign(this, app);
  };
};