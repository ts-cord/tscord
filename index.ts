import { MessageActionRow } from "./src/components/MessageActionRow";
import { MessageButton } from "./src/components/MessageButton";
import { Client } from "./src/entities/Client";
import { Interaction } from "./src/managers/Interaction";

const client = new Client({
  token: "",
  intents: 46655
});

client.connect();

client.on('connect', () => console.log('o bot esta connected :sunglasses:!'));

client.on('interactionRun', async (int: Interaction) => {
  int.reply({ content: 'teste', components: [new MessageActionRow().setComponents(new MessageButton().setCustomId('teste').setLabel('opa').setStyle('Primary')).JSON()] });
});