// @ts-ignore

import { Client, Message } from 'typecord';

const client: Client = new Client({
    token: '123',
    intents: 0 // Use the correct intents
});

// Triggered when the client is connected

client.on('connect', (): void => {
    console.log('Wow, connected');
});


// Triggered when a message is sent

client.on('messageCreate', async (message: Message): Promise<void> => {
    if (message.content?.startsWith('ping') || message.content?.startsWith('pong')) {
        await message.channel.send({
            content: message.content.startsWith('ping') ? 'pong' : 'ping'
        }); // Send a message if the message content starts with `ping` or `pong`
    };
});

client.connect(); // Connect to Discord