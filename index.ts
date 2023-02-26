import { Client } from "./src/entities/Client";

const client = new Client({
  token: "MTA2NDMwMTM4NTg2MjA5MDkwMw.GCmezJ.oyHomrmrba0slN4Mqe9T3P5CeG99j--e7Lh3Tk",
  intents: 46655
});

client.connect();

client.on('connect', () => console.log('o bot esta connected :sunglasses:!'));