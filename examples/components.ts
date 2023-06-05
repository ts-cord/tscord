// @ts-ignore

import { Client, ActionRowBuilder, ButtonBuilder, ComponentTypes, ButtonStyles, Interaction, Message } from "typecord";

const client: Client = new Client({
    token: "TOKEN",
    intents: 0 // Use the correct intents
});

client.on("connect", (): void => {
    console.log("Wow, connected");
});

client.on("messageCreate", async (message: Message): Promise<void> => {
    if (message.content && message.content.startsWith("!components")) {
        const actionRowWithButton: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>().setComponents(
            new ButtonBuilder({
                type: ComponentTypes.Button,
                style: ButtonStyles.Primary,
                custom_id: "potato_123",
                label: "Click and win a potato"
            })
        ); // Create the action row to send later

        await message.channel.send({
            content: "One button for you:",
            components: [
                actionRowWithButton.data
            ]
        }); // Send a message to the channel
    }
});

client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isButton()) return; // Check if the interaction was triggerd by a button
    if (interaction.customId === "potato_123") {
        await interaction.reply({
            content: "Take a potato for you: 🥔",
            ephemeral: true
        }); // Reply to the interaction and send in ephemeral
    } // Check if the interaction custom id is `potato_123`
});

client.connect(); // Connect to Discord