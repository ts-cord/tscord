# TypeCord

This repository is a representation of the [TypeCord](https://npmjs.com/package/TypeCord) package

## Installation

NodeJs v16.17.0 or higher is required

```ts
npm i typecord
```

## Building a bot

```ts
import { Client, Message } from 'typecord';

const client = new Client({ token: 'TOKEN', intents: 0 });

client.on('connect', (): void => {
    console.log('Connected message goes here');
});

client.on('messageCreate', (message: Message): Message | undefined => {
    if (message.content?.startsWith('!ping') || message.content?.startsWith('!pong')) {
        return message.reply({
            content: message.content.startsWith('!ping') ? 'Pong' : 'Ping'
        });
    };
});

client.connect();
```

For more examples, consider using the [examples folder](https://github.com/gitpionners/TypeCord/tree/main/src/examples).

## Contributing

If you have any questions or errors about TypeCord, please consider using [TypeCord Server](https://discord.gg/bpTKU5a5Zb). If you want to contribute to the project, fork it.

## TypeCord Packages

- `typecord` - Interact with the Discord API in an easy and powerful way
- `@typecord/builders` - A builder package for Discord stuffs