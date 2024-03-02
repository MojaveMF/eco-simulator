# ecosimulator-bot
This bot is designed to work with eco-simulator instances.

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

