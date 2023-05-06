# TypeCord

This repository is a representation of the [TypeCord](https://npmjs.com/package/TypeCord) package

- Light and powerful
- 100% Promise-based
- Rich in features
- `@decorators` support
- Application commands supported
- Object-oriented

## Using (NodeJs)

You must install the `typecord` npm package

```
npm i typecord
```

## Example

```ts
import { Client } from 'typecord';

const client: Client = new Client({
    token: 'Token here'
    // If intents are not passed, it will be set to `0`
});

// Listen when the client is connected

client.on('connect', (user): void => {
    console.log('Connected with ' + user.username);
});

// Listen when a interaction is created

client.on('interactionCreate', async (interaction): Promise<void> => {
    if (interaction.name === 'ping') {
        await interaction.reply({ content: 'Pong', ephemeral: true }); // Send a message with ephemeral

        return;
    }; // Check if the interaction name is `ping`
});

client.connect(); // Connect the client to Discord
```

You can view more example in [folder examples](https://github.com/gitpionners/TypeCord/tree/main/examples)

## Contributing

If you want to contribute in any way, feel free to make a pull request. Both contributions with codes or ideas are welcome. If you have any questions or concerns, please consider joining our [Discord Server](https://discord.gg/bpTKU5a5Zb)

### TypeCord Packages

- `@typecord` - Interact with the Discord API in an easy and powerful way
- `@typecord/builders` - [TypeCord](https://github.com/gitpionners/TypeCord) related builders package