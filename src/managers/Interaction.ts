import { Guild } from "./Guild";
import { api } from '../constants/Api';
import { Client } from "../entities/Client";
import { IUser } from "../interfaces/IUser";
import { OptionType } from "../types/OptionType";
import { IMessage } from "../interfaces/IMessage";
import { IInteraction } from "../interfaces/IInteraction";
import { IResolvedData } from "./interfaces/IResolvedData";
import { IAutocomplete } from "./interfaces/IAutocomplete";
import { IInteractionCallbackDataStructure } from "./interfaces/IInteractionCallbackDataStructure";

export class Interaction implements IInteraction {
  #client: Client;
  public readonly id: string;
  public readonly application_id: string;
  public readonly type: number;
  public readonly token: string;
  public readonly version: number;
  public readonly channel_id?: string;
  public readonly guild: Guild;
  public readonly message;
  public readonly options;
  public followUpMessage?: IMessage;
  public originalInteraction?: IInteraction;
  public readonly locale;
  public readonly name: string | void;
  public readonly target_id: string | void;
  public readonly guild_id: string | void;
  public readonly raw_options: object | void;
  public readonly resolved?: IResolvedData;
  public readonly app_permissions: string | undefined;
  public readonly user?: IUser;
  public readonly target_user;
  public readonly target_member;
  public readonly target_message;
  public readonly custom_id;
  public readonly component_type?: number;

  constructor(props: IInteraction, client: Client) {
    this.id = props.id;
    this.custom_id = props.data?.custom_id ?? null;
    this.application_id = props.application_id;
    this.type = props.type;
    this.token = props.token;
    this.version = props.version;
    this.guild = props.guild;
    this.message = props.message;
    this.#client = client;
    this.locale = props.locale,
    this.name = props.data?.name;
    this.target_id = props.data?.target_id;
    this.guild_id = props.data?.guild_id;
    this.raw_options = props.data?.options;
    this.resolved = props.data?.resolved;
    this.app_permissions = props.app_permissions;
    this.user = props.user;
    this.component_type = props.data?.component_type;
    this.target_user = this.target_id ? this.resolved?.users?.[this.target_id] : null;
    this.target_member = this.target_id ? this.resolved?.members?.[this.target_id] : null;
    this.target_message = this.target_id ? this.resolved?.messages?.[this.target_id] : null;

    this.options = {
      /**
       * @description Get a string option
       * @param name - The name of the option to be searched for
       * @returns {OptionType}
       */
      getStringOption(name: string): OptionType {
        if (!props.data?.options?.some(a => a.name === name && a.type === 3)) return;

        return props.data.options.find(a => a.name === name && a.type === 3)?.value
      },
      /**
       * @description Get a boolean option
       * @param name - The name of the option to be searched for
       * @returns {OptionType}
       */
      getBooleanOption(name: string): OptionType {
        if (!props.data?.options?.some(a => a.name === name && a.type === 5)) return;

        return props.data.options.find(a => a.name === name && a.type === 5)?.value;
      },
      /**
       * @description Get a number option
       * @param name - The name of the option to be searched for
       * @returns {OptionType}
       */
      getNumberOption(name: string): OptionType {
        if (!props.data?.options?.some(a => a.name === name && a.type === 10)) return;

        return props.data.options.find(a => a.name === name && a.type === 10)?.value;
      },
      /**
       * @description Get a attachment option
       * @param name - The name of the option to be searched for
       * @returns {OptionType}
       */
      getAttachmentOption(name: string): OptionType {
        if (!props.data?.options?.some(a => a.name === name && a.type === 11)) return;

        return props.data.options.find(a => a.name === name && a.type === 11)?.value;
      },
      /**
       * @description Get a mentionable option
       * @param name - The name of the option to be searched for
       * @returns {OptionType}
       */
      getMentionableOption(name: string): OptionType {
        if (!props.data?.options?.some(a => a.name === name && a.type === 9)) return;

        return props.data.options.find(a => a.name === name && a.type === 9)?.value;
      },
      /**
       * @description Get a role option
       * @param name - The name of the option to be searched for
       * @returns {OptionType}
       */
      getRoleOption(name: string): OptionType {
        if (!props.data?.options?.some(a => a.name === name && a.type === 8)) return;

        return props.data.options.find(a => a.name === name && a.type === 8)?.value;
      },
      /**
       * @description Get a channel option
       * @param name - The name of the option to be searched for
       * @returns {OptionType}
       */
      getChannelOption(name: string): OptionType {
        if (!props.data?.options?.some(a => a.name === name && a.type === 7)) return;

        return props.data.options.find(a => a.name === name && a.type === 7)?.value;
      },
      /**
       * @description Get a user option
       * @param name - The name of the option to be searched for
       * @returns {OptionType}
       */
      getUserOption(name: string): OptionType {
        if (!props.data?.options?.some(a => a.name === name && a.type === 6)) return;

        return props.data.options.find(a => a.name === name && a.type === 6)?.value;
      },
      /**
       * @description Get a integer option
       * @param name - The name of the option to be searched for
       * @returns {OptionType}
       */
      getIntegerOption(name: string): OptionType {
        if (!props.data?.options?.some(a => a.name === name && a.type === 4)) return;

        return props.data.options.find(a => a.name === name && a.type === 4)?.value;
      },
      /**
       * @description Get the autocomplete value or all focused values
       * @param all - Get all focused values, used when you have more than one option with autocomplete
       * @returns {OptionType | IInteraction[]}
       */
      getFocusedOption(all?: boolean): OptionType | OptionType[] {
        if (!props.data?.options?.some(a => a.focused)) return;

        return all ? props.data.options.filter(a => a.focused).map(a => a?.value) : props.data.options.find(a => a.focused)?.value;
      },
      subcommand: props.data?.options?.find(x => x.type === 2)?.name ?? null,
      subcommand_group: props.data?.options?.find(x => x.type === 2)?.options?.[0]?.name ?? null
    };

    Object.assign(this, props);
  };

