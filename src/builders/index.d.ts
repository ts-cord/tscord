import { ChannelTypes } from "../props/ChannelTypes";
import { EmbedData } from "../interfaces/IEmbedData";
import { ButtonStyles } from "../props/ButtonStyles";
import { ButtonData } from "../interfaces/IButtonData";
import { EmbedField } from "../interfaces/IEmbedField";
import { EmbedVideo } from "../interfaces/IEmbedVideo";
import { EmbedImage } from "../interfaces/IEmbedImage";
import { EmbedFooter } from "../interfaces/IEmbedFooter";
import { EmbedAuthor } from "../interfaces/IEmbedAuthor";
import type { GenericBuilderTypes } from "../types/misc";
import { SelectMenuTypes } from "../props/SelectMenuTypes";
import { EmbedProvider } from "../interfaces/IEmbedProvider";
import { TextInputData } from "../interfaces/ITextInputData";
import { ActionRowData } from "../interfaces/IActionRowData";
import { ContextMenuTypes } from "../props/ContextMenuTypes";
import { ILocalizations } from "../interfaces/ILocalizations";
import { EmbedThumbnail } from "../interfaces/IEmbedThumbnail";
import { SelectMenuData } from "../interfaces/ISelectMenuData";
import { SlashCommandTypes } from "../props/SlashCommandTypes";
import { ContextMenuData } from "../interfaces/IContextMenuData";
import { SlashCommandData } from "../interfaces/ISlashCommandData";
import { SelectMenuOptionsData } from "../interfaces/ISelectMenuOptionsData";
import { TextInputComponentsData } from "../interfaces/ITextInputComponentsData";
import { SlashCommandOptionsData } from "../interfaces/ISlashCommandOptionsData";

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
    setEmoji(emoji: Pick<ButtonData, 'emoji'>['emoji'] | string): this;
    setCustomId(customId: string): this;
    setURL(URL: string): this;
    setDisabled(disabled: boolean): this;

    static readonly MaxCustomIdLength: number;
};

declare class TextInputBuilder extends BasicBuilder<TextInputData> {
    constructor(data?: TextInputData);

    setTitle(title: string): this;
    setCustomId(customId: string): this;
    setComponents(...components: Array<TextInputComponentsData>): this;
    addComponents(...components: Array<TextInputComponentsData>): this;

    static readonly MaxCustomIdLength: number;
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

    static readonly MaxCustomIdLength: number;
};

declare class ActionRowBuilder<T extends ButtonBuilder | SelectMenuBuilder | TextInputBuilder> extends BasicBuilder<ActionRowData> {
    components: ActionRowData['components'];

    constructor(data?: { type: 1, components: Array<T['data']> });

    setComponents(...components: Array<T>): this;
    addComponents(...components: Array<T>): this;
    JSON(): this['data'];
    setDataFrom(JSONData: { type: 1, components: Array<T['data']> }): this;

    static readonly MaxActionRowsPerMessage: number;
};

declare class EmbedBuilder {
    data: EmbedData;

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
    JSON(): this['data'];
    setProvider(provider: EmbedProvider | string): this;
    setDataFrom(JSONData: EmbedData): this;

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
    setNameLocalizations(names: ILocalizations): this;
    setDefaultPermissions(permissions: number): this;

    static readonly MaxUserContextMenuPerApplication: number;
    static readonly MaxMessageContextMenuPerApplication: number;
};

declare class SlashCommandBuilder extends BasicBuilder<SlashCommandData> {
    constructor(data?: SlashCommandData);

    setName(name: string): this;
    setDescription(description: string): this;
    setType(type: SlashCommandTypes.SubCommand | SlashCommandTypes.SubCommandGroup): this;
    setNSFW(nsfw: boolean): this;
    setDefaultPermissions(permissions: number): this;
    setDescriptionLocalizations(descriptions: ILocalizations): this;
    setNameLocalizations(names: ILocalizations): this;
    setDMPermission(dmPermission: boolean): this;
    addAnyOptions(...options: Array<SlashCommandOptionsData>): this;
    setAnyOptions(...options: Array<SlashCommandOptionsData>): this;

    static readonly MaxOptionsPerSlashCommand: number;
};