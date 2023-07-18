import { Group } from "@ts-cord/group";
import { Basic } from "../structures/Basic";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";

export class BasicManager extends Basic {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cache: Group<Snowflake, any> = new Group<Snowflake, any>();

    constructor(client: Client) {
        super(client);
    }
}