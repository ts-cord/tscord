export interface IApplicationCommandInteractionDataOption {
    name?: string,
    type?: number,
    value?: string | number | boolean,
    options?: IApplicationCommandInteractionDataOption[],
    focused?: boolean
};