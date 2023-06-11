import { User } from "./User";
import { rest } from "../constants/Api";
import { Client } from "../entities/Client";
import { OauthCurrentUser } from "../utils/Routes";
import type { ClientUserEditOptions, DiscordAuth, RawDiscordAPIUserData } from "../types";

export class ClientUser extends User {
    private readonly axiosSuperConfig: { headers: { Authorization: DiscordAuth; } };

    constructor(data: RawDiscordAPIUserData, client: Client) {
        super(data, client);

        this.axiosSuperConfig = { headers: { Authorization: this.client.auth } };
    }

    /**
     * Set the client username
     * @param {string} username - The username 
     * @returns {Promise<ClientUser>}
     */

    async setUsername(username: string): Promise<ClientUser> {
        const data: ClientUser = await this.edit({ username });

        return data;
    }

    /**
     * Set the client avatar
     * @param {string} avatar - The avatar URL
     * @returns {Promise<ClientUser>}
     */

    async setAvatar(avatar: string): Promise<ClientUser> {
        const data: ClientUser = await this.edit({ avatar });

        return data;
    }

    /**
     * Edit the client user options
     * @param {ClientUserEditOptions} options - Options to edit
     * @returns {Promise<ClientUser>}
     */

    async edit(options: ClientUserEditOptions): Promise<ClientUser> {
        const { data }: { data: RawDiscordAPIUserData; } = await rest.patch(OauthCurrentUser, options, this.axiosSuperConfig);

        return new ClientUser(data, this.client);
    }
}