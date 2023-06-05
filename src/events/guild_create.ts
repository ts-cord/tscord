import { GuildRole } from "../managers/GuildRole";
import { User } from "../managers/User";
import { Group } from "../utils/Group";
import { Guild } from "../managers/Guild";
import { GuildEmoji } from "../managers/GuildEmoji";
import { Client } from "../entities/Client";
import { GuildMember } from "../managers/GuildMember";
import { Channel } from "../managers/Channel";
import { RawGuildData } from "../interfaces/IRawGuildData";
import { RawGuildEmoji } from "../interfaces/IRawGuildEmoji";
import { GuildSticker } from "../managers/GuildSticker";
import { RawGuildStickerData } from "../interfaces/IRawGuildStickerData";
import { GuildChannelData } from "../interfaces/IGuildChannelData";
import { GuildRoleData } from "../interfaces/IGuildRoleData";

export default function (data: { d: RawGuildData }, client: Client): void {
    const guild: RawGuildData = data.d;
    const roles: Group<string, GuildRole> = new Group();

    guild.roles.forEach((role: GuildRoleData) => roles.set(role.id, new GuildRole(role, client, guild.id)));
    guild.roles = roles;

    const emojis: Group<string, GuildEmoji> = new Group();

    guild.emojis.forEach((emoji: RawGuildEmoji) => emojis.set(emoji.id, new GuildEmoji(emoji, client, guild.id)));
    guild.emojis = emojis;

    const channels: Group<string, Channel> = new Group();
  
    guild.channels.forEach((channel: GuildChannelData) => channels.set(channel.id, new Channel(channel, client)));
    guild.channels = channels;

    const stickers: Group<string, Sticker> = new Group();

    guild.stickers?.forEach((sticker: ISticker) => stickers.set(sticker.id, new Sticker(sticker, client)));
    guild.stickers = stickers;

    const members: Group<string, Member> = new Group();

    guild.members.forEach((member: Member) => {
        members.set(member.user!.id, new Member(member, client, guild.id));

        client.users.set(member.user!.id, member!.user as User);
    });
    guild.members = members;

    client.guilds.set(guild.id, new Guild(guild, client));

    client.emit("guildCreate", new Guild(guild, client));
}