import { Client } from "../entities/Client";
import { IUser } from "../interfaces/IRawUserData";
import { IApplication } from "../interfaces/IApplication";
import { ClientApplication } from "../entities/ClientApplication";

export default function (payload: { d: any }, client: Client): void {
  const user: IUser = {
    id: payload.d.user.id,
    username: payload.d.user.username,
    discriminator: payload.d.user.discriminator,
    bot: payload.d.user.bot,
    avatar: payload.d.user.avatar
  };

  const application: IApplication = {
    id: payload.d.application.id as string,
    flags: payload.d.application?.flags as number
  };

  client.user = user;
  client.app = new ClientApplication(application, client);

  client.emit('connect');
};