import { RawWelcomeScreenChannelData } from "./IRawWelcomeScreenChannelData";

export interface RawWelcomeScreenData {
    description?: string;
    welcome_channels: RawWelcomeScreenChannelData[];
};