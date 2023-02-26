export interface IInteractionOptions {
    name: string,
    type: number,
    value?: string | number | boolean,
    options?: IInteractionOptions[],
    focused?: boolean
};