  /**
   * @description Reply to the original interaction 
   * @param {IInteractionCallbackDataStructure | string} data - The data that will be used in the interaction
   * @returns {Promise<IInteraction | void>}
   */

  async reply(data: IInteractionCallbackDataStructure | string): Promise<void | IInteraction> {
    typeof data !== 'string' && data.ephemeral === true ? data['flags'] = (1 << 6) : undefined;

    const d = await api.post(`interactions/${this.id}/${this.token}/callback`, {
      type: 4,
      data: typeof data === 'string' ? { content: data } : data
    }, {
      headers: {
        Authorization: `Bot ${this.#client.token}`
      }
    });

    this.originalInteraction = d.data;

    return d.data;
  };

  /**
   * @description Delete the original interaction that was sent
   * @returns {void}
   */

  deleteReply(): void {
    return void api.delete(`/webhooks/${this.#client.user!.id}/${this.token}/messages/@original`, { headers: { Authorization: `Bot ${this.#client.token}` } });
  };

  /**
   * @description Fetch for the original interaciton
   * @returns {Promise<IInteraction>}
   */

  async fetchReply(): Promise<IInteraction> {
    const d = await api.get(`/webhooks/${this.#client.user?.id}/${this.token}/messages/@original`, { headers: { Authorization: `Bot ${this.#client.token}` } });

    return d?.data;
  };

  /**
   * @description Edit the original interaction
   * @param {IInteractionCallbackDataStructure | string} data - The data that will be used in the interaction
   * @returns {Promise<IInteraction | void>}
   */

  async updateReply(data: IInteractionCallbackDataStructure | string): Promise<IInteraction | void> {
    if (!data) return;

    const d = await api.patch(`/webhooks/${this.#client.user?.id}/${this.token}/messages/@original`, typeof data === 'string' ? { content: data } : data, { headers: { Authorization: `Bot ${this.#client.token}` } });

    return d?.data;
  };

  /**
   * @description Send this interaction as a follow up to the original interaction
   * @param {IInteractionCallbackDataStructure | string} data - The data that will be used in the interaction
   * @returns {Promise<Interaction | void>}
   */

  async createFollowUp(data: IInteractionCallbackDataStructure | string): Promise<Interaction | void> {
    if (!data) return;

    typeof data !== 'string' && data.ephemeral === true ? data['flags'] = (1 << 6) : undefined;

    const d = await api.post(`/webhooks/${this.#client.user?.id}/${this.token}`, typeof data === 'string' ? { content: data } : data, { headers: { Authorization: `Bot ${this.#client.token}` } });

    this.followUpMessage = d?.data;

    return d?.data;
  };

  /**
   * @description Fetch for the message that was sent as a follow up
   * @returns {Promise<IInteraction | void>}
   */

