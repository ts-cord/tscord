import { Basic } from "./Basic";
import { rest } from "../constants/Api";
import { DMChannel } from "./DMChannel";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import { ChannelMessages, User as UserRoute, OauthChannels, UserAvatar, CndURL, Banner, EmbedAvatar } from "../utils/Routes";
import type { CreateMessageOptions, DiscordAuth, Locales, RawDiscordAPIUserData, RawUser, UserFlags, UserPremiumTypes, ViewOptions } from "../types/index";

export class User extends Basic {
    public id: Snowflake;
    public username: string;
    public discriminator: string;
    public avatar: string | undefined;
    public bot: boolean | undefined;
    public system: boolean | undefined;
    public mfaEnabled: boolean | undefined;
    public banner: string | undefined;
    public accentColor: string | undefined;
    public locale: (keyof Locales) | undefined;
    public verified: boolean | undefined;
    public email: string | undefined;
    public flags: UserFlags | undefined;
    public premiumType: UserPremiumTypes | undefined;
    public publicFlags: UserFlags | undefined;
    public creationTimestamp: number;
    public creationDate: Date;
    private readonly axiosConfig: { headers: { Authorization: DiscordAuth; } };

    constructor(data: RawDiscordAPIUserData, client: Client) {
        super(client);

        this.id = data.id;
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.avatar = data.avatar;
        this.bot = data.bot;
        this.system = data.system;
        this.mfaEnabled = data.mfa_enabled;
        this.banner = data.banner;
        this.accentColor = data.accent_color;
        this.locale = data.locale;
        this.verified = data.verified;
        this.email = data.email;
        this.flags = data.flags;
        this.premiumType = data.premium_type;
        this.publicFlags = data.public_flags;
        this.creationDate = new Date((+this.id / 4194304) + 1420070400000);
        this.creationTimestamp = this.creationDate.getTime();
        this.axiosConfig = { headers: { Authorization: this.client.auth } };

        Object.assign(this, data);
    }

    /**
     * Send a message to the user
     * @param {CreateMessageOptions | string} options - The message options to send
     * @returns {Promise<object>}
     */

    async send(options: CreateMessageOptions | string): Promise<object> {
        const { data }: { data: object /* replace to message object */ } = await rest.post(ChannelMessages(this.id), typeof options === "string" ? { content: options } : options, this.axiosConfig);

        return data;
    }

    /**
     * Fetches the user
     * @param {boolean} force - Whether to skip the cache check and make a request
     * @returns {Promise<User | undefined>}
     */

    async fetch(force?: boolean): Promise<User | undefined> {
        if (force) {
            const { data }: { data: RawUser } = await rest.get(UserRoute(this.id), this.axiosConfig);

            return new User(data, this.client);
        }

        return this.client.users.cache.get(this.id);
    }

    /**
     * Create a DM between the client and the user
     * @returns {Promise<DMChannel>}
     */

    async createDM(): Promise<DMChannel> {
        const { data } = await rest.post(OauthChannels, { recipient_id: this.id }, this.axiosConfig);

        return data;
    }

    /**
     * Stringify the user object and return the user's mention
     * @returns {string}
     */

    toString(): string {
        return `<@${this.id}>`;
    }

    /**
     * Returns user's avatar URL
     * @param {ViewOptions} options - optional image options
     * @returns {string | undefined}
     */

    avatarURL(options?: ViewOptions): string | undefined {
        return this.avatar && CndURL + UserAvatar(this.id, this.avatar) + `.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
    }

    /**
     * Returns user's banner URL
     * @param {ViewOptions} options - Optional image options
     * @returns {string | undefined}
     */

    bannerURL(options?: ViewOptions): string | undefined {
        return this.banner && CndURL + Banner(this.id, this.banner) + `.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
    }

    /**
     * User's avatar URL, if it doesn't have one, the default avatar will be returned
     * @param {ViewOptions} options - Optional image options
     * @returns {string}
     */

    displayAvatarURL(options?: ViewOptions): string {
        return this.avatar ? this.avatarURL(options) as string : CndURL + EmbedAvatar(parseInt(this.discriminator) % 5) + `.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
    }
}