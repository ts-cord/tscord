export interface ITextInputComponents {
    type: number | undefined,
    custom_id: string | undefined,
    style: number | undefined,
    label: string | undefined,
    min_length?: number,
    max_length?: number,
    required?: boolean,
    value?: string,
    placeholder?: string
};