  async fetchFollowUp(): Promise<IInteraction | void> {
    const d = await api.get(`/webhooks/${this.#client.user?.id}/${this.token}/messages/${this.followUpMessage?.id}`);

    return d?.data;
  };

  /**
   * @description Edit the message that was sent as a follow up
   * @param {IInteractionCallbackDataStructure | string} data - The data that will be used in the interaction
   * @returns {Promise<IInteraction | void>}
   */

  async updateFollowUp(data: IInteractionCallbackDataStructure | string): Promise<IInteraction | void> {
    if (!data) return;

    const d = await api.patch(`/webhooks/${this.#client.user?.id}/${this.token}/messages/${this.followUpMessage?.id}`, typeof data === 'string' ? { content: data } : data, { headers: { Authorization: `Bot ${this.#client.token}` } });

    return d?.data;
  };

  /**
   * @description Delete the message that was sent as a follow up
   * @returns {Promise<any>}
   */

  async deleteFollowUp(): Promise<any> {
    const d = await api.delete(`/webhooks/${this.#client.user?.id}/${this.token}/messages/${this.followUpMessage?.id}`, { headers: { Authorization: `Bot ${this.#client.token}` } });

    return d.data
  };

  /**
   * Returns boolean if the interaction is an autocomplete
   * @returns {boolean}
   */

  isApplicationCommandAutocomplete(): boolean {
    return this.type === 4;
  };

  /**
   * Returns boolean if the interaction is a modal submit
   * @returns {boolean}
   */

  isModalSubmit(): boolean {
    return this.type === 5;
  };

  /**
   * Returns boolean if the interaction is message component
   * @returns {boolean}
   */

  isMessageComponent(): boolean {
    return this.type === 3;
  };

  /**
   * Returns boolean if the interaction is an application command
   * @returns {boolean}
   */

  isApplicationCommand(): boolean {
    return this.type === 2;
  };

  /**
   * @description Respond the autocomplete
   * @param {IAutocomplete[]} data - Data that will be answered in the autocomplete
   * @returns {Promise<void>}
   */

  async autocomplete(data: IAutocomplete[]): Promise<void> {
    if (!data || !data.length) return;

    const d = await api.post(`/interactions/${this.id}/${this.token}/callback`, { type: 8, data: { choices: data } }, { headers: { Authorization: `Bot ${this.#client.token}` } });

    return;
  };

  /**
   * Returns boolean if the interaction was used in a guild
   * @returns {boolean}
   */

  isInGuild(): boolean {
    return this.guild_id ? true : false;
  };

  /**
   * Returns boolean if the interaction was triggered by a button
   * @returns {boolean}
   */

  isButton(): boolean {
    return this.component_type === 2;
  };

  /**
   * Returns boolean if the interaction was triggered by a select menu
   * @returns {boolean}
   */

  isStringSelectMenu(): boolean {
    return this.component_type === 3;
  };

  /**
   * Returns boolean if the interaction was triggered by a select menu for users
   * @returns {boolean}
   */

  isUserSelectMenu(): boolean {
    return this.component_type === 5;
  };
  /**
   * Returns boolean if the interaction was triggered by a select menu for roles
   * @returns {boolean}
   */
  isRoleSelectMenu(): boolean {
    return this.component_type === 6;
  };

  /**
   * Returns boolean if the interaction was triggered by a select menu for mentionables (user and roles)
   * @returns {boolean}
   */

  isMentionableSelectMenu(): boolean {
    return this.component_type === 7;
  };

  /**
   * Returns boolean if the interaction was triggered by a select menu for channels
   * @returns {boolean}
   */

  isChannelSelectMenu(): boolean {
    return this.component_type === 8;
  };

  /**
   * Returns boolean if the interaction was triggered for some select menu option (users, roles, mentionables, channels, strings)
   * @returns {boolean}
   */

  isSomeSelectMenuType(): boolean {
    return [3, 5, 6, 7, 8].includes(this.component_type as number);
  };

  /**
   * Returns boolean if the interaction was triggered by a text input
   * @returns {boolean}
   */

  isTextInput(): boolean {
    return this.component_type === 4;
  };

  /**
   * Returns boolean if the interaction can be followed
   * @returns {boolean}
   */

  isFollowable(): boolean {
    return !this.followUpMessage && this.originalInteraction ? true : false;
  };
};