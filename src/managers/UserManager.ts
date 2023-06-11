import { Group } from "../utils/Group";
import { rest } from "../constants/Api";
import { User } from "../structures/User";
import { Client } from "../entities/Client";
import { BasicManager } from "./BasicManager";
import { Snowflake } from "../types/Snowflake";
import { DMChannel } from "../structures/DMChannel";
import { ChannelMessages, Channel } from "../utils/Routes";
import type { CreateMessageOptions, DiscordAuth, UserResolvable } from "../types";

export class UserManager extends BasicManager {
    override cache: Group<Snowflake, User> = new Group<Snowflake, User>();
    private readonly axiosConfig: { headers: { Authorization: DiscordAuth; } };

    constructor(client: Client) {
        super(client);

        this.axiosConfig = { headers: { Authorization: this.client.auth } };
    }

    /**
     * Resolve a UserResolvable to an User id
     * @param {UserResolvable} user - The user to resolve
     * @returns {Snowflake}
     */

    resolveId(user: UserResolvable): Snowflake {
        return typeof user === "string" ? user : user.id;
    }

    /**
     * Send a message to an user
     * @param {UserResolvable} user - The user resolvable
     * @param {CreateMessageOptions | string} options - The message options to send
     * @returns {Promise<object>}
     */

    async send(user: UserResolvable, options: CreateMessageOptions | string): Promise<object> {
        const { data }: { data: object /* replace to message object */ } = await rest.post(ChannelMessages(this.resolveId(user)), typeof options === "string" ? { content: options } : options, this.axiosConfig);

        return data;
    }

    /**
     * Delete the DM between the client and the user
     * @param {UserResolvable} user - The user to identify
     * @returns {Promise<DMChannel>}
     */

    async deleteDM(user: UserResolvable): Promise<DMChannel> {
        const { data } = await rest.delete(Channel(this.resolveId(user)), this.axiosConfig);

        return data;
    }
}