// @ts-ignore

import { Client, Message, EmbedBuilder, version } from 'typecord';

const client = new Client({
    token: 'TOKEN',
    intents: 0 // Use the correct intents
});

client.on('messageCreate', async (message: Message) => {
    if (message.content?.startsWith('!sendMeAnEmbed')) {
        const embed: EmbedBuilder = new EmbedBuilder({
            fields: [
                {
                    name: 'TypeCord',
                    value: version,
                    inline: true
                }, {
                    name: 'Field two',
                    value: 'value',
                    inline: true
                }
            ],
            footer: {
                text: 'Typecord Embed'
            },
            title: `${message.author.username}`,
            timestamp: new Date().getTime()
        });

        await message.channel.send({
            embeds: [embed.data]
        });

        return;
    };
});

client.connect(); //Connect to Discord