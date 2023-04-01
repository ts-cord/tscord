import { Client } from "../entities/Client";
import { IChannel } from "../interfaces/IChannel";
import { IOverwrite } from "../interfaces/IOverwrite";
import { ChannelType } from "../properties/ChannelType";

export class ChannelDelete {
    #client: Client;
    public id: Readonly<string>;
    public type: Readonly<number>;
    public topic: Readonly<string | void>;
    public rate_limit_per_user: Readonly<number | void>;
    public position: Readonly<number | void>;
    public permissions_overwrites: Readonly<IOverwrite[] | void>;
    public parent_id?: Readonly<string>;
    public nsfw: Readonly<boolean | void>;
    public name: Readonly<string | void>;
    public last_message_id: Readonly<string | void>;
    public guild_id: Readonly<string | void>;
    public flags: Readonly<number | void>;

    constructor(data: IChannel, client: Client) {
        this.id = data.id;
        this.type = data.type;
        this.#client = client;
        this.topic = data.topic;
        this.rate_limit_per_user = data.rate_limit_per_user;
        this.position = data.position;
        this.permissions_overwrites = data.permission_overwrites;
        this.parent_id = this.parent_id;
        this.nsfw = data.nsfw;
        this.name = data.name;
        this.last_message_id = data.last_message_id;
        this.guild_id = data.guild_id;
        this.flags = data.flags;

        Object.assign(this, data);
    };
    /**
   * Returns boolean if the channel is a text channel
   * @returns {boolean}
   */

  isText(): boolean {
    return this.type === ChannelType.GuildText;
  };

  /**
   * Returns boolean if the channel is a voice channel
   * @returns {boolean}
   */

  isVoice(): boolean {
    return this.type === ChannelType.GuildVoice
  };

  /**
   * Returns boolean if a channel is a DM
   * @returns {boolean}
   */

  isDM(): boolean {
    return this.type === ChannelType.DM;
  };

  /**
   * Returns boolean if the channel is a group DM
   * @returns {boolean}
   */

  isGroupDM(): boolean {
    return this.type === ChannelType.GroupDM
  };

  /**
   * Returns boolean if the channel is a stage voice channel
   * @returns {boolean}
   */

  isStageVoiceChannel(): boolean {
    return this.type === ChannelType.GuildStageVoice
  };

  /**
   * Returns boolean if the channels is a category channel
   * @returns {boolean}
   */

  isCategory(): boolean {
    return this.type === ChannelType.GuildCategory
  };

  /**
   * Returns boolean if the channel is a forum channel
   * @returns {boolean}
   */

  isGuildForum(): boolean {
    return this.type === ChannelType.GuildForum;
  };

  /**
   * Returns boolean if the channel is guild directory
   * @returns {boolean}
   */

  isGuildDirectory(): boolean {
    return this.type === ChannelType.GuildDirectory;
  };
};