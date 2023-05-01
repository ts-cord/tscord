import { User } from "./User";
import { api } from "../constants/Api";
import { Client } from "../entities/Client";
import { OauthCurrentUser } from "../utils/Routes";
import type { ClientUserEditOptions, RawDiscordAPIUserData } from "../types";

export class ClientUser extends User {
    private readonly axios_auth: { headers: { Authorization: `Bot ${string}` } };
    private readonly route: string;

    constructor(data: RawDiscordAPIUserData, client: Client) {
        super(data, client);

        this.route = OauthCurrentUser;
        this.axios_auth = { headers: { Authorization: `Bot ${this.client.token}` } };
    };
    async setUsername(username: string): Promise<ClientUser> {
        const { data }: { data: RawDiscordAPIUserData } = await api.patch(this.route, { username: username }, this.axios_auth);

        return new ClientUser(data, this.client);
    };
    async setAvatar(avatarURL: string): Promise<ClientUser> {
        const { data }: { data: RawDiscordAPIUserData } = await api.patch(this.route, { avatar: avatarURL }, this.axios_auth);

        return new ClientUser(data, this.client);
    };
    async edit(options: ClientUserEditOptions): Promise<ClientUser> {
        const { data }: { data: RawDiscordAPIUserData } = await api.patch(this.route, options, this.axios_auth);

        return new ClientUser(data, this.client);
    };
};