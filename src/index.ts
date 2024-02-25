import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import config from "./config";
import { AssetType } from "./modules/ecosim/assets/enums/AssetType";

const client = new SapphireClient({ intents: [GatewayIntentBits.Guilds] });
client.login(config.Discord.Authentication.Token);
