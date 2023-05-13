# TypeCord

This repository is a representation of the TypeCord package.

## Installation

```bash
npm install typecord
```

## How to use

To get started with Typecord, you'll need to create a new instance of the Typecord client and provide your Discord bot's credentials. Here is a basic example of how to do this:

```ts
import { Client, ClientUser } from "typecord";

const client: Client = new Client({
    token: 'TOKEN_HERE'
}); // If intents are not passed, it will be set to `0`

client.on('connect', (clientUser: ClientUser): void => {
    console.log(`Connected as ${clientUser.username}`);
});

client.connect(); // Connect to Discord
```

## TypeCord Features

- Typechecks: Typecord is built with TypeScript and provides full support for event typing and function parameters for a safer, error-free development experience.
- Decorators: Typecord includes a variety of decorators to simplify creating commands and event listeners.
- ApplicationCommands: Full support with application commands (Slash Commands and Context Menu)
- Flexible: Lightweight, speedy and efficient, 100% Promise-based and Object-oriented

## Examples

For more examples of how to use Typecord, check out the examples folder in our GitHub repository. fThere you will find examples or the functionality mentioned above, including:

- Using decorators
- Application Commands
- Ping Pong
- Webhooks
- And much more.

## Contributing

We welcome contributions from all skill levels. If you'd like to contribute to Typecord's development, read our [contributing](https://github.com/gitpionners/TypeCord/blob/main/CONTRIBUTING.md) guide to get started.

## Help

If you need help or have any questions or problems, join our [Discord server](https://discord.gg/bpTKU5a5Zb). There you will find additional information about using Typecord and how to troubleshoot.

## Packages

- `typecord` \- Interact with the Discord API in an easy and powerful way
- `@typecord/builders` \- A utility package of Discord-related builders

<!-- Thank you >