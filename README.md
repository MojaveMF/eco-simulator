# ecosimulator-bot
This bot is designed to work with eco-simulator instances.

![GitHub last commit](https://img.shields.io/github/last-commit/MojaveMF/eco-simulator)
![Typescript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF)

## Why is this open source?
I had created this massive bot for jeno after he asked since i had nothing better to do. After creating i helped him setup / flush out bugs. But after this he had removed me and i couldnt contact him despite creating this bot so i have decided to open source it so someone can use it.

## Features
- lookup
    - Users
        - User id lookup
        - Username lookup
        - Autofill usernames
    - Assets
        - Asset id lookup
        - AssetName lookup
        - Autofill usernames

#### ITEMS / USERS NOT SEARCHABLE WILL NOT WORK WITH USERNAME LOOKUP!
        


## Setup
### Creating your config

#### Example config
```ts
import { ActivityType } from "discord.js";
import type { Config } from "./types";

export default {
    Discord: {
        Presence: {
            status: "dnd",
            activities: [{ name: "Discord bot status", type: ActivityType.Watching }],
        },
        Authentication: {
            Token: "BOT_TOKEN",
        },
        Guild: {
            GuildId: "",
            Channels: [],
            AdminRoles: [],
            AuthorizedUsers: [],
        },
    },
    Server: {
        Website: "economy-simulator.org",
        Authentication: {
            Headers: {
                Cookie: "",
            },
        },
    },
} satisfies Config;
```

Create the file `src/config.ts` and put the example config in.
Change headers cookie to a cookie string aswell as put any other headers you would like to be sent with every request.

Put your discord servers guild id in Discord.Guild.GuildId and put channels for channels the bot is allowed into aswell as authorized users / roles.

Then you need to run `npm i` to install every dependency.
After that run `npm run run` to start the bot.

## Contributing

Any changes that improve the bot are apreciated but im going to list my requirements.

- No large functions unless required (60 lines +)
- No reusing code that should be functional
- Make everything async (Javascript runs faster the more you take advantage of that)
- No generaly ugly code

## Issues
if you have any issues with the bot either contact me on discord or create an issue on the repo.