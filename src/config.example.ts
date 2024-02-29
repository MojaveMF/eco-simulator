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
                Cookie: ".ROBLOSECURITY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzZXNzaW9uSWQiOiI1NTFkZTkwOC05MzRhLTQ1Y2UtODg3Zi0zMTE4YTNmYzc3YzIiLCJjcmVhdGVkQXQiOjE3MDgyODgxNjF9.6BiWqWY7A8Z6oihuApd9Ihsbgh8Emzsc9YIvZSYmNUf5y0Co6J54dlzIs6KcVMaC2KrTXAt8URPIsYx1bSa7jQ",
            },
        },
    },
} satisfies Config;
