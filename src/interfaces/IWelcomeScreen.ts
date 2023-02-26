import { IWelcomeScreenChannel } from "./IWelcomeScreenChannel";

export interface IWelcomeScreen {
    description?: string,
    welcome_channels: IWelcomeScreenChannel[]
};