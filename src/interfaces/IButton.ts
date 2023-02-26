export interface IButton {
    type: number,
    style: number | undefined,
    label?: string,
    emoji?: string,
    custom_id?: string,
    url?: string,
    disabled?: boolean
};