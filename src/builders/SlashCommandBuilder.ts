import { BasicBuilder } from "./BasicBuilder";
import { ILocalizations } from "../interfaces/ILocalizations";
import { SlashCommandTypes } from "../props/SlashCommandTypes";
import { SlashCommandData } from "../interfaces/ISlashCommandData";
import { SlashCommandOptionsData } from "../interfaces/ISlashCommandOptionsData";

export class SlashCommandBuilder extends BasicBuilder<SlashCommandData> {
    /**
     * Create slash command data by the constructor
     * @param {SlashCommandData} data - Data to be set
     * @constructor
     */

    constructor(data?: SlashCommandData) {
        super(data);
    };

    /**
     * The set name of this Slash Command
     * @param {string} name - The name content 
     * @returns {this}
     */

    setName(name: string): this {
        this.data.name = name;

        return this;
    };

    /**
     * Set the description of this Slash Command
     * @param {string} description - The description content
     * @returns {this}
     */

    setDescription(description: string): this {
        this.data.description = description;

        return this;
    };

    /**
     * Set the type of this Slash Command
     * @param {SlashCommandTypes.SubCommand | SlashCommandTypes.SubCommandGroup} type - The type to be set
     * @returns {this}
     */

    setType(type: SlashCommandTypes.SubCommand | SlashCommandTypes.SubCommandGroup): this {
        this.data.type = type;

        return this;
    };

    /**
     * Set if this Slash Command can only be used in nsfw channels
     * @param {boolean} nsfw - Pass true if so
     * @returns {this}
     */

    setNSFW(nsfw: boolean): this {
        this.data.nsfw = nsfw;

        return this;
    };

    /**
     * Set default permissions for this Slash Command
     * @param {number} permissions - The default permissions
     * @returns {this}
     */

    setDefaultMemberPermissions(permissions: number): this {
        this.data.default_member_permissions = permissions;

        return this;
    };

    /**
     * Set the descriptions localizations for this Slash Command
     * @param {ILocalizations} descriptions - The descriptions localizations
     * @returns {this}
     */

    setDescriptionLocalizations(descriptions: ILocalizations): this {
        this.data.description_localizations = descriptions;

        return this;
    };

    /**
     * Set the names localizations for this Slash Command
     * @param {ILocalizations} names - The names localizations
     * @returns {this}
     */

    setNameLocalizations(names: ILocalizations): this {
        this.data.name_localizations = names;

        return this;
    };

    /**
     * Set whether users can use the Slash Command in your DMS
     * @param {boolean} dmPermission - Pass true if they can or false if cannot
     * @returns {this}
     */

    setDMPermission(dmPermission: boolean): this {
        this.data.dm_permission = dmPermission;

        return this;
    };

    /**
     * Add any options
     * @param {SlashCommandOptionsData[]} options - The options that will be added
     * @returns {this}
     */

    addAnyOptions(...options: SlashCommandOptionsData[]): this {
        this.data.options ? this.data.options.push(...options) : this.data.options = options;

        return this;
    };

    /**
     * Set any options
     * @param {SlashCommandOptionsData[]} options - The options that will be set
     * @returns {this}
     */

    setAnyOptions(...options: SlashCommandOptionsData[]): this {
        this.data.options = options;

        return this;
    };

    /**
     * The max options per slash command
     */

    static readonly MaxOptionsPerSlashCommand: number = 25;
};