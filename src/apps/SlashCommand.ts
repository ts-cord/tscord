import { ISlashCommand } from "../interfaces/ISlashCommand";
import { ISlashChoices } from "../interfaces/ISlashChoices";
import { ILocalizations } from "../interfaces/ILocalizations";
import { SlashCommandGlobalMethods } from "./interfaces/SlashCommandGlobalMethods";
import { SlashCommandStringOptionMethods } from "./interfaces/SlashCommandStringOptionMethods";
import { SlashCommandNumberOptionMethods } from "./interfaces/SlashCommandNumberOptionMethods";

export class SlashCommand {
    data: ISlashCommand = { name: undefined, description: undefined, type: undefined, options: [] };

    constructor() {};

    setName(name: string): SlashCommand {
        this.data.name = name;

        return this;
    };
    setDescription(description: string): SlashCommand {
        this.data.description = description;

        return this;
    };
    setDescriptionLocalizations(description: ILocalizations): SlashCommand {
        this.data.description_localizations = description;

        return this;
    };
    setNameLocalizations(name: ILocalizations): SlashCommand {
        this.data.name_localizations = name;

        return this;
    };
    setNSFW(can: boolean): SlashCommand {
        this.data.nsfw = can;

        return this;
    };
    setDMPermission(can: boolean): SlashCommand {
        this.data.dm_permission = can;

        return this;
    };
    setDefaultMemberPermissions(permissions: number): SlashCommand {
        this.data.default_member_permissions = permissions;

        return this;
    };
    setType(type: 'Subcommand' | 'SubcommandGroup' | number): SlashCommand {
        this.data.type = ({ Subcommand: 1, SubcommandGroup: 2 }[type as string] ?? type as number);

        return this;
    };
    JSON(): ISlashCommand {
        return this.data;
    };
    setDataFrom(JSONData: ISlashCommand): SlashCommand {
        this.data = JSONData;
        return this;
    };
    addStringOption(func: (value: SlashCommandStringOptionMethods) => void) {
        const option = this.data.options![this.data.options!.push({ name: undefined, description: undefined, type: 3 }) - 1];

        const methods: SlashCommandStringOptionMethods = {
            setAutoComplete: (autocomplete: boolean) => {
                option.autocomplete = autocomplete;
                return methods;
            },
            setDescription: (description: string) => {
                option.description = description;
                return methods;
            },
            setDescriptionLocalizations: (localization: ILocalizations) => {
                option.description_localizations = localization;
                return methods;
            },
            setName: (name: string) => {
                option.name = name;
                return methods;
            },
            setMaxLength: (length: number) => {
                option.max_length = length
                return methods
            },
            setMinLength: (length: number) => {
                option.min_length = length
                return methods
            },
            setRequired: (required: boolean) => {
                option.required = required;
                return methods;
            },
            setNameLocalizations: (localizations: ILocalizations) => {
                option.name_localizations = localizations;
                return methods;
            },
            addChoices: (...values: ISlashChoices[]) => {
                option.choices = values
                return methods;
            }
        };

        func(methods);

        return this;
    };
    addUserOption(func: (value: SlashCommandGlobalMethods) => void): SlashCommand {
        const option = this.data.options![this.data.options!.push({ name: undefined, description: undefined, type: 6 }) - 1];

        const methods: SlashCommandGlobalMethods = {
            setDescription: (description: string) => {
                option.description = description
                return methods
            },
            setDescriptionLocalizations: (localization: ILocalizations) => {
                option.description_localizations = localization
                return methods
            },
            setName: (name: string) => {
                option.name = name
                return methods
            },
            setRequired: (required: boolean) => {
                option.required = required
                return methods
            },
            setNameLocalizations: (localizations: ILocalizations) => {
                option.name_localizations = localizations
                return methods
            }
        };

        return this;
    };
    addAttachmentOption(func: (value: SlashCommandGlobalMethods) => void): SlashCommand {
        const option = this.data.options![this.data.options!.push({ name: undefined, description: undefined, type: 11 }) - 1];
        const methods: SlashCommandGlobalMethods = {
            setDescription: (description: string) => {
                option.description = description
                return methods
            },
            setDescriptionLocalizations: (localization: ILocalizations) => {
                option.description_localizations = localization
                return methods
            },
            setName: (name: string) => {
                option.name = name
                return methods
            },
            setRequired: (required: boolean) => {
                option.required = required
                return methods
            },
            setNameLocalizations: (localizations: ILocalizations) => {
                option.name_localizations = localizations
                return methods
            }
        };

        func(methods);

        return this;
    };
    addBooleanOption(func: (value: SlashCommandGlobalMethods) => void): SlashCommand {
        const option = this.data.options![this.data.options!.push({ name: undefined, description: undefined, type: 5 }) - 1];
        const methods: SlashCommandGlobalMethods = {
            setDescription: (description: string) => {
                option.description = description
                return methods
            },
            setDescriptionLocalizations: (localization: ILocalizations) => {
                option.description_localizations = localization
                return methods
            },
            setName: (name: string) => {
                option.name = name
                return methods
            },
            setRequired: (required: boolean) => {
                option.required = required
                return methods
            },
            setNameLocalizations: (localizations: ILocalizations) => {
                option.name_localizations = localizations
                return methods
            }
        };

        func(methods);

        return this;
    };
    addMentionableOption(func: (value: SlashCommandGlobalMethods) => void): SlashCommand {
        const option = this.data.options![this.data.options!.push({ name: undefined, description: undefined, type: 9 }) - 1];
        const methods: SlashCommandGlobalMethods = {
            setDescription: (description: string) => {
                option.description = description
                return methods
            },
            setDescriptionLocalizations: (localization: ILocalizations) => {
                option.description_localizations = localization
                return methods
            },
            setName: (name: string) => {
                option.name = name
                return methods
            },
            setRequired: (required: boolean) => {
                option.required = required
                return methods
            },
            setNameLocalizations: (localizations: ILocalizations) => {
                option.name_localizations = localizations
                return methods
            }
        };

        func(methods);

        return this;
    };
    addRoleOption(func: (value: SlashCommandGlobalMethods) => void): SlashCommand {
        const option = this.data.options![this.data.options!.push({ name: undefined, description: undefined, type: 8 }) - 1];
        const methods: SlashCommandGlobalMethods = {
            setDescription: (description: string) => {
                option.description = description
                return methods
            },
            setDescriptionLocalizations: (localization: ILocalizations) => {
                option.description_localizations = localization
                return methods
            },
            setName: (name: string) => {
                option.name = name
                return methods
            },
            setRequired: (required: boolean) => {
                option.required = required
                return methods
            },
            setNameLocalizations: (localizations: ILocalizations) => {
                option.name_localizations = localizations
                return methods
            }
        };

        func(methods);

        return this;
    };
    addChannelOption(func: (value: SlashCommandGlobalMethods) => void): SlashCommand {
        const option = this.data.options![this.data.options!.push({ name: undefined, description: undefined, type: 7 }) - 1];
        const methods: SlashCommandGlobalMethods = {
            setDescription: (description: string) => {
                option.description = description
                return methods
            },
            setDescriptionLocalizations: (localization: ILocalizations) => {
                option.description_localizations = localization
                return methods
            },
            setName: (name: string) => {
                option.name = name
                return methods
            },
            setRequired: (required: boolean) => {
                option.required = required
                return methods
            },
            setNameLocalizations: (localizations: ILocalizations) => {
                option.name_localizations = localizations
                return methods
            }
        };

        func(methods);

        return this;
    };
    addIntergerOption(func: (value: SlashCommandNumberOptionMethods) => void): SlashCommand {
        const option = this.data.options![this.data.options!.push({ name: undefined, description: undefined, type: 4 }) - 1];
        const methods: SlashCommandNumberOptionMethods = {
            setDescription: (description: string) => {
                option.description = description
                return methods
            },
            setDescriptionLocalizations: (localization: ILocalizations) => {
                option.description_localizations = localization
                return methods
            },
            setName: (name: string) => {
                option.name = name
                return methods
            },
            setRequired: (required: boolean) => {
                option.required = required
                return methods
            },
            setNameLocalizations: (localizations: ILocalizations) => {
                option.name_localizations = localizations
                return methods
            },
            setMinValue: (value: number) => {
                option.min_value = value
                return methods
            },
            setMaxValue: (value: number) => {
                option.max_value = value
                return methods
            }
        };
       
        func(methods);

        return this;
    };
    addNumberOption(func: (value: SlashCommandNumberOptionMethods) => void): SlashCommand {
        const option = this.data.options![this.data.options!.push({ name: undefined, description: undefined, type: 10 }) - 1];
        const methods: SlashCommandNumberOptionMethods = {
            setDescription: (description: string) => {
                option.description = description
                return methods
            },
            setDescriptionLocalizations: (localization: ILocalizations) => {
                option.description_localizations = localization
                return methods
            },
            setName: (name: string) => {
                option.name = name;
                return methods;
            },
            setRequired: (required: boolean) => {
                option.required = required
                return methods
            },
            setNameLocalizations: (localizations: ILocalizations) => option.name_localizations = localizations,
            setMinValue: (value: number) => {
                option.min_value = value
                return methods;
            },
            setMaxValue: (value: number) => {
                option.max_value = value;
                return methods;
            }
        };

        func(methods);

        return this;
    };
};