import { User } from "./User";
import { Basic } from "./Basic";
import { Guild } from "./Guild";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import { GuildSticker, User as UserRoute } from "../utils/Routes";
import type { GuildStickerEditOptions, RawDiscordAPIUserData, RawSticker, StickerFormatTypes, StickerTypes } from "../types";

export class Sticker extends Basic {
    public id: Snowflake;
    public name: string;
    public description: string | undefined;
    public pack_id: Snowflake | undefined;
    public tags: string;
    public formatType: StickerFormatTypes;
    public available: boolean | undefined;
    public guildId: Snowflake | undefined;
    public sortValue: number | undefined;
    public type: StickerTypes;
    public creationTimesmtap: number;
    public creationDate: Date;
    public user: User | undefined;
    public guild: Guild | undefined;
    private readonly axiosConfig: { headers: { Authorization: `Bot ${string}` } };

    constructor(data: RawSticker, client: Client, guild?: Guild) {
        super(client);

        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.pack_id = data.pack_id;
        this.tags = data.tags;
        this.formatType = data.format_type;
        this.available = data.available;
        this.guildId = data.guild_id;
        this.sortValue = data.sort_value;
        this.type = data.type;
        this.user = data.user ? new User(data.user, this.client) : void 0;
        this.creationDate = new Date((+this.id / 4194304) + 1420070400000);
        this.creationTimesmtap = this.creationDate.getTime();
        this.guild = guild ?? this.client.guilds.cache.get(this.guildId as string);
        this.axiosConfig = { headers: { Authorization: `Bot ${this.client.token}` } };

        Object.assign(this, data);
    };

    /**
     * Delete this sticker
     * @param {string} reason - Reason for delete this sticker
     * @returns {Promise<Sticker>}
     */

    async delete(reason?: string): Promise<Sticker> {
        await rest.delete(GuildSticker(this.guildId as string, this.id), { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return this;
    };

    /**
     * Edit this guild sticker
     * @param {GuildStickerEditOptions} options - Options to edit 
     * @param reason - Reason for edit this guild sticker
     * @returns {Promise<Sticker>}
     */

    async edit(options: GuildStickerEditOptions, reason?: string): Promise<Sticker> {
        const { data }: { data: RawSticker } = await rest.patch(GuildSticker(this.guildId as string, this.id), options, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return new Sticker(data, this.client);
    };

    /**
     * Fetch this guild sticker
     * @returns {Promise<Sticker | undefined>}
     */

    async fetch(): Promise<Sticker | undefined> {
        if (!this.guildId) return;

        const { data }: { data: RawSticker } = await rest.get(GuildSticker(this.guildId as string, this.id), this.axiosConfig);

        return new Sticker(data, this.client);
    };

    /**
     * Fetch the user who uploaded this sticker
     * @returns {Promise<User | undefined>}
     */

    async fetchUser(): Promise<User | undefined> {
        if (!this.user) return;

        const { data }: { data: RawDiscordAPIUserData } = await rest.get(UserRoute(this.user.id), this.axiosConfig);

        return new User(data, this.client);
    };
};