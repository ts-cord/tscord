import { Group } from "@ts-cord/group";
import { rest } from "../constants/Api";
import { User } from "../structures/User";
import { Client } from "../entities/Client";
import { Guild } from "../structures/Guild";
import { BasicManager } from "./BasicManager";
import { Snowflake } from "../types/Snowflake";
import { Sticker } from "../structures/Sticker";
import { GuildSticker, GuildStickers, User as UserRoute } from "../utils/Routes";
import type { DiscordAuth, GuildStickerCreateOptions, GuildStickerEditOptions, RawDiscordAPIUserData, RawSticker, StickerResolvable } from "../types";

export class GuildStickerManager extends BasicManager {
    public guild: Guild;
    override cache: Group<Snowflake, Sticker> = new Group<Snowflake, Sticker>();
    private readonly axiosConfig: { headers: { Authorization: DiscordAuth; } };

    constructor(guild: Guild, client: Client) {
        super(client);
        
        this.guild = guild;
        this.axiosConfig = { headers: { Authorization: this.client.auth } };
    }

    /**
     * Resolves a StickerResolvable into sticker's ID
     * @param {StickerResolvable} sticker - The sticker
     * @returns {Snowflake}
     */

    resolveId(sticker: StickerResolvable): Snowflake {
        return typeof sticker === "string" ? sticker : sticker.id;
    }

    /**
     * Fetches the user who uploaded the sticker
     * @param {Sticker} sticker - The sticker
     * @returns {Promise<User>}
     */

    async fetchUser(sticker: Sticker): Promise<User> {
        const { data }: { data: RawDiscordAPIUserData; } = await rest.get(UserRoute(sticker.user?.id as string), this.axiosConfig);

        return new User(data, this.client);
    }

    /**
     * Edits a guild sticker
     * @param {StickerResolvable} sticker - The sticker
     * @param {GuildStickerEditOptions & { reason?: string; }} options - Options to edit
     * @returns {Promise<Sticker>}
     */

    async edit(sticker: StickerResolvable, options: GuildStickerEditOptions & { reason?: string; }): Promise<Sticker> {
        const { data }: { data: RawSticker; } = await rest.patch(GuildSticker(this.guild.id, this.resolveId(sticker)), { name: options.name ?? null, description: options.name ?? null, tags: options.tags ?? null }, { headers: { Authorization: this.client.auth, "X-Audit-Log-Reason": options.reason } });

        this.cache.set(data.id, new Sticker(data, this.client, this.guild));

        return this.cache.get(data.id) as Sticker;
    }

    /**
     * Deletes a guild sticker
     * @param {StickerResolvable} sticker - The sticker
     * @param {string} reason - Reason for delete the sticker
     * @returns {Promise<void>}
     */

    async delete(sticker: StickerResolvable, reason?: string): Promise<void> {
        await rest.delete(GuildSticker(this.guild.id, this.resolveId(sticker)), { headers: { Authorization: this.client.auth, "X-Audit-Log-Reason": reason } });

        return;
    }

    /**
     * Creates a new sticker in guild
     * @param {GuildStickerCreateOptions} options - Sticker options
     * @returns {Promise<Sticker>}
     */

    async create(options: GuildStickerCreateOptions): Promise<Sticker> {
        const reason: string | undefined = options.reason;

        delete options.reason;

        const { data }: { data: RawSticker; } = await rest.post(GuildStickers(this.guild.id), options, { headers: { Authorization: this.client.auth, "X-Audit-Log-Reason": reason } });

        this.cache.set(data.id, new Sticker(data, this.client, this.guild));

        return this.cache.get(data.id) as Sticker;
    }
}