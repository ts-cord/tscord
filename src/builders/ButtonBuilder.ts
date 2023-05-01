import { BasicBuilder } from "./BasicBuilder";
import { ButtonStyles } from "../props/ButtonStyles";
import { ButtonData } from "../interfaces/IButtonData";

export class ButtonBuilder extends BasicBuilder<ButtonData> {
    constructor(data?: ButtonData) {
        super(data);
    };

    /**
     * Set the button label
     * @param {string} label - The new label
     * @returns {this}
     */

    setLabel(label: string): this {
        this.data.label = label;

        return this;
    };

    /**
     * Set the button style
     * @param {ButtonStyles} style - The style
     * @returns {this}
     */

    setStyle(style: ButtonStyles): this {
        this.data.style = style;

        return this;
    };

    /**
     * Set the button emoji
     * @param {Pick<ButtonData, 'emoji'>['emoji'] | string} emoji - The unicode emoji or custom
     * @returns {this}
     */

    setEmoji(emoji: Pick<ButtonData, 'emoji'>['emoji'] | string): this {
        this.data.emoji = typeof emoji === 'string' ? { name: emoji, animated: false } : emoji;

        return this;
    };

    /**
     * Set the button custom id
     * @param {string} customId - The custom id. Must be unique
     * @returns {this}
     */

    setCustomId(customId: string): this {
        this.data.custom_id = customId;

        return this;
    };

    /**
     * Set the button URL
     * @param {string} URL - The URL 
     * @returns {this}
     */

    setURL(URL: string): this {
        this.data.url = URL;

        return this;
    };

    /**
     * Set the button disabled
     * @param {boolean} disabled - Pass true value if you want disabled
     * @returns {this}
     */

    setDisabled(disabled: boolean): this {
        this.data.disabled = disabled;

        return this;
    };
    
    /**
     * The max custom id length for a button
     */

    static MaxCustomIdLength: number = 100;
};