import { IButton } from "../interfaces/IButton";
import { IButtonStyles } from "../interfaces/IButtonStyles";

export class MessageButton {
    data: IButton = { type: 2, style: undefined };

    constructor(){};

    setCustomId(customId: string): MessageButton {
        this.data.custom_id = customId;

        return this;
    };
    setLabel(label: string): MessageButton {
        this.data.label = label;

        return this;
    };
    setURL(url: string): MessageButton {
        this.data.url = url;

        return this;
    };
    setStyle(style: 'Primary' | 'Secondary' | 'Success' | 'Danger' | 'Link' | number): MessageButton {
        const styles: IButtonStyles = { Primary: 1, Secondary: 2, Success: 3, Danger: 4, Link: 5 };

        this.data.style =  (styles[style as keyof IButtonStyles] ?? style);

        return this;
    };
    setEmoji(emoji: string): MessageButton {
        this.data.emoji = emoji;

        return this;
    };
    setDisabled(disabled: boolean): MessageButton {
        this.data.disabled = disabled;

        return this;
    };
    JSON(): IButton {
        return this.data;
    };
    setDataFrom(json: IButton): MessageButton {
        this.data = json;

        return this;
    };
};