import { User } from "../managers/User";
import { GuildEmoji } from "../managers/GuildEmoji";
import { GuildInvite } from "../managers/GuildInvite";
import { GuildMember } from "../managers/GuildMember";
import { Message } from "../managers/Message";
import { GuildSticker } from "../managers/GuildSticker";
import { SweeperOptions } from "./ISweeperOptions";
import { GuildBan } from "../managers/GuildBan";

export interface SweepKeys<T extends SweeperOptions = SweeperOptions> {
    bans?: T & { filter?: (ban: GuildBan) => unknown };
    messages?: T & { filter?: (message: Message) => unknown };
    members?: T & { filter?: (member: GuildMember) => unknown };
    users?: T & { filter?: (user: User) => unknown };
    stickers?: T & { filter?: (sticker: GuildSticker) => unknown };
    reactions?: T & { filter?: (reaction: any) => unknown }; //replace `any` with the reaction manager
    emojis?: T & { filter?: (emoji: GuildEmoji) => unknown };
    invites?: T & { filter?: (invite?: GuildInvite) => unknown };
    appCommands?: T & { filter?: (appCommand?: any) => unknown }; //replace `any` with the appcommand manager
    threads?: T & { filter?: (thread: any) => unknown }; //replace `any` with the thread manager
};