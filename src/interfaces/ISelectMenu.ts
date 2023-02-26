import { IChannelTypes } from './IChannelTypes';
import { ISelectMenuOptions } from './ISelectMenuOptions';

export interface ISelectMenu {
    type: number | undefined,
    custom_id: string | undefined,
    options?: ISelectMenuOptions[],
    channel_types?: IChannelTypes[],
    placeholder?: string,
    min_values?: number,
    max_values?: number,
    disabled?: boolean
};