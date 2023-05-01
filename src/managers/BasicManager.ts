import { Group } from "../utils/Group";
import { Basic } from "../structures/Basic";
import { Client } from "../entities/Client";
import { Snowflake } from "../types/Snowflake";

export class BasicManager extends Basic {
    cache: Group<Snowflake, any> = new Group<Snowflake, any>();

    constructor(client: Client) {
        super(client);
    };
};