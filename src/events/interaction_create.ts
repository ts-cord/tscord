import { Client } from "../entities/Client";

export default function (payload: any, client: Client) {
  console.log(payload.d);
};