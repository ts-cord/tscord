import { User } from "./User";
import { Basic } from "./Basic";
import { Guild } from "./Guild";
import { api } from "../constants/Api";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";
import { GuildSticker, User as UserRoute } from "../utils/Routes";
import type { GuildStickerEditOptions, RawDiscordAPIUserData, RawSticker, StickerFormatTypes, StickerTypes } from "../types";

export class Sticker extends Basic implements RawSticker {
    public id: Snowflake;
    public name: string;
    public description: string | undefined;
    public pack_id: Snowflake | undefined;
    public tags: string;
    public format_type: StickerFormatTypes;
    public available: boolean | undefined;
    public guild_id: Snowflake | undefined;
    public sort_value: number | undefined;
    public type: StickerTypes;
    public creation_timesmtap: number;
    public creation_date: Date;
    public user: User | undefined;
    public guild: Guild | undefined;
    private readonly axios_config: { headers: { Authorization: `Bot ${string}` } };

    constructor(data: RawSticker, client: Client, guild?: Guild) {
        super(client);

        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.pack_id = data.pack_id;
        this.tags = data.tags;
        this.format_type = data.format_type;
        this.available = data.available;
        this.guild_id = data.guild_id;
        this.sort_value = data.sort_value;
        this.type = data.type;
        this.user = data.user ? new User(data.user, this.client) : void 0;
        this.creation_date = new Date((+this.id / 4194304) + 1420070400000);
        this.creation_timesmtap = this.creation_date.getTime();
        this.guild = guild ?? this.client.guilds.cache.get(this.guild_id as string);
        this.axios_config = { headers: { Authorization: `Bot ${this.client.token}` } };

        Object.assign(this, data);
    };

    /**
     * Delete this sticker
     * @param {string} reason - Reason for delete this sticker
     * @returns {Promise<Sticker>}
     */

    async delete(reason?: string): Promise<Sticker> {
        await api.delete(GuildSticker(this.guild_id as string, this.id), { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return this;
    };

    /**
     * Edit this guild sticker
     * @param {GuildStickerEditOptions} options - Options to edit 
     * @param reason - Reason for edit this guild sticker
     * @returns {Promise<Sticker>}
     */

    async edit(options: GuildStickerEditOptions, reason?: string): Promise<Sticker> {
        const { data }: { data: RawSticker } = await api.patch(GuildSticker(this.guild_id as string, this.id), options, { headers: { Authorization: `Bot ${this.client.token}`, 'X-Audit-Log-Reason': reason } });

        return new Sticker(data, this.client);
    };

    /**
     * Fetch this guild sticker
     * @returns {Promise<Sticker | undefined>}
     */

    async fetch(): Promise<Sticker | undefined> {
        if (!this.guild_id) return;

        const { data }: { data: RawSticker } = await api.get(GuildSticker(this.guild_id as string, this.id), this.axios_config);

        return new Sticker(data, this.client);
    };

    /**
     * Fetch the user who uploaded this sticker
     * @returns {Promise<User | undefined>}
     */

    async fetchUser(): Promise<User | undefined> {
        if (!this.user) return;

        const { data }: { data: RawDiscordAPIUserData } = await api.get(UserRoute(this.user.id), this.axios_config);

        return new User(data, this.client);
    };
};