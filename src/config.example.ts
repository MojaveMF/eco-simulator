import { ActivityType } from "discord.js";
import type { Config } from "./types";

export default {
    Discord: {
        Presence: {
            status: "dnd",
            activities: [{ name: "", type: ActivityType.Watching }],
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
        Website: "example.com",
        Authentication: {
            Headers: {
                Cookie: "",
            },
        },
    },
} satisfies Config;
