import { PresenceData } from "discord.js";

export type Config = {
    Discord: {
        Presence: PresenceData;
        Authentication: {
            Token: string;
        };
        Guild: {
            GuildId: string;
            Channels: string[];
            AdminRoles: string[];
        };
    };
    Server: {
        Website: String;
        Authentication: {
            Headers: HeadersInit;
        };
    };
};
