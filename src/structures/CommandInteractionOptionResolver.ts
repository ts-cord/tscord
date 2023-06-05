import { Basic } from "./Basic";
import { Client } from "../entities/Client";
import { RawInteractionData, ApplicationCommandInteractionOptionData, SlashCommandValueOption, SlashCommandMentionableOptionValue, RawGuildRole, RawDiscordAPIUserData, AttachmentData, AutocompleteFocusedOption } from "../types";

export class CommandInteractionOptionResolver extends Basic {
    public readonly client: Client;
    public readonly data: RawInteractionData;

    /**
     * A resolver for command interaction options
     * @param {RawInteractionData} data - Interaction data
     * @param {Client} client - Base for all
     */

    constructor(data: RawInteractionData, client: Client) {
        super(client);

        this.data = data;
        this.client = super.client;
    }

    /**
     * Get an option by its name
     * @param {string} name - Option name
     * @param {T} required - Whether the option is required
     * @returns {T extends true ? SlashCommandValueOption : SlashCommandValueOption | undefined} Always returns a value if the option is required
     */

    get<T extends boolean = false>(name: string, required?: T): T extends true ? SlashCommandValueOption : SlashCommandValueOption | undefined {
        const option: ApplicationCommandInteractionOptionData | undefined = this.data.options?.find((option: ApplicationCommandInteractionOptionData): boolean => option.name === name);

        return option?.value as T extends true ? SlashCommandValueOption : SlashCommandValueOption | undefined;
    }

    /**
     * Get a string option
     * @param {string} name - Option name
     * @param {T} required - Whether the option is required
     * @returns {T extends true ? string : string | undefined}
     */

    getString<T extends boolean = false>(name: string, required?: T): T extends true ? string : string | undefined {
        return this.get(name, required) as T extends true ? string : string | undefined;
    }

    /**
     * Get a boolean option
     * @param {string} name - Option name
     * @param {T} required - Whether the option is required
     * @returns {T extends true ? boolean : boolean | undefined}
     */

    getBoolean<T extends boolean = false>(name: string, required?: T): T extends true ? boolean : boolean | undefined {
        return this.get(name, required) as T extends true ? boolean : boolean | undefined;
    }

    /**
     * Get a number option
     * @param {string} name - Option name
     * @param {T} required - Whether the option is required
     * @returns {T extends true ? number : numbe | undefined}
     */

    getNumber<T extends boolean = false>(name: string, required?: T): T extends true ? number : number | undefined {
        return this.get(name, required) as T extends true ? number : number | undefined;
    }

    /**
     * Get a integer option
     * @param {string} name - Option name
     * @param {T} required - Whether the option is required
     * @returns {T extends true ? number : number | undefined}
     */

    getInteger<T extends boolean = false>(name: string, required?: T): T extends true ? number : number | undefined {
        return this.getNumber(name, required);
    }

    /**
     * Get a subcommand option option
     * @param {string} name - Option name
     * @param {T} required - Whether the option is required
     * @returns {T extends true ? string : string | undefined}
     */

    getSubcommand<T extends boolean = false>(name: string, required?: T): T extends true ? string : string | undefined {
        return this.get(name, required) as T extends true ? string : string | undefined;
    }

    /**
     * Get a sub command group option
     * @param {string} name - Option name
     * @param {T} required - Whether the option is required
     * @returns {T extends true ? string : string | undefined}
     */

    getSubcommandGroup<T extends boolean = false>(name: string, required?: T): T extends true ? string : string | undefined {
        return this.get(name, required) as T extends true ? string : string | undefined;
    }

    /**
     * Get a mentionable option
     * @param {string} name - Option name
     * @param {T} required - Whether the option is required
     * @returns {T extends true ? SlashCommandMentionableOptionValue : SlashCommandMentionableOptionValue | undefined}
     */

    getMentionable<T extends boolean = false>(name: string, required?: T): T extends true ? SlashCommandMentionableOptionValue : SlashCommandMentionableOptionValue | undefined {
        return this.get(name, required) as T extends true ? SlashCommandMentionableOptionValue : SlashCommandMentionableOptionValue | undefined;
    }

    /**
     * Get a role option
     * @param {string} name - Option name
     * @param {T} required - Whether the option is required
     * @returns {}
     */

    getRole<T extends boolean = false>(name: string, required?: T): T extends true ? RawGuildRole : RawGuildRole | undefined {
        return this.get(name, required) as T extends true ? RawGuildRole : RawGuildRole | undefined;
    }

    /**
     * Get an user option
     * @param {string} name - Option name
     * @param {T} required - Whether the option is required
     * @returns {T extends true ? RawDiscordAPIUserData : RawDiscordAPIUserData | undefined}
     */

    getUser<T extends boolean = false>(name: string, required?: T): T extends true ? RawDiscordAPIUserData : RawDiscordAPIUserData | undefined {
        return this.get(name, required) as T extends true ? RawDiscordAPIUserData : RawDiscordAPIUserData | undefined;
    }

    /**
     * Get an attachment option
     * @param {string} name - Option name
     * @param {T} required - Whether the option is required
     * @returns {T extends true ? AttachmentData : AttachmentData | undefined}
     */

    getAttachment<T extends boolean = false>(name: string, required?: T): T extends true ? AttachmentData : AttachmentData | undefined {
        return this.get(name, required) as T extends true ? AttachmentData : AttachmentData | undefined;
    }

    /**
     * Gets the focsued option
     * @param {T} full - Whether to get the full option object
     * @returns {T extends true ? AutocompleteFocusedOption : string}
     */

    getFocused<T extends boolean = false>(full?: T): T extends true ? AutocompleteFocusedOption : string {
        const option: ApplicationCommandInteractionOptionData | undefined = this.data.options?.find((option: ApplicationCommandInteractionOptionData): boolean | undefined => option.focused);

        return (full ? option : option?.value) as T extends true ? AutocompleteFocusedOption : string;
    }
}