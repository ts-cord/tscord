import { ChannelTypes } from '../props/ChannelTypes';
import { SelectMenuOptionsData } from './ISelectMenuOptionsData';
import { SelectMenuTypes } from '../props/SelectMenuTypes';

export interface SelectMenuData {
    type: SelectMenuTypes | undefined;
    custom_id: string | undefined;
    options?: SelectMenuOptionsData[];
    channel_types?: ChannelTypes[];
    placeholder?: string;
    min_values?: number;
    max_values?: number;
    disabled?: boolean;
};