import { Guild } from "../managers/Guild";
import { Channel } from "../managers/Channel";
import { Message } from "../managers/Message";
import { Interaction } from "../managers/Interaction";
import { ChannelDelete } from "../managers/ChannelDelete";
import { ChannelPinsUpdate } from "../managers/channelPinsUpdate"

export interface ClientEvents {
    messageCreate: (message: Message) => void;
    guildCreate: (guild: Guild) => void;
    interactionCreate: (interaction: Interaction) => void;
    connect: () => void;
    channelCreate: (channel: Channel) => void;
    channelDelete: (channel: ChannelDelete) => void;
    channelPinsUpdate: (channel: ChannelPinsUpdate) => void;
};