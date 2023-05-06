import { Basic } from "./Basic";
import { api } from "../constants/Api";
import { DMChannel } from "./DMChannel";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import { ChannelMessages, User as UserRoute, OauthChannels, UserAvatar, CndURL, Banner } from "../utils/Routes";
import type { CreateMessageOptions, Locales, RawDiscordAPIUserData, RawUser, UserFlags, UserPremiumTypes, ViewOptions } from "../types/index";

export class User extends Basic implements RawUser {
    public id: Snowflake;
    public username: string;
    public discriminator: string;
    public avatar: string | undefined;
    public bot: boolean | undefined;
    public system: boolean | undefined;
    public mfa_enabled: boolean | undefined;
    public banner: string | undefined;
    public accent_color: string | undefined;
    public locale: (keyof Locales) | undefined
    public verified: boolean | undefined;
    public email: string | undefined;
    public flags: UserFlags | undefined;
    public premium_type: UserPremiumTypes | undefined;
    public public_flags: UserFlags | undefined;
    public creation_timestamp: number;
    public creation_date: Date;
    private readonly auth: { headers: { Authorization: `Bot ${string}` } };

    constructor(data: RawDiscordAPIUserData, client: Client) {
        super(client);

        this.id = data.id;
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.avatar = data.avatar;
        this.bot = data.bot;
        this.system = data.system;
        this.mfa_enabled = data.mfa_enabled;
        this.banner = data.banner;
        this.accent_color = data.accent_color;
        this.locale = data.locale;
        this.verified = data.verified;
        this.email = data.email;
        this.flags = data.flags;
        this.premium_type = data.premium_type;
        this.public_flags = data.public_flags;
        this.creation_date = new Date((+this.id / 4194304) + 1420070400000);
        this.creation_timestamp = this.creation_date.getTime();
        this.auth = { headers: { Authorization: `Bot ${this.client.token}` } };

        Object.assign(this, data);
    };

    /**
     * Send a message to the user
     * @param {CreateMessageOptions | string} options - The message options to send
     * @returns {Promise<object>}
     */

    async send(options: CreateMessageOptions | string): Promise<object> {
        const { data }: { data: object /* replace to message object */ } = await api.post(ChannelMessages(this.id), typeof options === 'string' ? { content: options } : options, this.auth);

        return data;
    };

    /**
     * Fetches the user
     * @param {boolean} force - Whether to skip the cache check and make a request
     * @returns {Promise<User | undefined>}
     */

    async fetch(force?: boolean): Promise<User | undefined> {
        if (force) {
            const { data }: { data: RawUser } = await api.get(UserRoute(this.id), this.auth);

            return new User(data, this.client);
        };

        return this.client.users.cache.get(this.id);
    };

    /**
     * Create a DM between the client and the user
     * @returns {Promise<DMChannel>}
     */

    async createDM(): Promise<DMChannel> {
        const { data } = await api.post(OauthChannels, { recipient_id: this.id }, this.auth);

        return data;
    };

    /**
     * Stringify the user object and return the user's mention
     * @returns {string}
     */

    toString(): string {
        return `<@${this.id}>`;
    };

    /**
     * Returns user's avatar URL
     * @param {ViewOptions} options - optional image options
     * @returns {string | undefined}
     */

    avatarURL(options?: ViewOptions): string | undefined {
        return this.avatar && CndURL + UserAvatar(this.id, this.avatar) + `.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
    };

    /**
     * Returns user's banner URL
     * @param {ViewOptions} options - Optional image options
     * @returns {string | undefined}
     */

    bannerURL(options?: ViewOptions): string | undefined {
        return this.banner && CndURL + Banner(this.id, this.banner) + `.${options?.format ?? this.client.options?.default_image_format}?size=${options?.size ?? this.client.options?.default_image_size}`;
    };
};