import { Client } from "../entities/Client";
import { IUser } from "../interfaces/IUser";
import { IMember } from "../interfaces/IMember";

export class Member {
    #client: Client;
    public user?: Readonly<IUser>;
    public nick?: Readonly<string>;
    public avatar?: Readonly<string>;
    public roles: Readonly<string[]>;
    public joined_at: Readonly<number>;
    public preimum_since?: Readonly<number>;
    public deaf: Readonly<boolean>;
    public mute: Readonly<boolean>;
    public flags: Readonly<number>;
    public pending?: Readonly<boolean>;
    public permissions?: Readonly<string>;
    public communication_disabled_until?: Readonly<number>;

    constructor(props: IMember, client: Client) {
        this.#client = client;
        this.user = props.user;
        this.nick = props.nick;
        this.avatar = props.avatar;
        this.roles = props.roles;
        this.joined_at = props.joined_at;
        this.preimum_since = props.premium_sice;
        this.deaf = props.deaf;
        this.mute = props.mute;
        this.flags = props.flags;
        this.pending = props.pending;
        this.permissions = props.permissions;
        this.communication_disabled_until = props.communication_disabled_until;

        Object.assign(this, props);
    };
};