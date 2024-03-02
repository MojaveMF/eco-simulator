import { ActivityType } from "discord.js";
import type { Config } from "./types";

export default {
    Discord: {
        Presence: {
            status: "dnd",
            activities: [{ name: "discord.gg/economysimulator", type: ActivityType.Watching }],
        },
        Authentication: {
            Token: "BOT_TOKEN",
        },
        Guild: {
            GuildId: "1190080006194479264",
            Channels: [],
            AdminRoles: ["1211304987750039602", "1211415282774712410"],
            AuthorizedUsers: ["454821956223762453", "825452760362385439"],
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
