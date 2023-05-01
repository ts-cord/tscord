export interface SelectMenuBuilderMethods {
    setLabel(label: string): this;
    setValue(value: string): this;
    setDescription(description: string): this;
    setEmoji(emoji: string): this;
    setDefault(isDefault: boolean): this;
};