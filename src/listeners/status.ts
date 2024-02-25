import { Listener } from "@sapphire/framework";
import { Client } from "discord.js";
import config from "../config";

export class StatusListener extends Listener {
    public constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, { ...options, once: true, event: "ready" });
    }

    public async run(client: Client) {
        if (!client.user) {
            return this.container.logger.error("Client user is undefiend");
        }

        await client.user.setPresence(config.Discord.Presence);
    }
}
