import { ChannelTypes, ButtonStyles, SelectMenuTypes, ContextMenuData, ApplicationCommandOptionType, TextInputStyles, ChannelSelectMenuData, MentionableSelectMenuData, RoleSelectMenuData, StringSelectMenuData, UserSelectMenuData } from "../types";
import type { Locales, SelectMenuOptionsData, ContextMenuData, ApplicationCommandData, ApplicationCommandOptionsData, EmbedThumbnailData, EmbedData, ButtonData, EmbedFieldData, EmbedVideoData, EmbedImageData, EmbedFooterData, EmbedAuthorData, GenericBuilderTypes, EmbedProviderData, SelectMenuData, TextInputData, MessageComponentData } from "../types";

declare class BasicBuilder<T extends GenericBuilderTypes> {
    data: T;

    constructor(data?: T): this;

    JSON(): T;
    static from<T extends GenericBuilderTypes>(data: T): BasicBuilder<T>;
}

declare class ButtonBuilder extends BasicBuilder<ButtonData> {
    constructor(data?: ButtonData): this;

    setLabel(label: string): this;
    setStyle(style: ButtonStyles): this;
    setEmoji(emoji: ButtonData["emoji"] | string): this;
    setCustomId(customId: string): this;
    setURL(URL: string): this;
    setDisabled(disabled: boolean): this;
}

declare class TextInputBuilder extends BasicBuilder<TextInputData> {
    constructor(data?: TextInputData): this;

    setLabel(label: string): this;
    setCustomId(customId: string): this;
    setStyle(style: TextInputStyles): this;
    setMinLenght(length: number): this;
    setMaxLenght(length: number): this;
    setRequired(required: boolean): this;
    setValue(value: string): this;
    setPlaceholder(placeholder: string): this;
}

declare class SelectMenuBuilder extends BasicBuilder<SelectMenuData> {
    constructor(data?: SelectMenuData): this;

    setCustomId(customId: string);
    setType(type: SelectMenuTypes): this;
    setChannelTypes(channelTypes: ChannelTypes): this;
    setPlaceholder(placeholder: string): this;
    setMinValues(minValues: number): this;
    setMaxValues(maxValues: number): this;
    setDisabled(disabled: boolean): this;
    addOptions(...options: Array<SelectMenuOptionsData>): this;
    setOptions(...options: Array<SelectMenuOptionsData>): this;
}

declare class ActionRowBuilder<T extends ButtonBuilder | SelectMenuBuilder | TextInputBuilder> extends BasicBuilder<MessageComponentData> {
    components: MessageComponentData["components"];

    constructor(data?: { type: 1, components: Array<T["data"]> }): this;

    setComponents(...components: Array<T>): this;
    addComponents(...components: Array<T>): this;

    static readonly MaxActionRowsPerMessage: number;
    static readonly MaxCustomIdLength: number;
}

declare class EmbedBuilder extends BasicBuilder<EmbedData> {
    constructor(data?: EmbedData): this;

    setColor(color: string): this;
    setDescription(description: string): this;
    setTitle(title: string): this;
    setURL(URL: string): this;
    setTimestamp(timestamp: number): this;
    setFooter(footer: EmbedFooterData | string): this;
    setImage(image: EmbedImageData | string): this;
    setThumbnail(thumbnail: EmbedThumbnailData | string): this;
    setVideo(video: EmbedVideoData | string): this;
    setAuthor(author: EmbedAuthorData | string): this;
    addFields(...fields: Array<EmbedFieldData>): this;
    setFields(...fields: Array<EmbedFieldData>): this;
    setProvider(provider: EmbedProviderData | string): this;

    static readonly MaxTitleLength: number;
    static readonly MaxFieldsLength: number;
    static readonly MaxFieldNameLength: number;
    static readonly MaxAuthorNameLength: number;
    static readonly MaxFieldValueLength: number;
    static readonly MaxFooterTextLength: number;
    static readonly MaxDescriptionLength: number;
}

declare class ContextMenuBuilder extends BasicBuilder<ContextMenuData> {
    constructor(data?: ContextMenuData): this;

    setName(name: string): this;
    setType(type: ContextMenuTypes): this;
    setDMPermission(dmPermission: boolean): this;
    setNameLocalizations(names: Locales): this;
    setDefaultPermissions(permissions: number): this;

    static readonly MaxUserContextMenuPerApplication: number;
    static readonly MaxMessageContextMenuPerApplication: number;
}

declare class SlashCommandBuilder extends BasicBuilder<ApplicationCommandData> {
    constructor(data?: ApplicationCommandData): this;

    setName(name: string): this;
    setDescription(description: string): this;
    setType(type: ApplicationCommandOptionType.SubCommand | ApplicationCommandOptionType.SubCommandGroup): this;
    setNSFW(nsfw: boolean): this;
    setDefaultPermissions(permissions: number): this;
    setDescriptionLocalizations(descriptions: Locales): this;
    setNameLocalizations(names: Locales): this;
    setDMPermission(dmPermission: boolean): this;
    addAnyOptions(...options: Array<ApplicationCommandOptionsData>): this;
    setAnyOptions(...options: Array<ApplicationCommandOptionsData>): this;

    static readonly MaxOptionsPerSlashCommand: number;
}

declare class BasicSelectMenuBuilder {
    data: Partial<SelectMenuData>;

    constructor(data: Partial<SelectMenuData>): this;

    setCustomId(customId: string): this;
    setDisabled(disabled: boolean): this;
    setPlaceholder(placeholder: string): this;
    setMinValues(value: number): this;
    setMaxValues(value: number): this;
    JSON(): Partial<SelectMenuData>
}

declare class ChannelSelectMenuBuilder extends BasicSelectMenuBuilder {
    data: Partial<ChannelSelectMenuData>;

    constructor(data: PageTransitionEvent<ChannelSelectMenuData>): this;

    setChannelTypes(types: ChannelTypes[]): this;
    addChanenlTypes(types: ChannelTypes[]): this;
}

declare class MentionableSelectMenuBuilder extends BasicSelectMenuBuilder {
    data: Partial<MentionableSelectMenuData>;

    constructor(data: Partial<MentionableSelectMenuData>): this;
}

declare class RoleSelectMenuBuilder extends BasicSelectMenuBuilder {
    data: Partial<RoleSelectMenuData>;

    constructor(data: Partial<RoleSelectMenuData>): this;
}

declare class StringSelectMenuBuilder extends BasicSelectMenuBuilder {
    data: Partial<StringSelectMenuData>;
    options: SelectMenuOptionsData[];

    constructor(data: Partial<StringSelectMenuData>): this;

    setOptions(...options: SelectMenuOptionsData[]): this;
    addOptions(...options: SelectMenuOptionsData[]): this;
}

declare class UserSelectMenuBuilder extends BasicSelectMenuBuilder {
    data: Partial<UserSelectMenuData>;

    constructor(data: Partial<UserSelectMenuData>): this;
}