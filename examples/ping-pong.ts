// @ts-ignore

import { Client, Message } from "typecord";

const client: Client = new Client({
    auth: "Bot TOKEN",
    intents: 0 // Use the correct intents
});

// Triggered when the client is connected

client.on("connect", (): void => {
    console.log("Wow, connected");
});


// Triggered when a message is sent

client.on("messageCreate", async (message: Message): Promise<void> => {
    if (!message.content) return; // Check that the message has content
    if (message.content.startsWith("!ping")) {
        await message.channel.send("Pong!");

        return;
    }
    if (message.content.startsWith("!pong")) {
        await message.channel.send("Ping!");

        return;
    }
});

client.connect(); // Connect to Discord