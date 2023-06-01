import { Client } from "../entities/Client";

export abstract class Basic {
	public readonly client: Client;

	constructor(client: Client) {
		this.client = client;
	}
}