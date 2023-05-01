import { ChannelTypes, ButtonStyles, SelectMenuTypes, ContextMenuData, ApplicationCommandOptionType, TextInputStyles } from "../types";
import type { Locales, SelectMenuOptionsData, ContextMenuData, ApplicationCommandData, ApplicationCommandOptionsData, EmbedThumbnailData, EmbedData, ButtonData, EmbedFieldData, EmbedVideoData, EmbedImageData, EmbedFooterData, EmbedAuthorData, GenericBuilderTypes, EmbedProviderData, SelectMenuData, TextInputData, MessageComponentData } from "../types";

declare class BasicBuilder<T extends GenericBuilderTypes> {
    data: T;

    constructor(data?: T);

    JSON(): T;
    setDataFrom(JSONData: T): this;
};

declare class ButtonBuilder extends BasicBuilder<ButtonData> {
    constructor(data?: ButtonData);

    setLabel(label: string): this;
    setStyle(style: ButtonStyles): this;
    setEmoji(emoji: ButtonData['emoji'] | string): this;
    setCustomId(customId: string): this;
    setURL(URL: string): this;
    setDisabled(disabled: boolean): this;
};

declare class TextInputBuilder extends BasicBuilder<TextInputData> {
    constructor(data?: TextInputData);

    setLabel(label: string): this;
    setCustomId(customId: string): this;
    setStyle(style: TextInputStyles): this;
    setMinLenght(length: number): this;
    setMaxLenght(length: number): this;
    setRequired(required: boolean): this;
    setValue(value: string): this;
    setPlaceholder(placeholder: string): this;
};

declare class SelectMenuBuilder extends BasicBuilder<SelectMenuData> {
    constructor(data?: SelectMenuData);

    setCustomId(customId: string);
    setType(type: SelectMenuTypes): this;
    setChannelTypes(channelTypes: ChannelTypes): this;
    setPlaceholder(placeholder: string): this;
    setMinValues(minValues: number): this;
    setMaxValues(maxValues: number): this;
    setDisabled(disabled: boolean): this;
    addOptions(...options: Array<SelectMenuOptionsData>): this;
    setOptions(...options: Array<SelectMenuOptionsData>): this;
};

declare class ActionRowBuilder<T extends ButtonBuilder | SelectMenuBuilder | TextInputBuilder> extends BasicBuilder<MessageComponentData> {
    components: MessageComponentData['components'];

    constructor(data?: { type: 1, components: Array<T['data']> });

    setComponents(...components: Array<T>): this;
    addComponents(...components: Array<T>): this;

    static readonly MaxActionRowsPerMessage: number;
    static readonly MaxCustomIdLength: number;
};

declare class EmbedBuilder extends BasicBuilder<EmbedData> {
    constructor(data?: EmbedData);

    setColor(color: string): this;
    setDescription(description: string): this;
    setTitle(title: string): this;
    setURL(URL: string): this;
    setTimestamp(timestamp: number): this;
    setFooter(footer: EmbedFooter | string): this;
    setImage(image: EmbedImage | string): this;
    setThumbnail(thumbnail: EmbedThumbnail | string): this;
    setVideo(video: EmbedVideo | string): this;
    setAuthor(author: EmbedAuthor | string): this;
    addFields(...fields: Array<EmbedField>): this;
    setFields(...fields: Array<EmbedField>): this;
    setProvider(provider: EmbedProvider | string): this;

    static readonly MaxTitleLength: number;
    static readonly MaxFieldsLength: number;
    static readonly MaxFieldNameLength: number;
    static readonly MaxAuthorNameLength: number;
    static readonly MaxFieldValueLength: number;
    static readonly MaxFooterTextLength: number;
    static readonly MaxDescriptionLength: number;
};

declare class ContextMenuBuilder extends BasicBuilder<ContextMenuData> {
    constructor(data?: ContextMenuData);

    setName(name: string): this;
    setType(type: ContextMenuTypes): this;
    setDMPermission(dmPermission: boolean): this;
    setNameLocalizations(names: Locales): this;
    setDefaultPermissions(permissions: number): this;

    static readonly MaxUserContextMenuPerApplication: number;
    static readonly MaxMessageContextMenuPerApplication: number;
};

declare class SlashCommandBuilder extends BasicBuilder<ApplicationCommandData> {
    constructor(data?: ApplicationCommandData);

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
};