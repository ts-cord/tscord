import { IGuild } from "../interfaces/IGuild";
import { IRole } from "../interfaces/IRole";
import { Client } from "../entities/Client";
import { Group } from "../entities/Group";
import { ISticker } from "../interfaces/ISticker";
import { IMember } from "../interfaces/IMember";
import { IEmoji } from "../interfaces/IEmoji";
import { IChannel } from "../interfaces/IChannel";
import { IUser } from "../interfaces/IUser";

export default function (data: any, client: Client) {

  const guild: IGuild = data.d

  const roles: Group<string, IRole> = new Group()
  guild.roles.forEach(role => roles.set(role.id, role))
  guild.roles = roles

  const emojis: Group<string, IEmoji> = new Group()
  guild.emojis.forEach(emoji => emojis.set(emoji.id, emoji))
  guild.emojis = emojis

  const channels: Group<string, IChannel> = new Group()
  guild.channels.forEach(channel => channels.set(channel.id, channel))
  guild.channels = channels

  const stickers: Group<string, ISticker> = new Group();
  guild.stickers?.forEach(sticker => stickers.set(sticker.id, sticker));
  guild.stickers = stickers;

  const members: Group<string, IMember> = new Group();
  guild.members.forEach(member => {
    members.set(member.user?.id as string, member)
    client.users.set(member?.user?.id as string, member?.user as IUser)
  })
  guild.members = members

  client.guilds.set(guild.id, guild);
};