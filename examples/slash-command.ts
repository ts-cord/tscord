// @ts-ignore

import { Client, SlashCommandBuilder, Interaction } from "typecord";

const client = new Client({
    auth: "Bot TOKEN"
});

// Triggered when the bot is connected to Discord

client.on("connect", async (): Promise<void> => {
    const pingCommand = new SlashCommandBuilder().setName("ping").setDescription("Reply with pong!");

    await client.app.commands.set(pingCommand.data); // Save the slash command

    console.log(`Connected as ${client.user.username}`);
});

client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isApplicationCommand()) return; // Check if the interaction was triggered by an application command
    if (interaction.commandName === "ping") {
        await interaction.reply({
            content: "Pong!"
        }); // Reply with `Pong!`

        return;
    }
});