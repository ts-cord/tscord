export interface IMessageButton {
    type?: number,
    style: number | undefined,
    label: string | undefined,
    emoji?: string,
    custom_id: string | undefined,
    url?: string,
    disabled?: boolean
};