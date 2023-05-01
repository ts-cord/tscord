import { SweepKeys } from "./ISweepKeys";
import { ViewOptions } from "./IViewOptions";

export interface ClientProps {
    token: string
    intents: number;
    sweepers?: SweepKeys;
    options?: {
        default_image_format?: Pick<ViewOptions, 'format'>['format'];
        default_image_size?: number;
        no_caching?: boolean;
        baseURL?: string;
    };
};